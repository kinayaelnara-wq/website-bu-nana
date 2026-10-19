// Array untuk menyimpan daftar item yang dipilih di keranjang
let pesanan = [];

// Fungsi untuk menambah menu ke keranjang
function tambahPesanan(namaMenu, hargaMenu) {
    let itemAda = pesanan.find(item => item.nama === namaMenu);
    
    if (itemAda) {
        itemAda.jumlah += 1;
    } else {
        pesanan.push({
            nama: namaMenu,
            harga: hargaMenu,
            jumlah: 1
        });
    }
    
    tampilkanPesanan();
}

// Fungsi untuk memperbarui tampilan daftar pesanan di keranjang web
function tampilkanPesanan() {
    let daftarPesananDiv = document.getElementById('daftar-pesanan');
    let totalHargaSpan = document.getElementById('total-harga');
    
    if (!daftarPesananDiv) return;
    
    if (pesanan.length === 0) {
        daftarPesananDiv.innerHTML = '<p class="empty-cart">Belum ada menu yang dipilih.</p>';
        totalHargaSpan.innerText = 'Rp0';
        return;
    }
    
    daftarPesananDiv.innerHTML = '';
    let totalKeseluruhan = 0;
    
    pesanan.forEach((item, index) => {
        let subtotal = item.harga * item.jumlah;
        totalKeseluruhan += subtotal;
        
        // Tampilkan baris item di keranjang
        daftarPesananDiv.innerHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; border-bottom: 1px solid #f1f2f6; padding-bottom: 4px;">
                <span>${index + 1}. ${item.nama} (x${item.jumlah})</span>
                <span style="font-weight: 600;">Rp${subtotal.toLocaleString('id-ID')}</span>
            </div>
        `;
    });
    
    totalHargaSpan.innerText = Rp${totalKeseluruhan.toLocaleString('id-ID')};
}

// Fungsi untuk mengosongkan keranjang
function kosongkanPesanan() {
    pesanan = [];
    tampilkanPesanan();
}

// Fungsi untuk mengirim pesanan terstruktur ke WhatsApp Bu Nana
function kirimKeWhatsApp() {
    if (pesanan.length === 0) {
        alert("Keranjang pesanan masih kosong, silakan pilih menu terlebih dahulu!");
        return;
    }
    
    let nomorMeja = document.getElementById('nomor-meja').value.trim();
    if (nomorMeja === "") {
        nomorMeja = "Tanpa Meja / Dibungkus";
    }
    
    let catatan = document.getElementById('catatan').value.trim();
    if (catatan === "") {
        catatan = "-";
    }
    
    // Masukkan nomor WhatsApp tujuan (Ganti angka di bawah dengan nomor WhatsApp Bu Nana, format 62...)
    let nomorWA = "628xxxxxxxxxx"; 
    
    let pesan = Halo Bu Nana, saya ingin memesan:\n;
    pesan += Nomor Meja: ${nomorMeja}\n\n;
    
    let totalKeseluruhan = 0;
    pesanan.forEach((item, index) => {
        let subtotal = item.harga * item.jumlah;
        totalKeseluruhan += subtotal;
        pesan += ${index + 1}. ${item.nama} x${item.jumlah} = Rp${subtotal.toLocaleString('id-ID')}\n;
    });
    
    pesan += \nTotal Keseluruhan: Rp${totalKeseluruhan.toLocaleString('id-ID')}\n;
    pesan += Catatan: ${catatan}\n\n;
    pesan += Mohon segera diproses ya, terima kasih!;
    
    let urlWA = https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)};
    window.open(urlWA, '_blank');
}
