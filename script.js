const dataMakanan = [
  {
    nama: "Lotek",
    harga: 4000,
    gambar: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
  },
  {
    nama: "Kupat Tahu",
    harga: 5000,
    gambar: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
  },
  {
    nama: "Gado-Gado",
    harga: 5000,
    gambar: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
  },
  {
    nama: "Soto Ayam",
    harga: 10000,
    gambar: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
  }
];

const dataMinuman = [
  {
    nama: "Es Teh",
    harga: 3000,
    gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500"
  },
  {
    nama: "Lemon Tea",
    harga: 4000,
    gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=500"
  },
  {
    nama: "Soda Gembira",
    harga: 5000,
    gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=500"
  },
  {
    nama: "Es Jeruk",
    harga: 4000,
    gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=500"
  }
];

const keranjang = {};

function rupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

// Menampilkan menu makanan dan minuman
function tampilkanMenu(data, id) {
  const tempat = document.getElementById(id);

  if (!tempat) {
    console.error("Bagian menu tidak ditemukan: " + id);
    return;
  }

  tempat.replaceChildren();

  data.forEach((item) => {
    const kartu = document.createElement("div");
    kartu.className = "card";

    const gambar = document.createElement("img");
    gambar.className = "gambar";
    gambar.src = item.gambar;
    gambar.alt = item.nama;
    gambar.loading = "lazy";

    // Jika gambar gagal dimuat
    gambar.onerror = function () {
      this.alt = "Gambar " + item.nama + " tidak tersedia";
      this.style.display = "none";
    };

    const nama = document.createElement("h3");
    nama.textContent = item.nama;

    const harga = document.createElement("p");
    harga.className = "harga";
    harga.textContent = rupiah(item.harga);

    const tombol = document.createElement("button");
    tombol.type = "button";
    tombol.textContent = "+ Tambah";

    tombol.addEventListener("click", function () {
      tambah(item);
    });

    kartu.append(gambar, nama, harga, tombol);
    tempat.appendChild(kartu);
  });
}

// Menambahkan menu ke keranjang
function tambah(item) {
  if (!keranjang[item.nama]) {
    keranjang[item.nama] = {
      harga: item.harga,
      jumlah: 0
    };
  }

  keranjang[item.nama].jumlah++;
  perbaruiKeranjang();
}

// Menghitung dan menampilkan keranjang
function perbaruiKeranjang() {
  const daftar = document.getElementById("daftar-pesanan");
  const elemenJumlah = document.getElementById("jumlah");
  const elemenTotal = document.getElementById("total");

  if (!daftar || !elemenJumlah || !elemenTotal) {
    console.error("Elemen keranjang tidak ditemukan di HTML.");
    return;
  }

  daftar.replaceChildren();

  let total = 0;
  let jumlahBarang = 0;

  Object.entries(keranjang).forEach(([nama, item]) => {
    if (item.jumlah <= 0) return;

    const subtotal = item.harga * item.jumlah;

    total += subtotal;
    jumlahBarang += item.jumlah;

    const baris = document.createElement("p");

    const keterangan = document.createElement("span");
    keterangan.textContent =
      ${nama} x ${item.jumlah} = ${rupiah(subtotal)};

    const tombolKurang = document.createElement("button");
    tombolKurang.type = "button";
    tombolKurang.textContent = "-";
    tombolKurang.setAttribute("aria-label", "Kurangi " + nama);

    tombolKurang.addEventListener("click", function () {
      keranjang[nama].jumlah--;

      if (keranjang[nama].jumlah <= 0) {
        delete keranjang[nama];
      }

      perbaruiKeranjang();
    });

    baris.append(keterangan, tombolKurang);
    daftar.appendChild(baris);
  });

  if (jumlahBarang === 0) {
    daftar.textContent = "Belum ada pesanan.";
  }

  elemenJumlah.textContent = jumlahBarang;
  elemenTotal.textContent = rupiah(total);
}

// Membuat ringkasan pesanan
function pesan() {
  const pesanan = Object.entries(keranjang).filter(
    ([nama, item]) => item.jumlah > 0
  );

  if (pesanan.length === 0) {
    alert("Silakan pilih menu terlebih dahulu!");
    return;
  }

  let pesanannya = "Pesanan Warung Bu Nana:\n";
  let total = 0;

  pesanan.forEach(([nama, item]) => {
    pesanannya += ${nama} x ${item.jumlah}\n;
    total += item.harga * item.jumlah;
  });

  pesanannya += \nTotal pembayaran: ${rupiah(total)};

  alert(pesanannya);
}

// Menjalankan website setelah HTML siap
function mulaiWebsite() {
  tampilkanMenu(dataMakanan, "makanan");
  tampilkanMenu(dataMinuman, "minuman");
  perbaruiKeranjang();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mulaiWebsite);
} else {
  mulaiWebsite();
}
