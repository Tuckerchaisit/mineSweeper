/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let board;
let bombCounts;
let flagCounts;
let counter=0;


/*------------------------ Cached Element References ------------------------*/
const sq = Array.from(document.querySelectorAll(".sq"))


/*----------------------------- Event Listeners -----------------------------*/
sq.forEach( (square,index) =>{
  square.addEventListener('click',() => handleClick(index));
  }
)


/*-------------------------------- Functions --------------------------------*/
init();


function init(){
  board = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
  bombCounts = 21;
  placeBomb();
  showBomb();
  render();
  console.log(board)
  console.log(counter);
}

function render(){
  
}
function placeBomb(){ //while numBombs is more than 0 then place bomb randomly on the board until numBombs is 0// bomb is equal to -1
  let placeBombChance;
  while(bombCounts>0){
    for(let i=0; i<board.length; i++){
      placeBombChance=Math.random();
      //console.log(probability);
      if(placeBombChance<0.0476190476 && board[i]===null){
        board[i]=-1;
        bombCounts--;
        console.log(bombCounts);
        if(bombCounts===0){
          break;
        }
      }
    }
  }
}

function showBomb(){
  for(let i=0; i<board.length; i++){
    if(board[i]===-1){
      sq[i].textContent='💣';
      counter++;
    }
  } 
}

function handleClick(index){
  
}

function checkAdjacent(index){

}

function isTopEdge(index){

}
function isLeftEdge(index){
  
}
function isLeftEdge(index){

}
function isLeftEdge(index){

}