//todo win condition: if flagCounts is equal to number of bombs and there's no square that has not been check
/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let board;
let bombCounts;
let flagCounts =0;
let adjacentCountBomb;
let isGameOver = 0; //0 is not over, 1 if the game is over
let numSqCount =0;

/*------------------------ Cached Element References ------------------------*/
const sq = Array.from(document.querySelectorAll(".sq"));
const flagStat = document.querySelector("#flagStat");
const resetBtn = document.querySelector("#reset-button")

/*----------------------------- Event Listeners -----------------------------*/
sq.forEach((square, index) => {
  square.addEventListener('click', () => handleClick(index));
}
)
sq.forEach((square, index) => {
  square.addEventListener('contextmenu', () => handleRightClick(index));
}
)
resetBtn.addEventListener('click', reset);
//todo: use contextmenu for right click to flag mine

/*-------------------------------- Functions --------------------------------*/
init();


function init() {
  board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
  bombCounts = 21;

  placeBomb();
  showBomb();
  getAdjacentBomb();
  flagStat.textContent= `🚩 : ${flagCounts}`;
  render();
  // console.log(board);
}

function reset(){
    window.location.reload();
}

function render() {
  
}
function placeBomb() { //while numBombs is more than 0 then place bomb randomly on the board until numBombs is 0// bomb is equal to -1
  let placeBombChance;
  while (bombCounts > 0) {
    for (let i = 0; i < board.length; i++) {
      placeBombChance = Math.random();
      if (placeBombChance < 0.0476190476 && board[i] === null) {
        board[i] = -1;
        bombCounts--;
        if (bombCounts === 0) {
          break;
        }
      }
    }
  }
}

function showBomb() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === -1) {
      sq[i].textContent = '💣';
    }
  }
}

function handleClick(index) {
  if(isGameOver===1){ //check if the game is over yet
    return
  }else{
    checkEmptySq(index);
    
    setTimeout(function(){
      getNumSqCount();
      console.log(board);
      console.log(numSqCount);
    },500);
    isWinner();
  }
}
function handleRightClick(index) {
  if(isGameOver===1){ //check if the game is over yet
    return
  }else{
    if(sq[index].textContent==="🚩"){
      sq[index].textContent="";
      flagCounts--;
      
      flagStat.textContent= `🚩 : ${flagCounts}`;
    }else{
      sq[index].textContent="🚩";
      flagCounts++;
      
      flagStat.textContent= `🚩 : ${flagCounts}`;
      isWinner();
    }
  }
  
}

function isWinner(){
  if((isGameOver===0) && (flagCounts===21) && (numSqCount===79)){
    alert('You Won');
    isGameOver = 1;
  }
}

function getNumSqCount(){
  numSqCount=0;
  for(let i =0; i<board.length; i++){
    if(board[i]===-2){
      numSqCount++;
    }
  }
}

function checkEmptySq(index) {
  if(board[index]===-1){
    showBomb();
    alert('Game Over, You lost');
    isGameOver = 1; //change the state of the game once the player pressed on bomb
  }

  if ((board[index] !== 0) && (board[index] !== -1) && (board[index] !== -2)) { // if there's no bomb and the sq is not empty then show the adjacentBomb number on the sq
    sq[index].textContent = board[index];
    board[index]= -2;
  }else{
    
    setTimeout(() => {
        if ((board[index] !== -1)&&(board[index]===0) ) {
         
          if (index === 0) {
            board[index]=-2;
            checkEmptySq(1);
            checkEmptySq(10);
            checkEmptySq(11);
            
          } else {
            if (index === 9) {
              board[index]=-2;
              checkEmptySq(8);
              checkEmptySq(18);
              checkEmptySq(19);
              
            } else {
              if (index === 90) {
                board[index]=-2;
                checkEmptySq(80);
                checkEmptySq(81);
                checkEmptySq(91);
                
              } else {
                if (index === 99) {
                  board[index]=-2;
                  checkEmptySq(88);
                  checkEmptySq(89);
                  checkEmptySq(98);
                } else {
                  if (isTopEdge(index) === true) {
                    for (let i = (index - 1); i < (index + 2); i += 2) { //check sq on the side
                      board[index]=-2;
                      checkEmptySq(i);
                    }
                    for (let i = (index + 9); i < (index + 12); i++) { //check lower sqs
                      board[index]=-2;
                      checkEmptySq(i);
                    }
                  } else {
                    if (isLeftEdge(index) === true) {
                      board[index]=-2;
                      checkEmptySq((index-10));
                      checkEmptySq((index-9));
                      checkEmptySq((index+1));
                      checkEmptySq((index+10));
                      checkEmptySq((index+11));
                      
                    } else {
                      if (isRightEdge(index) === true) {
                        board[index]=-2;
                        checkEmptySq((index-11))
                        checkEmptySq((index-10))
                        checkEmptySq((index-1))
                        checkEmptySq((index+9))
                        checkEmptySq((index+10))
                      } else {
                        if (isBottomEdge(index) === true) {
                          for (let i = (index - 11); i < (index - 8); i++) { //check upper sqs
                            board[index]=-2;
                            checkEmptySq(i);
                          }
                          for (let i = (index - 1); i < (index + 2); i += 2) { //check sq on the side
                            board[index]=-2;
                            checkEmptySq(i);
                          }
                        } else {
                          for (let i = (index - 11); i < (index - 8); i++) { //check upper sqs
                            board[index]=-2;
                            checkEmptySq(i);
                          }
                          for (let i = (index - 1); i < (index + 2); i += 2) { //check sq on the side
                            board[index]=-2;
                            checkEmptySq(i);
                          }
                          for (let i = (index + 9); i < (index + 12); i++) { //check lower sqs
                            board[index]=-2;
                            checkEmptySq(i);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
    }, 10)
  } 
  
}

function getAdjacentBomb() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] !== -1) {
      checkAdjacentBomb(i);
      board[i] = adjacentCountBomb;
      // if(adjacentCountBomb!==0){                  //TODO comment this out to stop showing the nums
      //   sq[i].textContent = adjacentCountBomb;
      // }
    }
  }
}

function checkAdjacentBomb(index) {
  adjacentCountBomb = 0;
  if (index === 0) { //check top left corner
    if (board[1] === -1) {
      adjacentCountBomb++;
    }
    if (board[10] === -1) {
      adjacentCountBomb++;
    }
    if (board[11] === -1) {
      adjacentCountBomb++;
    }
  } else {
    if (index === 9) { //check top right corner
      if (board[8] === -1) {
        adjacentCountBomb++;
      }
      if (board[18] === -1) {
        adjacentCountBomb++;
      }
      if (board[19] === -1) {
        adjacentCountBomb++;
      }
    } else {
      if (index === 90) { //check bottom left corner
        if (board[80] === -1) {
          adjacentCountBomb++;
        }
        if (board[81] === -1) {
          adjacentCountBomb++;
        }
        if (board[91] === -1) {
          adjacentCountBomb++;
        }
      } else {
        if (index === 99) { //check bottom right corner
          if (board[88] === -1) {
            adjacentCountBomb++;
          }
          if (board[89] === -1) {
            adjacentCountBomb++;
          }
          if (board[98] === -1) {
            adjacentCountBomb++;
          }
        } else {
          if (isTopEdge(index) === true) {
            for (let i = (index - 1); i < (index + 2); i += 2) { //check sq on the side
              if (board[i] === -1) {
                adjacentCountBomb++;
              }
            }
            for (let i = (index + 9); i < (index + 12); i++) { //check lower sqs
              if (board[i] === -1) {
                adjacentCountBomb++;
              }
            }
          } else {
            if (isLeftEdge(index) === true) {
              if (board[(index - 10)] === -1) {
                adjacentCountBomb++;
              }
              if (board[(index - 9)] === -1) {
                adjacentCountBomb++;
              }
              if (board[(index + 1)] === -1) {
                adjacentCountBomb++;
              }
              if (board[(index + 10)] === -1) {
                adjacentCountBomb++;
              }
              if (board[(index + 11)] === -1) {
                adjacentCountBomb++;
              }
            } else {
              if (isRightEdge(index) === true) {
                if (board[(index - 11)] === -1) {
                  adjacentCountBomb++;
                }
                if (board[(index - 10)] === -1) {
                  adjacentCountBomb++;
                }
                if (board[(index - 1)] === -1) {
                  adjacentCountBomb++;
                }
                if (board[(index + 9)] === -1) {
                  adjacentCountBomb++;
                }
                if (board[(index + 10)] === -1) {
                  adjacentCountBomb++;
                }
              } else {
                if (isBottomEdge(index) === true) {
                  for (let i = (index - 11); i < (index - 8); i++) { //check upper sqs
                    if (board[i] === -1) {
                      adjacentCountBomb++;
                    }
                  }
                  for (let i = (index - 1); i < (index + 2); i += 2) { //check sq on the side
                    if (board[i] === -1) {
                      adjacentCountBomb++;
                    }
                  }
                } else {
                  for (let i = (index - 11); i < (index - 8); i++) { //check upper sqs
                    if (board[i] === -1) {
                      adjacentCountBomb++;
                    }
                  }
                  for (let i = (index - 1); i < (index + 2); i += 2) { //check sq on the side
                    if (board[i] === -1) {
                      adjacentCountBomb++;
                    }
                  }
                  for (let i = (index + 9); i < (index + 12); i++) { //check lower sqs
                    if (board[i] === -1) {
                      adjacentCountBomb++;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return adjacentCountBomb;
}

function isTopEdge(index) {
  if ((index === 1) || (index === 2) || (index === 3) || (index === 4) || (index === 5) || (index === 6) || (index === 7) || (index === 8)) {
    return true;
  }
}
function isLeftEdge(index) {
  if ((index === 10) || (index === 20) || (index === 30) || (index === 40) || (index === 50) || (index === 60) || (index === 70) || (index === 80)) {
    return true;
  }
}
function isRightEdge(index) {
  if ((index === 19) || (index === 29) || (index === 39) || (index === 49) || (index === 59) || (index === 69) || (index === 79) || (index === 89)) {
    return true;
  }
}
function isBottomEdge(index) {
  if ((index === 91) || (index === 92) || (index === 93) || (index === 94) || (index === 95) || (index === 96) || (index === 97) || (index === 98)) {
    return true;
  }
}

