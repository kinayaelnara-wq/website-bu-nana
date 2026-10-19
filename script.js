const dataMakanan = [
  {
    nama: "Lotek",
    harga: 4000,
    gambar: "https://commons.wikimedia.org/wiki/Special:FilePath/Lotek%20Indonesian%20food.jpg"
  },
  {
    nama: "Kupat Tahu",
    harga: 5000,
    gambar: "https://warna-cloudinary.b-cdn.net/ungu/opt-e6b9188ef9eef687f520c53a691068c8.jpg"
  },
  {
    nama: "Gado-Gado",
    harga: 5000,
    gambar: "https://awsimages.detik.net.id/community/media/visual/2024/02/14/resep-gado-gado-siram.jpeg?w=1200"
  },
  {
    nama: "Soto Ayam",
    harga: 10000,
    gambar: "https://rricoid-assets.obs.ap-southeast-4.myhuaweicloud.com/berita/Singaraja/o/1734748970752-media_1617781998_0/kfs6xnou4g6nosx.jpeg"
  }
];

const dataMinuman = [
  {
    nama: "Es Teh",
    harga: 3000,
    gambar: "https://tribratanews.polri.go.id/web/image/blog.post/91984/image"
  },
  {
    nama: "Lemon Tea",
    harga: 4000,
    gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=700"
  },
  {
    nama: "Soda Gembira",
    harga: 5000,
    gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=700"
  },
  {
    nama: "Es Jeruk",
    harga: 4000,
    gambar: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800"
  }
];

const keranjang = {};

function rupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function tampilkanMenu(data, id) {
  const tempat = document.getElementById(id);

  if (!tempat) {
    console.error("Elemen tidak ditemukan:", id);
    return;
  }

  tempat.replaceChildren();

  data.forEach(item => {
    const kartu = document.createElement("div");
    kartu.className = "card";

    const gambar = document.createElement("img");
    gambar.className = "gambar";
    gambar.src = item.gambar;
    gambar.alt = item.nama;
    gambar.loading = "lazy";

    gambar.onerror = function () {
      this.style.display = "none";
    };

    const nama = document.createElement("h3");
    nama.textContent = item.nama;

    const harga = document.createElement("p");
    harga.className = "harga";
    harga.textContent = rupiah(item.harga);

    const tombol = document.createElement("button");
    tombol.textContent = "+ Tambah";
    tombol.type = "button";
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
  const jumlahEl = document.getElementById("jumlah");
  const totalEl = document.getElementById("total");

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

    const hapus = document.createElement("button");
    hapus.textContent = "-";
    hapus.type = "button";

    hapus.onclick = () => {
      item.jumlah--;

      if (item.jumlah <= 0) {
        delete keranjang[nama];
      }

      perbaruiKeranjang();
    };

    baris.append(keterangan, hapus);
    daftar.appendChild(baris);
  });

  if (jumlahBarang === 0) {
    daftar.textContent = "Belum ada pesanan.";
  }

  jumlahEl.textContent = jumlahBarang;
  totalEl.textContent = rupiah(total);
}

function pesan() {
  const pesanan = Object.entries(keranjang)
    .filter(([, item]) => item.jumlah > 0);

  if (pesanan.length === 0) {
    alert("Silakan pilih menu terlebih dahulu!");
    return;
  }

  let ringkasan = "Pesanan Warung Bu Nana:\n";
  let total = 0;

  pesanan.forEach(([nama, item]) => {
    ringkasan += ${nama} x ${item.jumlah}\n;
    total += item.harga * item.jumlah;
  });

  ringkasan += \nTotal: ${rupiah(total)};
  alert(ringkasan);
}

function mulaiWebsite() {
  tampilkanMenu(dataMakanan, "makanan");
  tampilkanMenu(dataMinuman, "minuman");
  perbaruiKeranjang();

  const tombol = document.getElementById("tombol-pesan");
  if (tombol) tombol.addEventListener("click", pesan);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mulaiWebsite);
} else {
  mulaiWebsite();
}
