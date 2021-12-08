let gameBox=document.querySelectorAll(".box");
let gameContent=document.querySelector(".container");
let gameResult=document.querySelector(".result");
let state=0, input, hasWinner=false, lastInput, numberOfTurns=0;
let bell= new Audio("Audio/bell.mp3");
let santaClause=new Audio("Audio/SantaClause.mp3"); 
gameBox.forEach(eachBox=>{eachBox.addEventListener("click",theGame)});
function theGame(){
    if(hasWinner)return;
    state=1-state;
    bell.currentTime=0;
    bell.play();
    numberOfTurns++;
    if(state===1)input="X";
    else input="O";
    this.innerHTML=input;
    this.dataset.input=input;
    this.removeEventListener("click",theGame);
    checkThreeConsecutive();
    checkTheWinner();
    noWinner();
}
function checkThreeConsecutive(){
   if(hasWinner==true)return;
   if(gameBox[0].dataset.input===gameBox[1].dataset.input && gameBox[0].dataset.input===gameBox[2].dataset.input) hasWinner=true;
   else if(gameBox[3].dataset.input===gameBox[4].dataset.input && gameBox[3].dataset.input===gameBox[5].dataset.input) hasWinner=true;
   else if(gameBox[6].dataset.input===gameBox[7].dataset.input && gameBox[6].dataset.input===gameBox[8].dataset.input) hasWinner=true;
   else if(gameBox[0].dataset.input===gameBox[3].dataset.input && gameBox[0].dataset.input===gameBox[6].dataset.input) hasWinner=true;
   else if(gameBox[1].dataset.input===gameBox[4].dataset.input && gameBox[1].dataset.input===gameBox[7].dataset.input) hasWinner=true;
   else if(gameBox[2].dataset.input===gameBox[5].dataset.input && gameBox[2].dataset.input===gameBox[8].dataset.input) hasWinner=true;
   else if(gameBox[0].dataset.input===gameBox[4].dataset.input && gameBox[0].dataset.input===gameBox[8].dataset.input) hasWinner=true;
   else if(gameBox[2].dataset.input===gameBox[4].dataset.input && gameBox[2].dataset.input===gameBox[6].dataset.input) hasWinner=true;
   lastInput=input;
}
function checkTheWinner(){
    if(!hasWinner) return;
    setTimeout(()=>{
        santaClause.play();
        gameContent.style.display="none";
        if(lastInput==="X")gameResult.innerHTML="Player one wins";
        else gameResult.innerHTML="Player two wins";
    },2000)
}
function noWinner(){
    if(numberOfTurns==9 && hasWinner==false) resetInput();
}
function resetInput(){
    numberOfTurns=0;
    setTimeout(()=>{
    for(let i=0; i<gameBox.length; i++){
        gameBox[i].innerHTML='';
        gameBox[i].dataset.input=i;
        gameBox[i].addEventListener("click",theGame);
        }
    },2000)
}
