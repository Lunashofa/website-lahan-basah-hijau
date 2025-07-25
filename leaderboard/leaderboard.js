// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDguvGwMNqADw8vC2877IDvoxmnTvj1txU",
  authDomain: "inovasi-stem-lahan-basah.firebaseapp.com",
  databaseURL: "https://inovasi-stem-lahan-basah-default-rtdb.firebaseio.com",
  projectId: "inovasi-stem-lahan-basah",
  storageBucket: "inovasi-stem-lahan-basah.firebasestorage.app",
  messagingSenderId: "853863316290",
  appId: "1:853863316290:web:721e94519c84e725f1a6db",
  measurementId: "G-J8T4Z03MW8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const leaderboardBody = document.getElementById("leaderboard-body");

db.ref("leaderboard/video").once("value", snapshot => {
  const data = snapshot.val();
  leaderboardBody.innerHTML = "";

  if (data) {
    const entries = Object.values(data).sort((a, b) => b.skor - a.skor);

    entries.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.skor}</td>
        <td>${item.total}</td>
        <td>${new Date(item.waktu).toLocaleString("id-ID")}</td>
      `;
      leaderboardBody.appendChild(row);
    });
  } else {
    leaderboardBody.innerHTML = `<tr><td colspan="5" class="text-center">Belum ada data.</td></tr>`;
  }
});
