const API_URL = "https://api.trivia.willfry.co.uk/questions?limit=20";

let randomOrderedPuzzle, puzzle, question, correctAnswer, incorrectAnswers, answerOptions;
let points, allPuzzle = 0;
let statusOfAnswers;

//TODO CALL function-----------------------------------------
renderMainMenu();
addEventListenerToMainButton()



function fetchAPI(API) {
  fetch(API)
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

        getPuzzle(question, answerOptions);
         

    }).catch( warning => console.log(warning) );
}

/**
 * *-----------------------------------------------------------------------------------------------
 * *list of my useful function
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

// get new puzzle 
function getPuzzle(question, answerOptions) {
    statusOfAnswers = true;   
    renderPuzzle(question, answerOptions);
    addEventListenerToAnswersOptions(); 
}

// evaluation of the result
function evaluationOfResult(guested){
    //remove counter-slide
    document.querySelector('.js-couter').classList.remove('counter-slide-animation');
    allPuzzle += 1;
    if (guested === correctAnswer) {
        points += 1;
    }
    if (!guested) {
        renderResult(correctAnswer, guested);
        renderPoints(points, allPuzzle);    
    } else {
        setTimeout(() => {
            renderResult(correctAnswer, guested);
            renderPoints(points, allPuzzle);
        }, 2000);
    }

//TODO----------------------------------------- 
    if (allPuzzle == 15) {
        setTimeout(() => {
            renderMainMenu();
            addEventListenerToMainButton();
        }, 4000);
        
    } else {
        setTimeout(() => {
            fetchAPI(API_URL);
        }, 3500);
    }
    

}



/**
 * *-----------------------------------------------------------------------------------------------
 * *render functions
 */


//TODO------------------------------------------------------------------------------------
//render main menu section
function renderMainMenu() {
    let menu = ` 
        <div class="menu-container">
            <button class="new-game-button js-button">New Game</button>
        </div>
    `;
    document.querySelector(".container").innerHTML = menu;
}


//render puzzle
function renderPuzzle(question, arrOfAnswers) {
        // start counter 
        
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
}



//render answers
function renderResult(correctAnswer, guested) {
        const orderedOfCorrectAnswer = answerOptions.findIndex(
            (element) => element === correctAnswer
        );
    
        if (guested === false) {
            document
            .querySelector(`.js-answers-${orderedOfCorrectAnswer}`)
            .classList.add("correctAnswer");
        } else {
            const orderedOfGuestedAnswer = answerOptions.findIndex(
                (element) => element === guested
            );
            if (orderedOfCorrectAnswer === orderedOfGuestedAnswer) {
                document
                .querySelector(`.js-answers-${orderedOfCorrectAnswer}`)
                .classList.add("correctAnswer");
            } else {
                document
                .querySelector(`.js-answers-${orderedOfCorrectAnswer}`)
                .classList.add("correctAnswer");

                document
                .querySelector(`.js-answers-${orderedOfGuestedAnswer}`)
                .classList.add("wrongAnswer");
            }

        }        
   
}


//render points
function renderPoints(points, allPuzzle) {
    document.querySelector(".js-points").innerHTML = `${points} / ${allPuzzle}`;
}



/**
 * *-----------------------------------------------------------------------------------------------
 * *add event listeners
 */


// after onsumbit action in new game button - eventlistener
function addEventListenerToMainButton() {
    document.querySelector(".js-button").addEventListener("click", () => {
        points = 0;
        allPuzzle = 0;
        renderPoints(points, allPuzzle);
        fetchAPI(API_URL);
    });
}


// after onsumbit action in new question button - eventlistener
function addEventListenerToAnswersOptions() {
    const boxes = document.querySelectorAll(".js-answers");
    
    // start-counter
    var seconds = 20;
     
    document.querySelector('.js-couter').classList.add('counter-slide-animation');
    const countDown = setInterval( () => {
            if (!statusOfAnswers) {
                clearInterval(countDown);
            }  
            if ( seconds === 0) {
                statusOfAnswers = false;
            };
            if (seconds === 0 && !statusOfAnswers) {
                evaluationOfResult(false);
            }

            seconds--;
        }, 1000
    );


    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", (event) => {
            if (statusOfAnswers) {
                event.target.classList.add("markedAnswer");
                statusOfAnswers = false;
                clearInterval(countDown);
                evaluationOfResult(event.target.innerHTML);
                };
        });
    }
}

