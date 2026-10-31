
// ======================================
// GENIUS ACADEMY - TOPPER PRESENTATION
// TOP 4 RANK SYSTEM
// ======================================

// STUDENT DATA

const classData = {
  5: [],
  6: [],
  7: [],

  8: [
    {
      name: "SALMANI SHAD KHURSHID",
      marks: 125,
      total: 160,
      photo: ""
    },
    {
      name: "Mansuri alishan",
      marks: 79,
      total: 160,
      photo: ""
    },
    {
      name: "SHAIKH KASHIF SHAHID",
      marks: 123,
      total: 160,
      photo: ""
    },
    {
      name: "Yadav Zeenal",
      marks: 73,
      total: 160,
      photo: ""
    }
  ],

  9: [],
  10: []
};

// ======================================
// REVEAL SETTINGS
// ======================================

// 4th -> 3rd -> 2nd -> 1st

const revealOrder = [4, 3, 2, 1];

let currentReveal = 0;
let students = [];

const revealBtn = document.getElementById("revealBtn");
const resetBtn = document.getElementById("resetBtn");
const classSelect = document.getElementById("classSelect");
const instruction = document.getElementById("instruction");

// ======================================
// LOAD SELECTED CLASS
// ======================================

function loadClass() {

  const selectedClass = classSelect.value;

  students = [...(classData[selectedClass] || [])];

  // Automatic percentage-based ranking

  students.sort((a, b) => {

    const percentageA = (a.marks / a.total) * 100;
    const percentageB = (b.marks / b.total) * 100;

    return percentageB - percentageA;

  });

  resetPresentation();

  if (students.length < 4) {

    instruction.textContent =
      "Please add at least 4 students for this class.";

    revealBtn.disabled = true;
    revealBtn.textContent = "ADD 4 STUDENTS FIRST";

    return;
  }

  revealBtn.disabled = false;

  instruction.textContent =
    `Class ${selectedClass} - Meet our Top 4 Champions!`;

  revealBtn.textContent = "REVEAL 4TH RANK ✨";
}

// ======================================
// SHOW STUDENT INFORMATION
// ======================================

function showStudent(rank) {

  const student = students[rank - 1];

  if (!student) return;

  const photoBox = document.getElementById(`photo${rank}`);

  if (!photoBox) {
    console.error(`photo${rank} element missing in HTML`);
    return;
  }

  // Student initials

  photoBox.replaceChildren();

  const initials = student.name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .slice(0, 2);

  photoBox.textContent = initials;

  // Student photo

  if (student.photo && student.photo.trim() !== "") {

    const img = document.createElement("img");

    img.src = student.photo;
    img.alt = student.name;

    img.onerror = () => {
      img.remove();
      photoBox.textContent = initials;
    };

    photoBox.textContent = "";
    photoBox.appendChild(img);
  }

  // Calculate percentage

  const percentage =
    (student.marks / student.total) * 100;

  document.getElementById(`name${rank}`).textContent =
    student.name;

  document.getElementById(`marks${rank}`).textContent =
    `${student.marks}/${student.total}`;

  document.getElementById(`percent${rank}`).textContent =
    `${percentage.toFixed(2)}%`;

  // Reveal animation

  const card = document.getElementById(`rank${rank}`);

  if (!card) {
    console.error(`rank${rank} element missing in HTML`);
    return;
  }

  card.classList.remove("hidden");
  card.classList.add("show");
}

// ======================================
// CONFETTI CELEBRATION
// ======================================

function launchConfetti() {

  const container = document.getElementById("confetti");

  if (!container) return;

  const colors = [
    "#FFD700",
    "#FFFFFF",
    "#D9A441",
    "#F2C94C",
    "#C0C0C0"
  ];

  for (let i = 0; i < 100; i++) {

    const piece = document.createElement("div");

    piece.className = "confetti-piece";

    piece.style.left = Math.random() * 100 + "vw";

    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.animationDelay =
      Math.random() * 1.5 + "s";

    piece.style.animationDuration =
      (2 + Math.random() * 2) + "s";

    container.appendChild(piece);

    setTimeout(() => piece.remove(), 5000);
  }
}

// ======================================
// REVEAL TOPPERS ONE BY ONE
// ======================================

function revealNext() {

  if (currentReveal >= revealOrder.length) {
    return;
  }

  const rank = revealOrder[currentReveal];

  showStudent(rank);

  launchConfetti();

  // Rank messages

  if (rank === 4) {

    instruction.textContent =
      "🏅 Congratulations! Our Fourth Rank Champion!";

  } else if (rank === 3) {

    instruction.textContent =
      "🥉 Congratulations! Our Third Rank Champion!";

  } else if (rank === 2) {

    instruction.textContent =
      "🥈 Amazing! Here comes our Second Rank Champion!";

  } else if (rank === 1) {

    instruction.textContent =
      "🏆 THE WINNER! Congratulations to our First Rank Champion!";

  }

  currentReveal++;

  // Next reveal button

  if (currentReveal < revealOrder.length) {

    const nextRank = revealOrder[currentReveal];

    revealBtn.textContent =
      `REVEAL ${nextRank}${getSuffix(nextRank)} RANK ✨`;

  } else {

    revealBtn.textContent = "🏆 ALL 4 CHAMPIONS REVEALED!";

    revealBtn.disabled = true;
  }
}

// ======================================
// RANK SUFFIX
// ======================================

function getSuffix(rank) {

  if (rank === 1) return "ST";

  if (rank === 2) return "ND";

  if (rank === 3) return "RD";

  return "TH";
}

// ======================================
// RESET PRESENTATION
// ======================================

function resetPresentation() {

  currentReveal = 0;

  // Hide all 4 cards

  [1, 2, 3, 4].forEach(rank => {

    const card = document.getElementById(`rank${rank}`);

    if (card) {

      card.classList.add("hidden");
      card.classList.remove("show");

    }
  });

  instruction.textContent =
    "Are you ready to celebrate our champions?";

  revealBtn.disabled = false;

  revealBtn.textContent = "REVEAL 4TH RANK ✨";

  const container = document.getElementById("confetti");

  if (container) {
    container.replaceChildren();
  }
}

// ======================================
// FULL SCREEN
// ======================================

document.getElementById("fullscreenBtn")
  .addEventListener("click", async () => {

    try {

      if (!document.fullscreenElement) {

        await document.documentElement.requestFullscreen();

      } else {

        await document.exitFullscreen();

      }

    } catch (error) {

      console.error("Fullscreen error:", error);

      alert("Fullscreen is not supported in this browser.");

    }

  });

// ======================================
// BUTTON EVENTS
// ======================================

revealBtn.addEventListener("click", revealNext);

resetBtn.addEventListener("click", loadClass);

// ======================================
// CLASS CHANGE EVENT
// ======================================

classSelect.addEventListener("change", loadClass);

// ======================================
// START WEBSITE
// ======================================

loadClass();
