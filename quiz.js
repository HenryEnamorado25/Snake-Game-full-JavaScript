const start= document.getElementById("start");
const quiz= document.getElementById("quiz");
const question= document.getElementById("question");
const qImg= document.getElementById("qImg");
const choiceA= document.getElementById("A");
const choiceB= document.getElementById("B");
const choiceC= document.getElementById("C");
const counter= document.getElementById("counter");
const timeGauge= document.getElementById("timeGauge");
const progress= document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create question

let questions = [
    {question: "What does HTML stand for?",
    imgSrc:"img/html.png",
    choiceA :"Correct",
    choiceB: "Wrong",
    choiceC:"Wrong",
    correct:"A"
    },
    {question: "What does CSS stand for?",
    imgSrc:"img/css.png",
    choiceA :"Wrong",
    choiceB: "Correct",
    choiceC:"Wrong",
    correct:"B"
    },
    {question: "What does JS stand for?",
    imgSrc:"img/js.png",
    choiceA :"Wrong",
    choiceB: "Wrong",
    choiceC:"Correct",
    correct:"C"
    }

];

//Declare some variables
const lastQuestion = questions.length - 1;
let runningQuestion=0;
let count =0;
const questionTime = 10;//10s
const guageWidth = 150; //150px
const guageUnit = guageWidth/questionTime;
let TIMER;
let score = 0;

//render question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question + "</p>";
    qImg.innerHTML="<img src=" + q.imgSrc + ">";
    choiceA.innerHTML=q.choiceA;
    choiceB.innerHTML=q.choiceB;
    choiceC.innerHTML=q.choiceC;

};
//start quiz
start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display="none";
    renderQuestion();
    quiz.style.display="block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
    

};

//render progress
function renderProgress(){
    for(let qIndex = 0;qIndex <=lastQuestion; qIndex++){
        progress.innerHTML +="<div class='prog' id='"+ qIndex +"'></div>";
    }
};

//counter render

function renderCounter(){
    if(count <=questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * guageUnit + "px";
        count++

    }else{
        count=0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
    
        }else{//end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
};

//check the anwser

function checkAnswer(answer){
    if(answer ==questions[runningQuestion].correct){
        //answer is correct
        
        score++;
        //change progress color to green
        answerIsCorrect();


    }else{
        //answer wrong
        //change progress color to red
        answerIsWrong();
    }
    count = 0
        
        if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
        }else{
        //end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }

};

//answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//score reder
function scoreRender(){
    scoreDiv.style.display ='block';
    

    //calculate the porcent of question anwsered by the user

    const scorePercent = Math.round((100 * score)/questions.length);

    //choose image based on the score Percent

    let img = (scorePercent >= 80) ? "img/5.png" : (scorePercent >= 60) ? "img/4.png" : (scorePercent >= 40) ? "img/3.png" : (scorePercent >= 20) ? "img/2.png" : "img/1.png" ;

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>" + scorePercent + "% </p>";

    function newFunction() {
        quiz.style.display = "none";
    }
}