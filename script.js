
const boxes = document.querySelectorAll(".box");
const playerInfo = document.querySelector("[data-Info]");
const newGame = document.querySelector(".newGame");

// music
const music = document.querySelector("[music]");

let currentPlayer ;
let gameGrid;


const winnerPattern=[
    [0 ,1 ,2],
    [3 ,4 ,5],
    [6 ,7 ,8],
    [0 ,3 ,6],
    [1 ,4 ,7],
    [2 ,5 ,8],
    [0 ,4 ,8],
    [2 ,4 ,6],
];


// let's create a function to initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["" , "" , "" , "" , "" , "" , "" ,"" , ""];

    // UI par empty bhi karna padega boxes ko
    boxes.forEach((box,index)=>{
        box.innerText="";
        box.style.pointerEvents ='all';

        // background color lo remove karne le liye ,so again properties set
        box.classList =`box box${index}`;
    });


    // intial player info
    playerInfo.innerText = `Current Player-${currentPlayer}`;

}
initGame();


function handleClick(index){
    if(gameGrid[index]===""){
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = 'none';

          // change player turn
        swapTurn();

         // check Game Over
        checkGameOver();
    }
   
}


function swapTurn(){
    if(currentPlayer=="X"){
        currentPlayer="O";
    }else{
        currentPlayer="X";
    }

    // UI update cuurent player
    playerInfo.innerText = `Current Player-${currentPlayer}`;
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
        console.log(box,index);
    })
});

function checkGameOver(){
    let answer ="";
    // all 3 boxes should be non-empty and exactly same in value
    winnerPattern.forEach(position=>{
        if(gameGrid[position[0]] != "" || gameGrid[position[1]] != ""  || gameGrid[position[2]] != "" ){
            if((gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]])){

                // check winner
                if(gameGrid[position[0]] == "X"){
                    answer = "X";
                }else{
                    answer = "O";
                }

                // add music 
                music.play();
                boxes[position[0]].classList.add('win');
                boxes[position[1]].classList.add('win');
                boxes[position[2]].classList.add('win');

                // disable box 
                boxes.forEach(box=>{
                    box.style.pointerEvents ='none';
                });

            }
        } 
    });

    // it means winner
    if(answer!=""){
        playerInfo.innerText = `Winner Player-${answer}`;
        return;
    }

    // let's check when there is no winner
    let count=0;
    gameGrid.forEach(box=>{
        if(box!=""){
            count++;
        }
    });
    if(count==9) {
        playerInfo.innerText = `Game Tied !`;
    }
}

newGame.addEventListener('click',initGame);