// Array untuk menyimpan daftar pesanan sementara di keranjang
let pesanan = [];

// Fungsi untuk menambah menu ke keranjang
function tambahPesanan(namaMenu, hargaMenu) {
    // Cek apakah menu yang sama sudah ada di keranjang
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
    
    // Perbarui tampilan ringkasan pesanan di layar
    tampilkanPesanan();
}

// Fungsi untuk menampilkan daftar pesanan di halaman web
function tampilkanPesanan() {
    let daftarPesananDiv = document.getElementById('daftar-pesanan');
    let totalHargaSpan = document.getElementById('total-harga');
    
    // Kalau elemen penampungnya belum ada di HTML, lewati
    if (!daftarPesananDiv) return;
    
    daftarPesananDiv.innerHTML = '';
    let totalKeseluruhan = 0;
    
    pesanan.forEach((item, index) => {
        let subtotal = item.harga * item.jumlah;
        totalKeseluruhan += subtotal;
        
        // Buat elemen teks untuk setiap item di keranjang
        let itemElement = document.div;
        daftarPesananDiv.innerHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
                <span>${index + 1}. ${item.nama} (x${item.jumlah})</span>
                <span>Rp${subtotal.toLocaleString('id-ID')}</span>
            </div>
        `;
    });
    
    // Tampilkan total harga keseluruhan
    if (totalHargaSpan) {
        totalHargaSpan.innerText = Rp${totalKeseluruhan.toLocaleString('id-ID')};
    }
}

// Fungsi untuk mengosongkan keranjang
function kosongkanPesanan() {
    pesanan = [];
    tampilkanPesanan();
}

// Fungsi untuk mengirim pesanan ke WhatsApp Bu Nana
function kirimKeWhatsApp() {
    if (pesanan.length === 0) {
        alert("Keranjang pesanan masih kosong, silakan pilih menu terlebih dahulu!");
        return;
    }
    
    // Ambil data nomor meja dan catatan dari input HTML
    let nomorMeja = document.getElementById('nomor-meja') ? document.getElementById('nomor-meja').value : 'Tanpa Meja';
    let catatan = document.getElementById('catatan') ? document.getElementById('catatan').value : '-';
    
    // Nomor WhatsApp Bu Nana (Ganti dengan nomor aslinya, format pakai 62 tanpa angka 0 di depan)
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
    
    // Encode teks agar aman dibaca oleh URL WhatsApp
    let urlWA = https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)};
    
    // Buka WhatsApp di tab/aplikasi baru
    window.open(urlWA, '_blank');
}
