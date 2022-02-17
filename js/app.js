/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let board;
let bombCounts;
let flagCounts;
let counter=0;
let adjacentCount;


/*------------------------ Cached Element References ------------------------*/
const sq = Array.from(document.querySelectorAll(".sq"))


/*----------------------------- Event Listeners -----------------------------*/
sq.forEach( (square,index) =>{
  square.addEventListener('click',() => handleClick(index));
  }
)
//todo: use contextmenu for right click to flag mine

/*-------------------------------- Functions --------------------------------*/
init();


function init(){
  board = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
  bombCounts = 21;
  placeBomb();
  showBomb();
  render();
  checkAdjacent();
  console.log(adjacentCount);
}

function render(){
  
}
function placeBomb(){ //while numBombs is more than 0 then place bomb randomly on the board until numBombs is 0// bomb is equal to -1
  let placeBombChance;
  while(bombCounts>0){
    for(let i=0; i<board.length; i++){
      placeBombChance=Math.random();
      if(placeBombChance<0.0476190476 && board[i]===null){
        board[i]=-1;
        bombCounts--;
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
  checkAdjacent(index);
  console.log(adjacentCount);
}

function checkAdjacent(index){ //TODO
  adjacentCount=0;
  for(let i=(index-11);i<(index-8); i++){
    if(board[i]===-1){
      adjacentCount++;
    }
  }
  for(let i=(index-1);i<(index+2); i+=2){
    if(board[i]===-1){
      adjacentCount++;
    }
  }
  for(let i=(index+9);i<(index+12); i++){
    if(board[i]===-1){
      adjacentCount++;
    }
  }
  return adjacentCount;
}

function isTopEdge(index){

}
function isLeftEdge(index){
  
}
function isLeftEdge(index){

}
function isLeftEdge(index){

}