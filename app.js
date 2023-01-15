class Question {
    constructor(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
}

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.currentQuestionIndex = 0;
    }

    checkAnswer(selectedAnswer) {
        if(this.currentQuestionIndex < this.questions.length){
            if (this.questions[this.currentQuestionIndex].correctAnswer === selectedAnswer) {
                this.score++;
            }
        }
    }
}

const questions = [
    new Question("What is the capital of France?", { a: "Paris", b: "London", c: "Rome" }, "a"),
    new Question("What is the largest planet in our solar system?", { a: "Earth", b: "Jupiter", c: "Saturn" }, "b"),
    new Question("What is the most populous country in the world?", { a: "China", b: "India", c: "United States" }, "a"),
    new Question("What is the capital of Italy?", { a: "Paris", b: "London", c: "Rome" }, "c"),
    new Question("What is the smallest planet in our solar system?", { a: "Mercury", b: "Jupiter", c: "Saturn" }, "a"),
    new Question("What is the second most populous country in the world?", { a: "China", b: "India", c: "United States" }, "b")
];
const quiz = new Quiz(questions);

const questionContainer = document.querySelector("#question-container");
const score = document.querySelector("#score");

// Display the first question
displayQuestion();

function displayQuestion() {
    if (quiz.currentQuestionIndex === quiz.questions.length) {
        questionContainer.innerHTML = `<h3>Game Over!</h3>`;
        score.textContent = `You got ${quiz.score} out of ${quiz.questions.length} questions correct!`;
        const playAgainBtn = document.createElement("button");
        playAgainBtn.classList.add("btn", "btn-primary", "mr-2");
        playAgainBtn.id = "play-again";
        playAgainBtn.innerHTML = "Play Again";
        questionContainer.appendChild(playAgainBtn);
        playAgainBtn.addEventListener("click", () => {
            quiz.score = 0;
            quiz.currentQuestionIndex = 0;
            questionContainer.innerHTML = "";
            displayQuestion();
        });
        return;
    }

    if (quiz.currentQuestionIndex >= quiz.questions.length) {
        return;
    }
    questionContainer.innerHTML = "";
    const currentQuestion = quiz.questions[quiz.currentQuestionIndex];
    questionContainer.innerHTML = `<h3>${currentQuestion.question}</h3>`;
    for (const key in currentQuestion.answers) {
        questionContainer.innerHTML += `
            <button type="button" class="btn btn-primary mr-2" id="answer-${key}" value="${key}">
                ${currentQuestion.answers[key]}
            </button>
        `;
    }

    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            quiz.checkAnswer(e.target.value);
            quiz.currentQuestionIndex++;
            displayQuestion();
        });
    });
}

