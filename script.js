const questions = [
    {
      question: "What desserts do kids like.",
      answers: ["Cake", "Ice Cream", "Candy", "Cookies", "Pie", "Pudding", "Popsicle"],
    },
    {
      question: "Name something parents tell their children not to touch.",
      answers: ["Stove", "outlet", "Fire", "Knife", "Other Children"],
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
        question: "Name something that goes in sandwiches.",
        answers: ["Peanut butter and jelly", "Meat", "Mustard", "Lettuce", "Mayonnaise", "Bread", "Butter"],
      },
      {
        question: "Name something that usually comes in pairs.",
        answers: ["Shoes", "Socks", "Twins", "Pants", "Scissors", "Eyes", "Dice"],
      },
      {
        question: "Name something Calvin loves to play with.",
        answers: ["Mixer", "Blender", "Outlets", "Crock Pot", "Cars", "blocks"],
      },
      {
        question: "What does Calvin like to eat most?",
        answers: ["cheese stick", "blueberries", "strawberries", "cookies", "crackers", "apple sauce"]
      },
  ];

let currentQuestionIndex = 0; 
let currentQuestion = questions[currentQuestionIndex];
let revealedAnswers = [];
let strikes = 0;
let teams = [];
let scores = [];
let currentTeamIndex = 0;

// Hide game screen initially
document.getElementById("game-screen").classList.add("hidden");

// Add team name functionality
document.getElementById("add-team-btn").addEventListener("click", () => {
  const teamNameInput = document.getElementById("team-name-input");
  const teamName = teamNameInput.value.trim();
  if (teamName) {
    teams.push(teamName); // Add team name to the array
    scores.push(0); // Initialize the team's score to 0
    updateTeamList(); // Update the team list display
    teamNameInput.value = ""; // Clear the input field
  } else {
    alert("Please enter a valid team name.");
  }
});

// Start the game
document.getElementById("start-game-btn").addEventListener("click", () => {
  if (teams.length === 0) {
    alert("Please add at least one team before starting the game.");
    return;
  }
  document.getElementById("team-input-screen").classList.add("hidden"); // Hide the team input screen
  document.getElementById("game-screen").classList.remove("hidden"); // Show the game screen
  loadQuestion(); // Load the first question
  updateTeamList(); // Display teams and scores
});

// Update the team list display
function updateTeamList() {
  const teamList = document.getElementById("team-list");
  teamList.innerHTML = ""; // Clear the list
  teams.forEach((team, index) => {
    const li = document.createElement("li");
    li.textContent = `${team}: ${scores[index]} points`; // Show team name and score
    teamList.appendChild(li);
  });
}
//-------------------------------------------

//Main Game Logic
document.getElementById("question").textContent = currentQuestion.question;

//Submit Answer
document.getElementById("submit-btn").addEventListener("click", () => {
  const input = document.getElementById("answer-input").value.trim().toLowerCase();
  const lowerCaseAnswers = currentQuestion.answers.map((answer) =>
    answer.toLowerCase()
  );

  if (lowerCaseAnswers.includes(input)) {
    const originalAnswer = currentQuestion.answers[lowerCaseAnswers.indexOf(input)];
    if (!revealedAnswers.includes(originalAnswer)) {
      revealedAnswers.push(originalAnswer);
      displayAnswers();

      // Check if all answers are revealed
      if (revealedAnswers.length === currentQuestion.answers.length) {
        scores[currentTeamIndex] += 100; // Award 100 points to the current team
        updateTeamList(); // Update scores in the sidebar
        document.getElementById("next-btn").classList.remove("hidden"); // Show Next button
      }
    }
  } else {
    strikes++;
    displayStrikes();
    if (strikes === 3) {
      alert("Game Over!");
      document.getElementById("next-btn").classList.remove("hidden"); // Show Next button even on game over
    }
  }
  document.getElementById("answer-input").value = "";
});

// Move to the next question and switch teams
document.getElementById("next-btn").addEventListener("click", () => {
  loadNextQuestion();
  currentTeamIndex = (currentTeamIndex + 1) % teams.length; // Switch to the next team
  alert(`It's ${teams[currentTeamIndex]}'s turn!`); // Notify which team's turn it is
});

function loadNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    currentQuestion = questions[currentQuestionIndex];
    revealedAnswers = [];
    strikes = 0;

    loadQuestion();
    displayAnswers();
    displayStrikes();

    // Hide "Next Question" button
    document.getElementById("next-btn").classList.add("hidden");
  } else {
    // End Game
    alert("You’ve completed all the questions!");
    resetGame();
  }
}

function loadQuestion() {
  document.getElementById("question").textContent = currentQuestion.question;
}

document.getElementById("reset-btn").addEventListener("click", resetGame);

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

function displayStrikes() {
  document.getElementById("strikes").textContent = "Strikes: " + "X".repeat(strikes);
}

function resetGame() {
  currentQuestionIndex = 0; // Reset the question index
  currentQuestion = questions[currentQuestionIndex]; // Reset to the first question
  revealedAnswers = [];
  strikes = 0;
  scores = teams.map(() => 0); // Reset all scores to 0
  loadQuestion();
  displayAnswers();
  displayStrikes();
  updateTeamList();
  document.getElementById("next-btn").classList.add("hidden"); // Hide the Next button
}