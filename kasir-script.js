var daftarBarang = [];
var hargaProduk = {
  Beras: 15000,
  Gula: 10000,
  Minyak: 20000,
};
var totalHarga = 0;

function tambahBarang() {
  var produk = document.getElementById("produk").value;
  var jumlah = parseInt(document.getElementById("jumlah").value);

  if (isNaN(jumlah) || jumlah <= 0) {
    alert("Masukkan jumlah yang valid.");
    return;
  }

  var harga = hargaProduk[produk];
  if (!harga) {
    alert("Produk tidak valid.");
    return;
  }

  var subtotal = harga * jumlah;
  var existingItemIndex = daftarBarang.findIndex(
    (item) => item.produk === produk
  );
  if (existingItemIndex !== -1) {
    // Jika produk sudah ada, update jumlah dan subtotal
    daftarBarang[existingItemIndex].jumlah += jumlah;
    daftarBarang[existingItemIndex].subtotal += subtotal;
  } else {
    // Jika produk belum ada, tambahkan sebagai barang baru
    daftarBarang.push({
      produk: produk,
      harga: harga,
      jumlah: jumlah,
      subtotal: subtotal,
    });
  }
  tampilkanDaftarBarang();
  hitungTotal();
}

function tampilkanDaftarBarang() {
  var listContainer = document.getElementById("barang-list");
  listContainer.innerHTML = "";

  daftarBarang.forEach(function (barang, index) {
    var listItem = document.createElement("li");
    listItem.textContent =
      barang.produk +
      " - Rp" +
      barang.harga +
      " x " +
      barang.jumlah +
      " = Rp" +
      barang.subtotal;

    // Tambahkan tombol hapus untuk setiap barang
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.onclick = function () {
      hapusBarang(index);
    };
    listItem.appendChild(deleteButton);

    listContainer.appendChild(listItem);
  });
}

function hapusBarang(index) {
  daftarBarang.splice(index, 1);
  tampilkanDaftarBarang();
  hitungTotal();
}

function hitungTotal() {
  totalHarga = 0;

  daftarBarang.forEach(function (barang) {
    totalHarga += barang.subtotal;
  });

  document.getElementById("total").textContent = "Total: Rp" + totalHarga;
}

function printStruk() {
  var currentTime = new Date().toLocaleString(); // Waktu saat ini
  var uangDiberikan = parseInt(document.getElementById("uang").value);
  if (isNaN(uangDiberikan) || uangDiberikan < totalHarga) {
    alert("Masukkan jumlah uang yang valid.");
    return;
  }

  var kembalian = uangDiberikan - totalHarga;

  // Membuat isi struk pembelian
  var strukContent = "===== Struk Pembelian =====\n";
  daftarBarang.forEach(function (barang) {
    strukContent += `${barang.produk} - Rp${barang.harga} x ${barang.jumlah} = Rp${barang.subtotal}\n`;
  });
  strukContent += `Total: Rp${totalHarga}\n`;
  strukContent += `Uang Diberikan: Rp${uangDiberikan}\n`;
  strukContent += `Kembalian: Rp${kembalian}\n`;
  strukContent += `Waktu: ${currentTime}\n`;
  strukContent += "Terima kasih!";

  alert(strukContent);

  // Setelah mencetak struk, bersihkan daftar barang
  bersihkanDaftarBarang();
}

function bersihkanDaftarBarang() {
  daftarBarang = [];
  tampilkanDaftarBarang();
  hitungTotal();
}

// Fungsi untuk log out
function logout() {
  // Menghapus informasi pengguna dari sesi atau melakukan tindakan log out sesuai dengan kebutuhan aplikasi
  // Misalnya, mengarahkan pengguna kembali ke halaman log masuk atau membersihkan token otentikasi
  // Di sini, kita hanya akan mengarahkan pengguna ke halaman log masuk (asumsikan namanya login.html)
  window.location.href = "index.html";
}
