
// ======================================
// GENIUS ACADEMY - TOPPER PRESENTATION
// ======================================

// STUDENT DATA
// Yahan apne students ke naam aur marks change karo.

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
    }
  ],
  9: [],
  10: []
};

// REVEAL SETTINGS
const revealOrder = [3, 2, 1];
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

  // Sort according to percentage
  students.sort((a, b) => {
    return (b.marks / b.total) - (a.marks / a.total);
  });

  resetPresentation();

  if (students.length < 3) {
    instruction.textContent =
      "Please add at least 3 students for this class.";

    revealBtn.disabled = true;
    revealBtn.textContent = "ADD STUDENTS FIRST";
    return;
  }

  revealBtn.disabled = false;
  instruction.textContent =
    `Class ${selectedClass} - Meet our Top 3 Champions!`;

  revealBtn.textContent = "REVEAL 3RD RANK ✨";
}

// ======================================
// SHOW STUDENT INFORMATION
// ======================================

function showStudent(rank) {
  const student = students[rank - 1];

  if (!student) return;

  const photoBox = document.getElementById(`photo${rank}`);

  // Show student initials by default
  photoBox.replaceChildren();

  const initials = student.name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .slice(0, 2);

  photoBox.textContent = initials;

  // Show photo if photo URL is available
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

  // Automatic percentage
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
  card.classList.remove("hidden");
  card.classList.add("show");
}

// ======================================
// CONFETTI CELEBRATION
// ======================================

function launchConfetti() {
  const container = document.getElementById("confetti");

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

  if (rank === 3) {
    instruction.textContent =
      "🥉 Congratulations! Our Third Rank Champion!";
  }

  if (rank === 2) {
    instruction.textContent =
      "🥈 Amazing! Here comes our Second Rank Champion!";
  }

  if (rank === 1) {
    instruction.textContent =
      "🏆 THE WINNER! Congratulations to our First Rank Champion!";
  }

  currentReveal++;

  if (currentReveal < 3) {
    const nextRank = revealOrder[currentReveal];

    revealBtn.textContent =
      `REVEAL ${nextRank}${getSuffix(nextRank)} RANK ✨`;
  } else {
    revealBtn.textContent = "🏆 ALL CHAMPIONS REVEALED!";
    revealBtn.disabled = true;
  }
}

// ======================================
// RANK SUFFIX
// ======================================

function getSuffix(rank) {
  if (rank === 1) return "ST";
  if (rank === 2) return "ND";
  return "RD";
}

// ======================================
// RESET PRESENTATION
// ======================================

function resetPresentation() {
  currentReveal = 0;

  [1, 2, 3].forEach(rank => {
    const card = document.getElementById(`rank${rank}`);

    card.classList.add("hidden");
    card.classList.remove("show");
  });

  instruction.textContent =
    "Are you ready to celebrate our champions?";

  revealBtn.disabled = false;
  revealBtn.textContent = "REVEAL 3RD RANK ✨";

  const container = document.getElementById("confetti");
  container.replaceChildren();
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

resetBtn.addEventListener("click", () => {
  resetPresentation();
  loadClass();
});

// CLASS CHANGE EVENT
classSelect.addEventListener("change", loadClass);

// ======================================
// START WEBSITE
// ======================================

loadClass();
