// Data Menu Lengkap Bu Nana Sesuai Spanduk dengan Visual Kotak Rapi
const makanan = [
    { nama: "Lotek", harga: 13000, icon: "🥗" },
    { nama: "Kupat Tahu", harga: 13000, icon: "🍲" },
    { nama: "Nasi Ayam Geprek", harga: 13000, icon: "🍗" },
    { nama: "Nasi Goreng", harga: 13000, icon: "🍛" },
    { nama: "Nasi Telor", harga: 13000, icon: "🍳" },
    { nama: "IndTel Goreng", harga: 13000, icon: "🍜" },
    { nama: "IndTel Rebus", harga: 13000, icon: "🍜" },
    { nama: "Soto", harga: 10000, icon: "🍲" }
];

const minuman = [
    { nama: "Es Teh", harga: 3000, icon: "🧋" },
    { nama: "LemonTea", harga: 4000, icon: "🍋" },
    { nama: "Es Jeruk", harga: 4000, icon: "🍊" },
    { nama: "Nutrisari", harga: 4000, icon: "🧃" },
    { nama: "Kopi Hitam", harga: 5000, icon: "☕" },
    { nama: "Gooday", harga: 5000, icon: "☕" },
    { nama: "Cocolatos", harga: 5000, icon: "🍫" },
    { nama: "Milo", harga: 5000, icon: "🥛" },
    { nama: "Bengbeng", harga: 5000, icon: "🍫" },
    { nama: "Teh Tarik", harga: 5000, icon: "🧋" },
    { nama: "JosSua", harga: 7000, icon: "🥤" },
    { nama: "Dancow Putih/Coklat", harga: 7000, icon: "🥛" }
];

// Ambil nomor meja dari URL parameter
const urlParams = new URLSearchParams(window.location.search);
const nomorMeja = urlParams.get('meja') || 'Tanpa Meja';

document.addEventListener("DOMContentLoaded", () => {
    const elMeja = document.getElementById("infoMeja");
    if (elMeja) {
        elMeja.innerText = "Nomor Meja: " + nomorMeja;
    }

    tampilkanMenu(makanan, "menuMakanan");
    tampilkanMenu(minuman, "menuMinuman");
});

// Fungsi Tampilkan Menu persis seperti kotak kartu di foto
function tampilkanMenu(daftar, idElemen) {
    const kontainer = document.getElementById(idElemen);
    if (!kontainer) return;

    kontainer.innerHTML = "";
    daftar.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <div class="card-img-box">
                <span style="font-size: 42px;">${item.icon}</span>
            </div>
            <h4>${item.nama}</h4>
            <p>Rp${item.harga.toLocaleString('id-ID')}</p>
            <button onclick="tambahKeKeranjang('${item.nama}', ${item.harga})">+ Tambah</button>
        `;
        kontainer.appendChild(card);
    });
}

// Fitur Keranjang Pesanan
let keranjang = [];

function tambahKeKeranjang(nama, harga) {
    keranjang.push({ nama, harga });
    perbaruiKeranjang();
}

function perbaruiKeranjang() {
    const daftarPesanan = document.getElementById("daftarPesanan");
    const totalEl = document.getElementById("total");
    
    if (!daftarPesanan || !totalEl) return;

    if (keranjang.length === 0) {
        daftarPesanan.innerText = "Belum ada pesanan.";
        totalEl.innerText = "0";
        return;
    }

    daftarPesanan.innerHTML = "";
    let total = 0;

    keranjang.forEach((item, index) => {
        total += item.harga;
        const p = document.createElement("p");
        p.innerText = (index + 1) + ". " + item.nama + " - Rp" + item.harga.toLocaleString('id-ID');
        daftarPesanan.appendChild(p);
    });

    totalEl.innerText = total.toLocaleString('id-ID');
}

function kosongkanKeranjang() {
    keranjang = [];
    perbaruiKeranjang();
}