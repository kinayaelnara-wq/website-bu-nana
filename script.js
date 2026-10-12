// Data Keranjang Belanja
let keranjang = [];

function tambahKeKeranjang(nama, harga) {
    let item = keranjang.find(p => p.nama === nama);
    if (item) {
        item.jumlah += 1;
    } else {
        keranjang.push({ nama: nama, harga: harga, jumlah: 1 });
    }
    perbaruiKeranjang();
}

function perbaruiKeranjang() {
    let listKeranjang = document.getElementById("listKeranjang");
    let totalHarga = document.getElementById("totalHarga");
    if (!listKeranjang || !totalHarga) return;

    listKeranjang.innerHTML = "";
    let total = 0;

    keranjang.forEach((item, index) => {
        let subtotal = item.harga * item.jumlah;
        total += subtotal;
        listKeranjang.innerHTML += `
            <li>
                ${item.nama} - Rp ${item.harga.toLocaleString('id-ID')} x ${item.jumlah} = Rp ${subtotal.toLocaleString('id-ID')}
                <button onclick="kurangiItem(${index})">-</button>
                <button onclick="tambahItem(${index})">+</button>
            </li>
        `;
    });

    totalHarga.innerText = "Rp " + total.toLocaleString('id-ID');
}

function tambahItem(index) {
    keranjang[index].jumlah += 1;
    perbaruiKeranjang();
}

function kurangiItem(index) {
    keranjang[index].jumlah -= 1;
    if (keranjang.length === 0 || keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }
    perbaruiKeranjang();
}

function kosongkanKeranjang() {
    keranjang = [];
    perbaruiKeranjang();
}

// Fitur Kirim Pesanan ke WhatsApp Admin (Bu Nana)
function kirimKeWhatsApp() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong! Silakan pilih menu terlebih dahulu.");
        return;
    }

    let nomorMeja = document.getElementById("nomorMeja") ? document.getElementById("nomorMeja").value : "Tanpa Meja";
    let inputCatatan = document.getElementById("catatan");
    let catatan = inputCatatan ? inputCatatan.value : "";
    let nomorAdmin = "6281230139560"; // Nomor WhatsApp Bu Nana / Admin

    // 1. Menyusun Format Pesan
    let pesan = "Halo Bu Nana, saya ingin memesan:\n";
    pesan += "Nomor Meja: " + nomorMeja + "\n\n";

    let total = 0;
    keranjang.forEach(function(item, index) {
        let subtotal = item.harga * item.jumlah;
        total += subtotal;
        pesan += (index + 1) + ". " + item.nama + " x" + item.jumlah + " = Rp" + subtotal.toLocaleString('id-ID') + "\n";
    });

    if (catatan) {
        pesan += "\nCatatan: " + catatan + "\n";
    }

    pesan += "\nTotal Keseluruhan: Rp" + total.toLocaleString('id-ID') + "\n";
    pesan += "Mohon segera diproses ya, terima kasih!";

    // 2. Format Link WhatsApp
    let urlWA = "https://api.whatsapp.com/send?phone=" + nomorAdmin + "&text=" + encodeURIComponent(pesan);

    // 3. Buka WhatsApp
    window.open(urlWA, '_blank');
}
