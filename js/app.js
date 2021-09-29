const API_URL = "https://api.trivia.willfry.co.uk/questions?limit=20";

let randomNumberForPuzzle = Math.floor(Math.random() * 20);
let points = 0;
let allPuzzle = 0;
let puzzle;
let question;
let correctAnswer;
let incorrectAnswers;
let answerOptions;

function fetchAPI() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((puzzles) => {
      puzzle = puzzles[randomNumberForPuzzle];

      // question of puzzle
      question = puzzle.question;

      // correct answer of puzzle
      correctAnswer = puzzle.correctAnswer;

      // incorrect answers of puzzle
      puzzle.incorrectAnswers.length === 3
        ? (incorrectAnswers = puzzle.incorrectAnswers)
        : (incorrectAnswers = randomOrderedLengthArr(
            puzzle.incorrectAnswers,
            3
          ));

      // answerOptions
      answerOptions = randomOrderedLengthArr(
        [...incorrectAnswers, correctAnswer],
        4
      );

      renderPuzzle(question, answerOptions);
    });
}

/**
 *  list of my useful function
 *
 */

function randomOrderedLengthArr(arr, num) {
  let result = [];
  if (arr.length < num) {
    return arr;
  }

  for (let i = 0; i < num; i++) {
    result.push(...arr.splice([Math.floor(Math.random() * arr.length)], 1));
  }

  return result;
}

/**
 * render functions
 *
 */

//render puzzle
function renderPuzzle(question, arrOfAnswers) {
  let puzzle = `
  <div class="question js-question">
        ${question}
      </div>
      <div class="options js-options">
        <div class="answers js-answers js-answers-0">${arrOfAnswers[0]}</div>
        <div class="answers js-answers js-answers-1">${arrOfAnswers[1]}</div>
        <div class="answers js-answers js-answers-2">${arrOfAnswers[2]}</div>
        <div class="answers js-answers js-answers-3">${arrOfAnswers[3]}</div>
      </div>
  `;

  document.querySelector(".container").innerHTML = puzzle;

  const boxes = document.querySelectorAll(".js-answers");
  let statusOfAnswers = true;

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", (event) => {
      if (statusOfAnswers) {
        event.target.classList.add("markedAnswer");
        statusOfAnswers = false;
        allPuzzle += 1;
        setTimeout(() => {
          renderResult(correctAnswer);
          renderPoints(points, allPuzzle);
        }, 2000);

        event.target.innerHTML === correctAnswer
          ? (points += 1)
          : setTimeout(() => event.target.classList.add("wrongAnswer"), 2000);

        // Call new question

        setTimeout(() => {
          fetchAPI();
        }, 4000);
      }
    });
  }
}

//this function will render out the correct answer
function renderResult(correctAnswer) {
  const numberOfArr = answerOptions.findIndex(
    (element) => element === correctAnswer
  );
  document
    .querySelector(`.js-answers-${numberOfArr}`)
    .classList.add("correctAnswer");
}

function renderPoints(points, allPuzzle) {
  document.querySelector(".js-points").innerHTML = `${points} / ${allPuzzle}`;
}

// after onsumbit action in new question button - eventlistener
document.querySelector(".js-button").addEventListener("click", () => {
  points = 0;
  allPuzzle = 0;
  renderPoints(points, allPuzzle);
  fetchAPI();
});
