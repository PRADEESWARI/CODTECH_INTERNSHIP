let player;
let lastTime = 0;
let isCompleted = false;

// === YouTube API for course.html ===
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "340",
    width: "600",
    videoId: "qEwnlMBaLfc", // Change to your own video ID if needed
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  setInterval(checkProgress, 1000);
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED && !isCompleted) {
    isCompleted = true;
    localStorage.setItem("webdevProgress", "completed");
    document.getElementById("status").innerText = "✅ Course Completed!";
  }
}

function checkProgress() {
  if (!player || typeof player.getCurrentTime !== "function") return;

  const currentTime = player.getCurrentTime();

  if (currentTime - lastTime > 3) {
    player.pauseVideo();
    alert("⛔ Skipping is not allowed. Please watch the video continuously.");
    player.seekTo(lastTime, true);
    return;
  }

  lastTime = currentTime;
}

// === Shared logic for certificate.html and progress.html ===
window.onload = function () {
  const progress = localStorage.getItem("webdevProgress");

  // === Certificate Page ===
  const certStatus = document.getElementById("cert-status");
  const certImage = document.getElementById("certificate-img");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.getElementById("modal-close");

  if (certStatus) {
    if (progress === "completed") {
      certStatus.textContent = "✅ Eligible for Certificate";
      certImage.style.display = "block";

      // Image click to open modal
      certImage.onclick = function () {
        modal.style.display = "block";
        modalImg.src = certImage.src;
      };

      closeBtn.onclick = function () {
        modal.style.display = "none";
      };

      modal.onclick = function (e) {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      };
    } else {
      certStatus.textContent = "⏳ Not Yet Eligible";
      certStatus.classList.add("not-eligible");
      certImage.style.display = "none";
    }
  }

  // === Progress Page (progress.html) ===
  function animateProgress(circleId, textId, percent) {
    const circle = document.getElementById(circleId);
    const text = document.getElementById(textId);
    let current = 0;
    const interval = setInterval(() => {
      if (current >= percent) {
        clearInterval(interval);
      } else {
        current++;
        const deg = (current / 100) * 360;
        circle.style.setProperty("--percent", `${deg}deg`);
        text.innerText = `${current}%`;
      }
    }, 10); // Animation speed
  }

  // Get WebDev Progress
  const webdevProgress = progress === "completed" ? 100 : 0;
  const pythonProgress = 0; // You can later track Python progress too

  // Animate Circles
  if (document.getElementById("webdev-progress")) {
    animateProgress("webdev-progress", "webdev-text", webdevProgress);
    animateProgress("python-progress", "python-text", pythonProgress);
  }

  // === Progress status text (optional legacy element) ===
  const progressStatus = document.getElementById("progress-status");
  if (progressStatus) {
    progressStatus.textContent =
      progress === "completed"
        ? "✅ Web Development Course Completed"
        : "❌ Not Completed";
  }
};
