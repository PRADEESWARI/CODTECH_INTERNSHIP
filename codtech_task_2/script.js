const chatBox = document.getElementById("chatBox");
const historyBox = document.getElementById("historyBox");
const userInput = document.getElementById("userInput");

const botReplies = [
  "Hi there! How can I assist you today?",
  "HTML provides the structure of a webpage, defining elements like headings, paragraphs, and links.",
  "XSS is a security vulnerability where attackers inject malicious scripts into web pages.These scripts run in users’ browsers and can steal data or perform unauthorized actions.",
  "HTTPS is the secure version of HTTP that encrypts data between the browser and server.It protects user information from being intercepted by attackers.",
  "The main phases are reconnaissance, scanning, exploitation, post-exploitation, and reporting.Each step helps in thoroughly testing and documenting system security.",
  "Social engineering tricks people into giving up sensitive info (like passwords) through manipulation.It targets human error rather than system flaws."
];

let replyIndex = 0;

// Load history on page load
window.onload = () => {
  const stored = JSON.parse(localStorage.getItem("chatHistory")) || [];
  stored.forEach(msg => {
    const div = document.createElement("div");
    div.className = "history-msg";
    div.textContent = msg;
    historyBox.appendChild(div);
  });
};

function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  // Show user message
  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.textContent = msg;
  chatBox.appendChild(userDiv);

  // Save to history
  saveToHistory(msg);

  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Show "Thinking..." first
  const thinkingDiv = document.createElement("div");
  thinkingDiv.className = "message bot thinking";
  thinkingDiv.textContent = "Thinking...";
  chatBox.appendChild(thinkingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Replace with actual bot reply after 2 seconds
  setTimeout(() => {
    thinkingDiv.textContent = botReplies[replyIndex % botReplies.length];
    replyIndex++;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 2000);
}

function saveToHistory(msg) {
  const div = document.createElement("div");
  div.className = "history-msg";
  div.textContent = msg;
  historyBox.appendChild(div);

  const stored = JSON.parse(localStorage.getItem("chatHistory")) || [];
  stored.push(msg);
  localStorage.setItem("chatHistory", JSON.stringify(stored));
}

// Clear chat messages
document.getElementById("clearChatBtn").addEventListener("click", () => {
  chatBox.innerHTML = "";
});

// Clear history messages
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  localStorage.removeItem("chatHistory");
  historyBox.innerHTML = "";
});
