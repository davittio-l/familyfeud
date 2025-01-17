const questions = [
  {
    question: "What desserts do kids like.",
    answers: ["Cake", "Ice Cream", "Candy", "Cookies", "Pie", "Pudding", "Popsicle"],
  },
  {
    question: "Name something parents tell their children not to touch.",
    answers: ["Stove", "Outlet", "Fire", "Knife", "Other Children"],
  },
  {
    question: "Name a day you get up early.",
    answers: ["Christmas", "Saturday", "First day of school", "Sunday", "School day", "Birthday"],
  },
  {
    question: "Name something you only do when you're sick.",
    answers: ["Take medicine", "Stay home", "Throw up", "Go to the doctor", "Nap", "Eat soup"],
  },
  {
    question: "Name something you do right before bed.",
    answers: ["Brush teeth", "Watch TV", "Read", "Homework", "Eat", "Drink water", "Say prayers"],
  },
  {
    question: "Name something Calvin loves to play with.",
    answers: ["Mixer", "Blender", "Outlets", "Crock Pot", "Cars", "Blocks"],
  },
];

let currentQuestionIndex = 0;
let revealedAnswers = [];
let strikes = 0;
let teams = [];
let scores = [];
let currentTeamIndex = 0;

// Hide game screen initially
document.getElementById("game-screen").classList.add("hidden");
document.getElementById("choose-first-team").classList.add("hidden");

// Add team name functionality
document.getElementById("add-team-btn").addEventListener("click", () => {
  const teamNameInput = document.getElementById("team-name-input");
  const teamName = teamNameInput.value.trim();
  if (teamName) {
    teams.push(teamName);
    scores.push(0); // Initialize the score
    updateTeamList();
    teamNameInput.value = "";

    if (teams.length >= 2) {
      populateFirstTeamDropdown();
      document.getElementById("choose-first-team").classList.remove("hidden");
    }
  } else {
    alert("Please enter a valid team name.");
  }
});

// Populate dropdown for choosing the first team
function populateFirstTeamDropdown() {
  const firstTeamSelect = document.getElementById("first-team-select");
  firstTeamSelect.innerHTML = ""; // Clear existing options
  teams.forEach((team, index) => {
    const option = document.createElement("option");
    option.value = index; // Store team index
    option.textContent = team;
    firstTeamSelect.appendChild(option);
  });
}

// Confirm first team and start the game
document.getElementById("confirm-first-team-btn").addEventListener("click", () => {
  const selectedIndex = parseInt(document.getElementById("first-team-select").value);
  currentTeamIndex = selectedIndex;
  document.getElementById("choose-first-team").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  loadQuestion();
  updateTeamList();
  alert(`It's ${teams[currentTeamIndex]}'s turn!`);
});

// Update the team list and scores
function updateTeamList() {
  const teamList = document.getElementById("team-list");
  teamList.innerHTML = "";
  teams.forEach((team, index) => {
    const li = document.createElement("li");
    li.textContent = `${team}: ${scores[index]} points`;
    teamList.appendChild(li);
  });
}

// Load a question
function loadQuestion() {
  currentQuestion = questions[currentQuestionIndex];
  revealedAnswers = [];
  strikes = 0;
  document.getElementById("question").textContent = currentQuestion.question;
  displayAnswers();
  displayStrikes();
}

// Submit answer
document.getElementById("submit-btn").addEventListener("click", () => {
  const input = document.getElementById("answer-input").value.trim().toLowerCase();
  const lowerCaseAnswers = currentQuestion.answers.map((answer) => answer.toLowerCase());

  if (lowerCaseAnswers.includes(input)) {
    const originalAnswer = currentQuestion.answers[lowerCaseAnswers.indexOf(input)];
    if (!revealedAnswers.includes(originalAnswer)) {
      revealedAnswers.push(originalAnswer);
      displayAnswers();

      // Check if all answers are revealed
      if (revealedAnswers.length === currentQuestion.answers.length) {
        // Add points to the team currently answering
        scores[currentTeamIndex] += 100;
        updateTeamList(); // Update scores in the sidebar
        document.getElementById("next-btn").classList.remove("hidden"); // Show Next button
        alert(`${teams[currentTeamIndex]} answered correctly and gets 100 points!`);
      }
    }
  } else {
    strikes++;
    displayStrikes();

    if (strikes === 3) {
      alert(`${teams[currentTeamIndex]} has struck out!`);
      
      // Switch to the next team
      currentTeamIndex = (currentTeamIndex + 1) % teams.length;
      alert(`It's now ${teams[currentTeamIndex]}'s turn!`);
      
      strikes = 0; // Reset strikes for the next team
      displayStrikes(); // Update strike display
    }
  }

  document.getElementById("answer-input").value = "";
});

// Handle "Next Question" and turn switching
document.getElementById("next-btn").addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    currentTeamIndex = (currentTeamIndex + 1) % teams.length; // Switch to the next team
    alert(`It's ${teams[currentTeamIndex]}'s turn!`);
    loadQuestion();
    document.getElementById("next-btn").classList.add("hidden");
  } else {
    alert("Game Over! Thanks for playing!");
    resetGame();
  }
});

// Display answers
function displayAnswers() {
  const grid = document.getElementById("answers-grid");
  grid.innerHTML = "";
  currentQuestion.answers.forEach((answer) => {
    const div = document.createElement("div");
    div.textContent = revealedAnswers.includes(answer) ? answer : "___";
    div.className = "border p-2 text-center";
    grid.appendChild(div);
  });
}

// Display strikes
function displayStrikes() {
  document.getElementById("strikes").textContent = "Strikes: " + "X".repeat(strikes);
}

// Reset game
document.getElementById("reset-btn").addEventListener("click", resetGame);

function resetGame() {
  currentQuestionIndex = 0;
  currentTeamIndex = 0;
  scores = teams.map(() => 0);
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("team-input-screen").classList.remove("hidden");
  updateTeamList();
}
