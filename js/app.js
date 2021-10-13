let API_URL;
let playedTheme;

let correctAnswer, incorrectAnswers, answerOptions, statusOfAnswers, numberOfCorrectAnswer, numberOfguessedAnswer;
let points, allPuzzle = 0;
let maximumGame = 10;

let themes = {
    Food : {
        id : "food_and_drink",
        name: "Food",
        points: 0
    },
    Geography : {
        id : "geography",
        name : "Geography",
        points: 0
    },  
    General : {
        id : "general_knowledge",
        name : "General Knowledge",
        points: 0
    },
    History : {
        id : "history",
        name : "History",
        points: 0
    },
    Art : {
        id : "literature",
        name : "Art and Literature",
        points: 0
    },
    Movies : {
        id : "movies",
        name : "Movies",
        points: 0
    },
    Music : {
        id : "music",
        name : "Music",
        points: 0
    },
    Science : {
        id : "science",
        name : "Science",
        points: 0
    },
    Society : {
        id : "society_and_culture",
        name : "Society and Culture",
        points: 0
    },
    Sport : {
        id : "sport_and_leisure",
        name : "Sport and Leisure",
        points: 0
    }
};
    

/**
 * *-----------------------------------------------------------------------------------------------
 * *fetch function
 */

function fetchAPI(API) {
  fetch(API)
    .then((response) => response.json())
    .then((puzzles) => {
        let randomOrderedPuzzle = Math.floor(Math.random() * 20);
        
        let puzzle = puzzles[randomOrderedPuzzle];

        // question of puzzle
        let question = puzzle.question;

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

function evaluationOfResult(guessed) {
    //remove counter-slide
    document.querySelector('.js-couter').classList.remove('counter-slide-animation');
    
    numberOfCorrectAnswer = answerOptions.findIndex(
        (element) => element === correctAnswer
    );
    guessed === false ? 
    numberOfguessedAnswer = guessed :
    numberOfguessedAnswer = parseInt(guessed);

    allPuzzle += 1;

    if (numberOfCorrectAnswer === numberOfguessedAnswer) {
        points += 1;
    };

    if (guessed === false) {
        renderResult(numberOfCorrectAnswer, numberOfguessedAnswer);
        renderPoints(points, allPuzzle);    
    } else {
        setTimeout(() => {
            renderResult(numberOfCorrectAnswer, numberOfguessedAnswer);
            renderPoints(points, allPuzzle);
        }, 2000);
    }

    if (allPuzzle == maximumGame) {
    
        setTimeout(() => {                
            Object.values(themes).forEach(  theme => {
                if (theme.id === playedTheme.value) {
                    if (theme.points >= points) {
                        renderCompletedQuizPopUp(theme.points, points);    
                    } else {
                        renderCompletedQuizPopUp(theme.points, points); 
                        theme.points = points;
                    }
                }
            });
            addEventlistenerToPopupBtn();       

        }, 3500);
        
    } else {
        setTimeout(() => {
            fetchAPI(API_URL);
        }, 3000);
    }
    
}


/**
 * *-----------------------------------------------------------------------------------------------
 * *render functions
 */

//render main menu section
function renderMainMenu(themesObject) {
    let formInput = '';
    let objectKeys = Object.keys(themesObject);
    
    for (let i = 0; i < objectKeys.length; i++) {
        let check = "";
        let {id, name, points} = themesObject[objectKeys[i]];

        if (i === 0) {
            check = "checked";
        }

        formInput += `     
                <input type="radio" class="${id} form-input" name="game_theme" value="${id}" id="${id}" ${check}/> 
                <label class="form-label" for="${id}">              
                    <div class="form-name"> ${name} </div>
                    <div class="form-point"> ${points} / ${maximumGame} </div>
                </label>  
            `;

    }

    let menu = ` 
        <div class="flex-center"> 
            <form action="#" class="form flex-center js-form">
            <input type="submit" value="Start Game" class="form-btn js-form-btn" /> 
            ${formInput}     
            </form>
        </div>
    `;

    document.querySelector(".js-container").innerHTML = menu;
}


//render puzzle
function renderPuzzle(question, arrOfAnswers) {
        // start counter 
        let answer = '';

        for (let i = 0; i < arrOfAnswers.length; i++) {
            answer += `<div class="answers flex-center js-answers js-answers-${i}" data-index="${i}">${arrOfAnswers[i]}</div>`;
        }
     
        let puzzle = `
        <div class="points js-points">${points} / ${allPuzzle} </div>
        <div class="question flex-center js-question">
                ${question}
        </div>
        <div class="options js-options">   
                ${answer}
        </div>
        `;

        document.querySelector(".js-container").innerHTML = puzzle;
}

//render answers
function renderResult(numOfCorrect, numOfGuessed) {
        if (numOfGuessed === false) {
            document
                .querySelector(`.js-answers-${numOfCorrect}`)
                .classList.add("correctAnswer");
        } else {
            if (numOfCorrect === numOfGuessed) {
                document
                    .querySelector(`.js-answers-${numOfCorrect}`)
                    .classList.add("correctAnswer");
            } else {
                document
                    .querySelector(`.js-answers-${numOfCorrect}`)
                    .classList.add("correctAnswer");

                document
                    .querySelector(`.js-answers-${numOfGuessed}`)
                    .classList.add("wrongAnswer");
            }
        }        
}


//render points
function renderPoints(points, allPuzzle) {
    document.querySelector(".js-points").innerHTML = `${points} / ${allPuzzle}`;
}


//render Welcome PopUp box
function renderWelcomePopUp() {
    
    document.querySelector(".js-popup-container").innerHTML = `
    <div class="popup js-popup">
        <h2>Welcome in Trivia Quiz</h2>
        <p class="popup-description-paragraph">Earn the maximum points in each category.</p>
        <button class="popup-btn js-popup-btn">ok</button>
    </div>
    `;
}


//render completed quiz popup box 
function renderCompletedQuizPopUp(themePoints, newPoints) {
    let msg, pts;
    pts =  newPoints;
    if (themePoints < newPoints) {
        msg = "New personal record!";   
    } else {
        msg = "Personal best: " + themePoints + " pts";  
    }

    document.querySelector(".js-popup-container").classList.remove("hidden");

    document.querySelector(".js-popup-container").innerHTML = `
    <div class="popup js-popup">
        <h2>Quiz complete</h2>
        <p class="popup-description-paragraph">${msg}</p>
        <p class="popup-description-paragraph">You earn: ${pts} pts</p>  
        <button class="popup-btn js-popup-btn">return</button>
    </div>
    `;

}

/**
 * *-----------------------------------------------------------------------------------------------
 * *add event listeners
 */

//close popup box and render the main menu
function addEventlistenerToPopupBtn() {

    document.querySelector(".js-popup-btn").addEventListener("click", ()=> {
        renderMainMenu(themes);
        addEventListenerToMainButton();
        document.querySelector(".js-popup-container").classList.add("hidden");
    });
}


// after onsumbit action in new game button - eventlistener
function addEventListenerToMainButton() {
    document.querySelector(".js-form").addEventListener("submit", (event) => {
        event.preventDefault();

        // add disable attributum to main button
        document.querySelector('.js-form-btn').disabled = true;

        // get value of the selected theme
        playedTheme = document.querySelector('input[name=game_theme]:checked');

        API_URL = `https://api.trivia.willfry.co.uk/questions?categories=${playedTheme.value}&limit=20`;
 
        fetchAPI(API_URL);
        points = 0;
        allPuzzle = 0;
        
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
                evaluationOfResult(event.target.dataset.index);
                };
        });
    }
}

/**
 * *-----------------------------------------------------------------------------------------------
 * *call the main functions
 */

renderWelcomePopUp();
addEventlistenerToPopupBtn();
