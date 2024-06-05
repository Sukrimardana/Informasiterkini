// Memeriksa apakah ada data keuangan tersimpan di localStorage
let dataKeuangan = JSON.parse(localStorage.getItem('dataKeuangan')) || [];

// Fungsi untuk menyimpan data ke localStorage
function simpanDataKeuangan() {
    localStorage.setItem('dataKeuangan', JSON.stringify(dataKeuangan));
}

// Fungsi untuk menampilkan data keuangan dari localStorage
function tampilkanDataKeuangan() {
    const container = document.getElementById('data-keuangan');

    // Membuat tabel untuk menampilkan data
    const tabel = document.createElement('table');
    tabel.innerHTML = `
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Keterangan</th>
                <th>Nominal</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody id="tabel-body">
            <!-- Tempat untuk data -->
        </tbody>
    `;

    container.appendChild(tabel);

    // Ambil tbody untuk memasukkan data
    const tbody = document.getElementById('tabel-body');

    // Menambahkan data dari localStorage ke dalam tabel
    dataKeuangan.forEach(item => {
        tambahkanKeTabel(item);
    });
}

// Fungsi untuk menambahkan data ke dalam tabel
function tambahkanKeTabel(item) {
    const row = document.createElement('tr');
    row.setAttribute('data-id', item.id); // Menyimpan ID data sebagai atribut

    row.innerHTML = `
        <td>${item.tanggal}</td>
        <td>${item.keterangan}</td>
        <td>${item.nominal}</td>
        <td>
            <button onclick="editData(${item.id})">Edit</button>
            <button onclick="hapusData(${item.id})">Hapus</button>
        </td>
    `;

    document.getElementById('tabel-body').appendChild(row);
}

// Fungsi untuk menambahkan data baru
function tambahData() {
    const tanggal = document.getElementById('tanggal').value;
    const keterangan = document.getElementById('keterangan').value;
    const nominal = parseInt(document.getElementById('nominal').value);

    // Validasi input
    if (tanggal === '' || keterangan === '' || isNaN(nominal)) {
        alert('Harap isi semua kolom dengan benar.');
        return;
    }

    // Generate ID baru
    const idBaru = dataKeuangan.length > 0 ? dataKeuangan[dataKeuangan.length - 1].id + 1 : 1;

    // Buat objek data baru
    const newData = {
        id: idBaru,
        tanggal: tanggal,
        keterangan: keterangan,
        nominal: nominal
    };

    // Tambahkan data ke array dan tabel
    dataKeuangan.push(newData);
    tambahkanKeTabel(newData);

    // Simpan data ke localStorage
    simpanDataKeuangan();

    // Kosongkan input setelah ditambahkan
    document.getElementById('tanggal').value = '';
    document.getElementById('keterangan').value = '';
    document.getElementById('nominal').value = '';
}

// Fungsi untuk menghapus data
function hapusData(id) {
    // Filter data berdasarkan ID
    dataKeuangan = dataKeuangan.filter(item => item.id !== id);

    // Perbarui tabel
    const tbody = document.getElementById('tabel-body');
    tbody.innerHTML = ''; // Kosongkan isi tbody

    // Tampilkan ulang data keuangan setelah dihapus
    dataKeuangan.forEach(item => {
        tambahkanKeTabel(item);
    });

    // Simpan perubahan ke localStorage
    simpanDataKeuangan();
}

// Fungsi untuk mengedit data
function editData(id) {
    // Temukan data berdasarkan ID
    const item = dataKeuangan.find(item => item.id === id);

    // Isi nilai input dengan data yang akan diubah
    document.getElementById('tanggal').value = item.tanggal;
    document.getElementById('keterangan').value = item.keterangan;
    document.getElementById('nominal').value = item.nominal;

    // Ubah fungsi tombol tambah untuk menjadi tombol update
    const tambahButton = document.querySelector('.btn-container button');
    tambahButton.innerHTML = 'Update Data';
    tambahButton.setAttribute('onclick', `updateData(${id})`);
}

// Fungsi untuk mengupdate data
function updateData(id) {
    const tanggal = document.getElementById('tanggal').value;
    const keterangan = document.getElementById('keterangan').value;
    const nominal = parseInt(document.getElementById('nominal').value);

    // Validasi input
    if (tanggal === '' || keterangan === '' || isNaN(nominal)) {
        alert('Harap isi semua kolom dengan benar.');
        return;
    }

    // Temukan index data berdasarkan ID
    const index = dataKeuangan.findIndex(item => item.id === id);

    // Update data di array
    dataKeuangan[index].tanggal = tanggal;
    dataKeuangan[index].keterangan = keterangan;
    dataKeuangan[index].nominal = nominal;

    // Kosongkan input setelah diupdate
    document.getElementById('tanggal').value = '';
    document.getElementById('keterangan').value = '';
    document.getElementById('nominal').value = '';

    // Perbarui tampilan tabel
    const tbody = document.getElementById('tabel-body');
    tbody.innerHTML = ''; // Kosongkan isi tbody

    // Tampilkan ulang data keuangan setelah diupdate
    dataKeuangan.forEach(item => {
        tambahkanKeTabel(item);
    });

    // Ubah fungsi tombol update untuk kembali menjadi tambah data
    const tambahButton = document.querySelector('.btn-container button');
    tambahButton.innerHTML = 'Tambah Data';
    tambahButton.setAttribute('onclick', 'tambahData()');

    // Simpan perubahan ke localStorage setelah diupdate
    simpanDataKeuangan();
}

// Memanggil fungsi untuk menampilkan data keuangan
tampilkanDataKeuangan();