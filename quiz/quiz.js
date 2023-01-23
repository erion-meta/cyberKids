let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 16;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question:
      "Nëse kemi një faqe në një rrjet social, duhet ti bëjmë publike të dhënat personale?",
    options: ["Po", "Jo"],
    correct: "Jo",
  },
  {
    id: "1",
    question:
      "Nëse në rrjete sociale kemi persona që nuk duam të bisedojmë, si duhet të veprojmë?",
    options: ["Ta bllokojmë menjëherë", "Nuk duhet ta bllokojmë"],
    correct: "Ta bllokojmë menjëherë",
  },
  {
    id: "2",
    question: "Nëse dikush na ngacmon dhe ofendon në internet, ne duhet të: ",
    options: ["Flasim menjëherë me prindërit", "Mos t'i tregojmë askujt"],
    correct: "Flasim menjëherë me prindërit",
  },
  {
    id: "3",
    question: "Nëse një i panjohur na kërkon ti dërgojmë foto, ne duhet ?",
    options: ["T'ia dërgojmë fotot ", "Të mos ja dërgojmë dhe ti bëjmë bllok"],
    correct: "Të mos ja dërgojmë dhe ti bëjmë bllok",
    //
  },
  {
    id: "4",
    question:
      "Cfarë duhet të bëjmë nëse një faqe interneti nuk është e përshtatshme për moshën tonë?",
    options: [
      "Ta hapim atë faqen pa hezituar aspak",
      "Të mos e hapim në asnjë mënyrë",
    ],
    correct: "Të mos e hapim në asnjë mënyrë",
  },
  {
    id: "5",
    question: "Të dhënat tona private nuk ka problem nëse i bëjmë publike",
    options: ["E Gabuar", "E Sakte"],
    correct: "E Gabuar",
  },
  {
    id: "6",
    question:
      "Një i panjohur na ka derguar mesazh në instagram per tu takuar, duhet ta takojmë? ",
    options: [
      "Nuk ka asnjë problem nëse e takojmë",
      "Nuk duhet të takojmë kurrë një të panjohur",
    ],
    correct: "Nuk duhet të takojmë kurrë një të panjohur",
  },
  {
    id: "7",
    question:
      "Në inbox ka ardhur një email që na kerkon të venndosim të dhënat tona, si duhet të veprojmë?",
    options: ["Ta injorojmë email-in", "Mund ti vendosim të dhenat pa problem"],
    correct: "Ta injorojmë email-in",
  },
  {
    id: "8",
    question: "Në telefon na ka ardhur një foto tallëse për një shokun tonë.",
    options: [
      "Foton duhet ta shpërndajmë dhe tek të tjerët",
      "Ta fshijmë menjëherë dhe të vendosim në dijeni shokun që ishte në foto",
    ],
    correct:
      "Ta fshijmë menjëherë dhe të vendosim në dijeni shokun që ishte në foto",
  },
  {
    id: "9",
    question:
      "Videot apo filmat që përmbajnë dhune janë interesante për tu shikuar",
    options: ["E Gabuar", "E Sakte"],
    correct: "E Gabuar",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Pikët tuaja janë " + scoreCount + " nga " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " nga " + quizArray.length + " Pyetjet";
      //display quiz
      quizDisplay(questionCount);
      count = 16;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " nga " + quizArray.length + " Pyetjet";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 16;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
