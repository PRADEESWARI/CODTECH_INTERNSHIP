function signup() {
  const user = document.getElementById("signup-username").value;
  const pass = document.getElementById("signup-password").value;
  localStorage.setItem(user, pass);
  alert("Signed up successfully!");
  location.href = 'login.html';
}

function login() {
  const user = document.getElementById("login-username").value;
  const pass = document.getElementById("login-password").value;
  const stored = localStorage.getItem(user);
  if (stored === pass) {
    localStorage.setItem("currentUser", user);
    location.href = 'index.html';
  } else {
    alert("Invalid credentials!");
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  location.href = 'login.html';
}

function saveScore(score) {
  const user = localStorage.getItem("currentUser");
  let scores = JSON.parse(localStorage.getItem("scores") || "{}");
  scores[user] = score;
  localStorage.setItem("scores", JSON.stringify(scores));
}

window.onload = () => {
  if (location.pathname.endsWith("scoreboard.html")) {
    const tbody = document.querySelector("#scoreboard tbody");
    const scores = JSON.parse(localStorage.getItem("scores") || "{}");
    Object.keys(scores).forEach(user => {
      const row = `<tr><td>${user}</td><td>${scores[user]}</td></tr>`;
      tbody.innerHTML += row;
    });
  }
};
