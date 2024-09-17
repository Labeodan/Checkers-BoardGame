import board from "./data.js";
// console.log(board);

/*......................................Cashed Elements...................................... */
const grid = document.querySelector("#grid");
const squares = []; //this will contain all the divs representing squares
const message = document.querySelector("#message");
const resetButton = document.querySelector("#reset");
let squareId;
// console.dir(resetButton);
// console.log(squares)

/*......................................Variables............................................ */
let turn = "Black";
let winner = false;
let tie = false;
let piecesOfCurrentPlayer = [];


/*......................................Functions............................................ */
// Piking who goes first randomly
// const random = () => {
//     let player;
//     Math.floor(Math.random() * 2) === 0
//     ? (player = "player1")
//     : (player = "player2");
//     return (turn = player);
// };
// random();



// function to clear the existing board
const clearBoard = () => {
  grid.innerHTML = ""; // Clear the grid HTML content
  squares.length = 0; // Reset the squares array
};

// function to update the board
const updateBoard = () => {
  board.forEach((row, ridx) => {
    row.forEach((element, colidx) => {
      squareId = ridx * 8 + colidx; //Getting an id for each square
      const square = document.createElement("div");

      square.id = squareId;
      square.classList.add("square");

      if (element.color === "light") {
        square.style.backgroundColor = "#F8F1E4"; // Light color
      } else {
        square.style.backgroundColor = "#7E3A0E"; // Dark color
      }

      if (element.piece && element.piece.type === "red") {
        square.classList.add("red");
      } else if (element.piece && element.piece.type === "black") {
        square.classList.add("black");
      }

      square.addEventListener("click", handelClick);

      squares.push(square); //Add elements to "squares" array
      grid.appendChild(square); //Add elements to page

    });
  });
};

// function to update message

const updateMessage = () => {
  if (winner === false && tie === false) {
    message.textContent = `${turn}'s turn`;
  } else if (winner === false && tie === true) {
    message.textContent = "It's a tie";
  } else {
    message.textContent = `Congatulations, ${turn} won!`;
  }
};

// function thatnputs all the pieces of the selected player in an array
const putPiecesInArray = () => {
    piecesOfCurrentPlayer = []
    board.forEach((row) => {
        row.forEach((col) => {
            if(col.piece && col.piece.isCaptured === false && col.piece.team === turn.toLocaleLowerCase()) {
                piecesOfCurrentPlayer.push(col)
            }
        })
    })
}

// function to render the board and message

const render = () => {
  updateBoard();
  updateMessage();
};
// functon to innitialize the game.
const initailize = () => {
    board;
    turn = "Black";
    winner = false;
    tie = false;
    piecesOfCurrentPlayer = []
    
    render();
    putPiecesInArray()
};

initailize();
console.log(piecesOfCurrentPlayer)

// selected function
const toggleSelect = (id) => {
  if (
    squares[id].classList.length > 1 &&
    squares[id].classList.contains("selected")
  ) {
    squares[id].classList.remove("selected");
  } else {
    const previouslySelected = document.querySelector(".selected");
    if (previouslySelected) {
      previouslySelected.classList.remove("selected");
    }
    squares[id].classList.add("selected");
  }
};

// remove background image
const removeBackgroundImage = (id) => {
    if (squares[id].classList.contains("red") || squares[id].classList.contains("black")) {
        squares[id].classList.remove("red")
        squares[id].classList.remove("black")
    }
};

// add background image
const addBackgroudImage = (id) => {
  squares[id].classList.add(turn.toLocaleLowerCase());
};

const switchTurn = () => {
  if (winner) {
    return;
  } else {
    turn = turn === "Black" ? "Red" : "Black";
  }
  updateMessage()
};

// handle click function
var handelClick = (e) => {
  let id = e.target.id;
  console.log(id)
  toggleSelect(id);
  removeBackgroundImage(id)
  addBackgroudImage(id);
  putPiecesInArray()
  switchTurn()
  console.log(piecesOfCurrentPlayer)

};


const reset = () => {
  clearBoard();
  initailize();
};

/*......................................Event Listners....................................... */

// Adding event listner "click" to the squares
squares.forEach((square) => {
  square.addEventListener("click", handelClick);
});

resetButton.addEventListener("click", reset);
