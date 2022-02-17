/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let board;
let bombCounts;
let flagCounts;
let counter = 0;
let adjacentCount;


/*------------------------ Cached Element References ------------------------*/
const sq = Array.from(document.querySelectorAll(".sq"))


/*----------------------------- Event Listeners -----------------------------*/
sq.forEach((square, index) => {
  square.addEventListener('click', () => handleClick(index));
}
)
//todo: use contextmenu for right click to flag mine

/*-------------------------------- Functions --------------------------------*/
init();


function init() {
  board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
  bombCounts = 21;
  placeBomb();
  showBomb();
  render();
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
      counter++;
    }
  }
}

function handleClick(index) {
  checkAdjacent(index);
  console.log(adjacentCount);
  // console.log(index);
}

function checkAdjacent(index) { //TODO
  adjacentCount = 0;
  if (index === 0) {
    if (board[1] === -1) {
      adjacentCount++;
    }
    if (board[10] === -1) {
      adjacentCount++;
    }
    if (board[11] === -1) {
      adjacentCount++;
    }
  } else {
    if (index === 9) {
      if (board[8] === -1) {
        adjacentCount++;
      }
      if (board[18] === -1) {
        adjacentCount++;
      }
      if (board[19] === -1) {
        adjacentCount++;
      }
    } else {
      if (index === 90) {
        if (board[80] === -1) {
          adjacentCount++;
        }
        if (board[81] === -1) {
          adjacentCount++;
        }
        if (board[91] === -1) {
          adjacentCount++;
        }
      } else {
        if (index === 99) {
          if (board[88] === -1) {
            adjacentCount++;
          }
          if (board[89] === -1) {
            adjacentCount++;
          }
          if (board[98] === -1) {
            adjacentCount++;
          }
        } else {
          if (isTopEdge(index) === true) {

          } else {
            if (isLeftEdge(index) === true) {

            } else {
              if (isRightEdge(index) === true) {

              } else {
                if (isBottomEdge(index) === true) {

                } else {
                  for (let i = (index - 11); i < (index - 8); i++) { //check upper sqs
                    if (board[i] === -1) {
                      adjacentCount++;
                    }
                  }
                  for (let i = (index - 1); i < (index + 2); i += 2) { //check sq on the side
                    if (board[i] === -1) {
                      adjacentCount++;
                    }
                  }
                  for (let i = (index + 9); i < (index + 12); i++) { //check lower sqs
                    if (board[i] === -1) {
                      adjacentCount++;
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

  return adjacentCount;
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