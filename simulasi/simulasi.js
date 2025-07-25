// ==== simulasi.js ==== //

// Data aktivitas dan dampaknya
const aktivitas = [
  {
    id: "restorasi",
    nama: "🌱 Restorasi Ekosistem",
    dampak: "positif",
    penjelasan: "Hebat! Kodokko dan Bango tersenyum melihat tanaman air tumbuh kembali dan sungai menjadi jernih kembali!",
    icon: "/simulasi/foto-simulasi/restorasi.png"
  },
  {
    id: "penebangan",
    nama: "🪓 Penebangan Pohon Liar",
    dampak: "negatif",
    penjelasan: "Oh no! Penebangan pohon liar membuat rumah Bango lenyap dan Kodokko jadi kehujanan terus karena tak ada pohon yang meneduhinya!",
    icon: "/simulasi/foto-simulasi/penebangan.png"
  },
  {
    id: "limbah",
    nama: "🏭 Pembuangan Limbah Sembarangan",
    dampak: "negatif",
    penjelasan: "Waduh! Limbah mencemari air, Kodokko pusing dan ikan-ikan kecil jadi kehilangan tempat bermain!",
    icon: "/simulasi/foto-simulasi/limbah.png"
  },
  {
    id: "edukasi",
    nama: "📚 Edukasi Lingkungan",
    dampak: "positif",
    penjelasan: "Yeay! Banyak anak-anak datang belajar bersama Kodokko dan Bango. Mereka kini tahu pentingnya menjaga lahan basah!",
    icon: "/simulasi/foto-simulasi/edukasi.png"
  },
  {
    id: "pembuangan",
    nama: "🚯 Pembuangan Sampah di Sungai",
    dampak: "negatif",
    penjelasan: "Sampah menumpuk di sungai, membuat air tercemar dan Kodokko tidak bisa berenang dengan nyaman!",
    icon: "/simulasi/foto-simulasi/buang-sampah.png"
  },
  {
    id: "konservasi",
    nama: "🌿 Melindungi Alam",
    dampak: "positif",
    penjelasan: "Kodokko bangga karena manusia ikut membersihkan rawa dan menjaga keanekaragaman hayati!",
    icon: "/simulasi/foto-simulasi/konservasi.png"
  }
];

const aktivitasList = document.getElementById("aktivitas-list");
const dropZone = document.getElementById("area-ekosistem");
const dampakArea = document.getElementById("dampak-area");

// Tampilkan aktivitas sebagai kartu drag dengan icon
aktivitas.forEach((act, i) => {
  const div = document.createElement("div");
  div.className = "drag-item";
  div.setAttribute("draggable", true);
  div.dataset.id = act.id;
  div.setAttribute("data-aos", "fade-up");
  div.setAttribute("data-aos-delay", i * 100);

  div.innerHTML = `
    <img src="${act.icon}" alt="${act.nama}">
    <span>${act.nama}</span>
  `;

  // Event drag
  div.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", act.id);
  });

  aktivitasList.appendChild(div);
});

// Event drop area
['dragover', 'dragenter'].forEach(evt => {
  dropZone.addEventListener(evt, e => {
    e.preventDefault();
    dropZone.classList.add("border-success");
  });
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("border-success");
});

dropZone.addEventListener("drop", e => {
  e.preventDefault();
  dropZone.classList.remove("border-success");

  const id = e.dataTransfer.getData("text/plain");
  const selected = aktivitas.find(a => a.id === id);

  dampakArea.className = ""; // 🔥 RESET semua class agar bersih
  dampakArea.style.background = "";

  if (selected) {
    if (selected.dampak === "positif") {
      dampakArea.className = "alert alert-success text-success";
      dampakArea.style.background = "#d1fce5";
    } else {
      dampakArea.className = "alert alert-danger text-danger";
      dampakArea.style.background = "#ffe5e5";
    }
    dampakArea.innerHTML = selected.penjelasan;
  } else {
    dampakArea.className = "alert alert-warning";
    dampakArea.style.background = "#fff3cd";
    dampakArea.innerHTML = "❓ Aktivitas tidak dikenali.";
  }
});


// Inisialisasi AOS
AOS.init();

// Tambahkan highlight menyala saat awal
dropZone.classList.add("highlight-strong");

// Hapus highlight saat pengguna menjatuhkan aktivitas
dropZone.addEventListener("drop", () => {
  dropZone.classList.remove("highlight-strong");
});

