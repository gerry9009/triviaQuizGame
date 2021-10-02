const API_URL = "https://api.trivia.willfry.co.uk/questions?limit=20";

let randomOrderedPuzzle;
let points = 0;
let allPuzzle = 0;
let puzzle;
let question;
let correctAnswer;
let incorrectAnswers;
let answerOptions;
let statusOfAnswers = true;


function fetchAPI() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((puzzles) => {
        randomOrderedPuzzle = Math.floor(Math.random() * 20);

        puzzle = puzzles[randomOrderedPuzzle];

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
    }).catch( warning => console.log(warning) );
}

/**
 * -----------------------------------------------------------------------------------------------
 * list of my useful function
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


function counterStart(seconds) {
    
    document.querySelector('.js-couter').classList.add('counter-slidein');
    // timer finished
    const countDown = setInterval( () => {
        if ( seconds === 0) {
            statusOfAnswers = false;
            allPuzzle += 1;
            renderResult(correctAnswer);
            renderPoints(points, allPuzzle);
        };
        if (statusOfAnswers === false) {clearInterval(countDown)};
        console.log(seconds);
        seconds--
    }, 1000);
    countDown;
    console.log(statusOfAnswers);
}

/**
 * -----------------------------------------------------------------------------------------------
 * render functions
 */


//render puzzle
function renderPuzzle(question, arrOfAnswers) {
    // start counter 
    statusOfAnswers = true;
    counterStart(20);

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

    addEventListenerToAnswersOptions(); 
}



//render the correct answer
function renderResult(correctAnswer) {
    const numberOfArr = answerOptions.findIndex(
        (element) => element === correctAnswer
    );
    document
        .querySelector(`.js-answers-${numberOfArr}`)
        .classList.add("correctAnswer");
         
    //remove counter 
    document.querySelector('.js-couter').classList.remove('counter-slidein');

    // fetch new puzzle
    setTimeout(() => {
        fetchAPI();
        }, 3500);
}


//render points
function renderPoints(points, allPuzzle) {
    document.querySelector(".js-points").innerHTML = `${points} / ${allPuzzle}`;
}

/**
 * -----------------------------------------------------------------------------------------------
 *  add event listeners
 */


// after onsumbit action in new question button - eventlistener
document.querySelector(".js-button").addEventListener("click", () => {
    points = 0;
    allPuzzle = 0;
    renderPoints(points, allPuzzle);
    fetchAPI();
});


// after onsumbit action in new question button - eventlistener
function addEventListenerToAnswersOptions() {
    const boxes = document.querySelectorAll(".js-answers");
    

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", (event) => {
        if (statusOfAnswers) {
            event.target.classList.add("markedAnswer");
            statusOfAnswers = false;
            allPuzzle += 1;
            

            event.target.innerHTML === correctAnswer
            ? (points += 1)
            : setTimeout(() => event.target.classList.add("wrongAnswer"), 2000);
            
            setTimeout(() => {
                renderResult(correctAnswer);
                renderPoints(points, allPuzzle);
            }, 2000);
            // Call new question

        }
        });
    }
}
