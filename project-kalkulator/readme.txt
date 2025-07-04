// =========================
// 1. VARIABEL UTAMA
// =========================

let layarTampil = '0';              // Menyimpan angka yang terlihat di layar
let angkaPertama = null;            // Menyimpan angka pertama sebelum operator
let operatorSekarang = null;        // Menyimpan operator seperti +, -, *, /
let menungguAngkaKedua = false;     // Penanda: apakah kita sedang menunggu angka kedua?


// =========================
// 2. FUNGSI UTAMA
// =========================

// ✅ Menampilkan angka di layar kalkulator
function perbaruiLayar() {
  document.getElementById('layar').value = layarTampil;
}

// ✅ Saat angka ditekan
function masukkanAngka(angka) {
  if (menungguAngkaKedua) {
    layarTampil = angka;             // ganti angka baru di layar
    menungguAngkaKedua = false;
  } else {
    layarTampil = (layarTampil === '0') ? angka : layarTampil + angka;
  }
  perbaruiLayar();
}

// ✅ Saat titik (desimal) ditekan
function masukkanTitik() {
  if (!layarTampil.includes('.')) {
    layarTampil += '.';
    perbaruiLayar();
  }
}

// ✅ Saat operator ditekan (+, -, *, /)
function prosesOperator(opBaru) {
  const angkaSekarang = parseFloat(layarTampil);

  if (angkaPertama === null) {
    angkaPertama = angkaSekarang;
  } else if (operatorSekarang) {
    const hasil = hitung(angkaPertama, angkaSekarang, operatorSekarang);
    layarTampil = String(hasil);
    angkaPertama = hasil;
    perbaruiLayar();
  }

  operatorSekarang = opBaru;
  menungguAngkaKedua = true;
}

// ✅ Fungsi perhitungan sesuai operator
function hitung(a, b, operator) {
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (operator === '/') return a / b;
  return b;  // fallback
}

// ✅ Saat tombol "=" ditekan
function tampilkanHasil() {
  if (operatorSekarang && angkaPertama !== null) {
    const hasil = hitung(angkaPertama, parseFloat(layarTampil), operatorSekarang);
    layarTampil = String(hasil);
    angkaPertama = null;
    operatorSekarang = null;
    menungguAngkaKedua = false;
    perbaruiLayar();
  }
}

// ✅ Saat tombol "Hapus" ditekan
function hapusSemua() {
  layarTampil = '0';
  angkaPertama = null;
  operatorSekarang = null;
  menungguAngkaKedua = false;
  perbaruiLayar();
}


// =========================
// 3. TOMBOL EVENT LISTENER
// =========================

// 🔘 Saat tombol angka, operator, titik, hapus, atau sama dengan ditekan
document.getElementById('tombol-kalkulator').addEventListener('click', function (event) {
  const tombol = event.target;

  if (tombol.tagName !== 'BUTTON') return;

  const nilai = tombol.value;

  // 🧮 Angka
  if (!isNaN(nilai)) {
    masukkanAngka(nilai);
  }
  // 🔹 Titik (desimal)
  else if (nilai === '.') {
    masukkanTitik();
  }
  // ➕➖✖️➗ Operator
  else if (['+', '-', '*', '/'].includes(nilai)) {
    prosesOperator(nilai);
  }
});

// 🔘 Saat tombol "=" ditekan
document.getElementById('sama-dengan').addEventListener('click', tampilkanHasil);

// 🔘 Saat tombol "Hapus" ditekan
document.getElementById('hapus').addEventListener('click', hapusSemua);

// ⏱️ Tampilkan layar awal saat halaman dibuka
perbaruiLayar();
