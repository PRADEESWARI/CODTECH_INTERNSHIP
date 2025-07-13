let currentQuestion = 0;
let score = 0;
let timer = 60; // 3 minutes

const timeDisplay = document.getElementById("time");
const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options-box");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionBox.innerText = `Q${currentQuestion + 1}: ${q.question}`;
  optionsBox.innerHTML = "";

  q.options.forEach(option => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
    optionsBox.appendChild(label);
  });
}

function startTimer() {
  const interval = setInterval(() => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    timeDisplay.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    timer--;

    if (timer < 0 || currentQuestion >= questions.length) {
      clearInterval(interval);
      //alert(`Time's up! Your score: ${score}/${questions.length}`);
      localStorage.setItem("lastScore", score);
      window.location.href = "scoreboard.html";
    }
  }, 1000);
}

submitBtn.onclick = () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an option.");
    return;
  }

  const answer = selected.value;
  if (answer === questions[currentQuestion].answer) {
    score++;
  }

  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");

  // Show correct answer (optional)
  [...document.querySelectorAll("input[name='option']")].forEach(input => {
    input.disabled = true;
    if (input.value === questions[currentQuestion].answer) {
      input.parentElement.style.background = "#c8e6c9";
    } else if (input.checked) {
      input.parentElement.style.background = "#ffcdd2";
    }
  });
};

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  } else {
    //alert(`Quiz complete! Your score: ${score}/${questions.length}`);
    localStorage.setItem("lastScore", score);
    window.location.href = "scoreboard.html";
  }
};

window.onload = () => {
  loadQuestion();
  startTimer();
};
