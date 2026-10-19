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
    nama: "Soto",
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
    nama: "LemonTea",
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

function tampilkanMenu(data, id) {
  const tempat = document.getElementById(id);

  data.forEach(item => {
    const kartu = document.createElement("div");
    kartu.className = "card";

    const gambar = document.createElement("img");
    gambar.className = "gambar";
    gambar.src = item.gambar;
    gambar.alt = item.nama;
    gambar.loading = "lazy";

    const nama = document.createElement("h3");
    nama.textContent = item.nama;

    const harga = document.createElement("p");
    harga.className = "harga";
    harga.textContent = rupiah(item.harga);

    const tombol = document.createElement("button");
    tombol.textContent = "+ Tambah";
    tombol.onclick = () => tambah(item);

    kartu.append(gambar, nama, harga, tombol);
    tempat.appendChild(kartu);
  });
}

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

function perbaruiKeranjang() {
  const daftar = document.getElementById("daftar-pesanan");
  daftar.replaceChildren();

  let total = 0;
  let jumlahBarang = 0;

  Object.entries(keranjang).forEach(([nama, item]) => {
    if (item.jumlah === 0) return;

    const subtotal = item.harga * item.jumlah;
    total += subtotal;
    jumlahBarang += item.jumlah;

    const baris = document.createElement("p");
    const keterangan = document.createElement("span");
    keterangan.textContent =
      ${nama} x ${item.jumlah} = ${rupiah(subtotal)};

    const hapus = document.createElement("button");
    hapus.textContent = "-";
    hapus.onclick = () => {
      item.jumlah--;
      if (item.jumlah === 0) delete keranjang[nama];
      perbaruiKeranjang();
    };

    baris.append(keterangan, hapus);
    daftar.appendChild(baris);
  });

  if (jumlahBarang === 0) {
    daftar.textContent = "Belum ada pesanan.";
  }

  document.getElementById("jumlah").textContent = jumlahBarang;
  document.getElementById("total").textContent = rupiah(total);
}

function pesan() {
  if (Object.keys(keranjang).length === 0) {
    alert("Silakan pilih menu terlebih dahulu!");
    return;
  }

  let pesanannya = "Pesanan Bu Nana:\n";
  let total = 0;

  Object.entries(keranjang).forEach(([nama, item]) => {
    pesanannya += ${nama} x ${item.jumlah}\n;
    total += item.harga * item.jumlah;
  });

  pesanannya += "\nTotal: " + rupiah(total);

  alert(pesanannya);
}

tampilkanMenu(dataMakanan, "makanan");
tampilkanMenu(dataMinuman, "minuman");
