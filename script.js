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
        answers: ["Shoes", "Socks", "Twins", "Pants", "Scissors", "Eyes", "Dice"]
      },
  ];

let currentQuestionIndex = 0; // Tracks the current question index
let currentQuestion = questions[currentQuestionIndex];
let revealedAnswers = [];
let strikes = 0;

document.getElementById("question").textContent = currentQuestion.question;

document.getElementById("submit-btn").addEventListener("click", () => {
  const input = document.getElementById("answer-input").value.trim().toLowerCase();
  const lowerCaseAnswers = currentQuestion.answers.map(answer => answer.toLowerCase());

  if (lowerCaseAnswers.includes(input)) {
    const originalAnswer = currentQuestion.answers[lowerCaseAnswers.indexOf(input)];
    if (!revealedAnswers.includes(originalAnswer)) {
      revealedAnswers.push(originalAnswer);
      displayAnswers();

      // Check if all answers are revealed
      if (revealedAnswers.length === currentQuestion.answers.length) {
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

document.getElementById("next-btn").addEventListener("click", loadNextQuestion);

function loadNextQuestion() {
  // Increment the current question index
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    // Load the next question
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
  loadQuestion();
  displayAnswers();
  displayStrikes();
  document.getElementById("next-btn").classList.add("hidden"); // Hide the Next button
}
