let API_URL;
let playedTheme;

let randomOrderedPuzzle, puzzle, question, correctAnswer, incorrectAnswers, answerOptions, statusOfAnswers, numberOfCorrectAnswer, numberOfGuestedAnswer;
let points, allPuzzle = 0;
let maximumGame = 15;

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
    
    numberOfCorrectAnswer = answerOptions.findIndex(
        (element) => element === correctAnswer
    );
    guested === false ? 
    numberOfGuestedAnswer = guested :
    numberOfGuestedAnswer = parseInt(guested);

    allPuzzle += 1;

    if (numberOfCorrectAnswer === numberOfGuestedAnswer) {
        points += 1;
    };

    if (guested === false) {
        renderResult(numberOfCorrectAnswer, numberOfGuestedAnswer);
        renderPoints(points, allPuzzle);    
    } else {
        setTimeout(() => {
            renderResult(numberOfCorrectAnswer, numberOfGuestedAnswer);
            renderPoints(points, allPuzzle);
        }, 2000);
    }

    if (allPuzzle == maximumGame) {
        setTimeout(() => {                
            Object.values(themes).forEach(  theme => {
                if (theme.id === playedTheme.value) {
                    theme.points >= points ? theme.points : theme.points = points;
                }
            });
            renderMainMenu(themes);
            addEventListenerToMainButton();
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
        let key = objectKeys[i];
        let check = "";
        if (i === 0) {
            check = "checked";
        }
        formInput += `     
                <label class="form-label">
                    <input type="radio" class="${themesObject[`${key}`]['id']} form-input" name="game_theme" value="${themesObject[`${key}`]['id']}" ${check}/>
                    <div class="form-name"> ${themesObject[`${key}`]['name']} </div>
                    <div class="form-point"> ${themesObject[`${key}`]['points']} / ${maximumGame} </div>
                </label>
                
            `;   
    }

    let menu = ` 
        <div class="menu-container flex-center"> 
            <form action="#" class="form flex-center js-form">
            <input type="submit" value="Start Game" class="form-btn js-form-button" /> 
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
function renderResult(numbOfCorrect, numbOfGuested) {
        if (numbOfGuested === false) {
            document
            .querySelector(`.js-answers-${numbOfCorrect}`)
            .classList.add("correctAnswer");
        } else {
            if (numbOfCorrect === numbOfGuested) {
                document
                .querySelector(`.js-answers-${numbOfCorrect}`)
                .classList.add("correctAnswer");
            } else {
                document
                .querySelector(`.js-answers-${numbOfCorrect}`)
                .classList.add("correctAnswer");

                document
                .querySelector(`.js-answers-${numbOfGuested}`)
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

//close popup box
function addEventlistenerToPopupBtn() {
    document.querySelector(".js-popup-btn").addEventListener("click", ()=> {
        document.querySelector(".js-popup-container").classList.add("hidden");
    });
}

// after onsumbit action in new game button - eventlistener
function addEventListenerToMainButton() {
    document.querySelector(".js-form").addEventListener("submit", (event) => {
        event.preventDefault();
        
        // get value of the selected theme
        playedTheme = document.querySelector('input[name="game_theme"]:checked');

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

renderMainMenu(themes);
addEventListenerToMainButton();
addEventlistenerToPopupBtn();