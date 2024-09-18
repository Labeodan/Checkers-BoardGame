import board from "./data.js";
// console.log(board);

/*......................................Cashed Elements...................................... */
const grid = document.querySelector("#grid");
const squares = []; //this will contain all the divs representing squares
const message = document.querySelector("#message");
const resetButton = document.querySelector("#reset");
let squareId;
// console.dir(resetButton);

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

// Function to clear the existing board
const clearBoard = () => {
  grid.innerHTML = ""; // Clear the grid HTML content
  squares.length = 0; // Reset the squares array
};

// Function to update the board
const updateBoard = () => {
    board.forEach((element) => {
      squareId = element.id; // Getting an id for each square
      const square = document.createElement("div");

      square.id = squareId;
      square.classList.add("square");

      if (element.color === "light") {
        square.style.backgroundColor = "#F8F1E4"; // Light color
      } else {
        square.style.backgroundColor = "#7E3A0E"; // Dark color
      }

      if (element.piece && element.piece.team === "Red") {
        square.classList.add("red");
      } else if (element.piece && element.piece.team === "Black") {
        square.classList.add("black");
      }

      square.addEventListener("click", handelClick);

      squares.push(square); // Add elements to "squares" array
      grid.appendChild(square); // Add elements to page
    });
};

// Function to update the message
const updateMessage = () => {
  if (!winner && !tie) {
    message.textContent = `${turn}'s turn`;
  } else if (!winner && tie) {
    message.textContent = "It's a tie";
  } else {
    message.textContent = `Congratulations, ${turn} won!`;
  }
};

// Function to store all pieces of the current player in an array
const putPiecesInArray = () => {
    piecesOfCurrentPlayer = []; // Reset the array
    board.forEach((element) => {
        if (element.piece && element.piece.isCaptured === false && element.piece.team === turn) {
            piecesOfCurrentPlayer.push(element); // Add the piece to the array
        }
    });
    console.log(piecesOfCurrentPlayer);
};


const legalMove = () => {
    piecesOfCurrentPlayer.forEach((square) => {
      const currentPieceId = board[square.id].id;
      
      // Normal moves initialization (left and right diagonals for two types of moves)
      let normalMoves = {
        l1: null, // move 1 step left
        r1: null, // move 1 step right
        l2: null, // jump 2 steps left
        r2: null  // jump 2 steps right
      };
  
      // Calculate possible moves for "Black"
      if (square.piece.team === "Black") {
        normalMoves.l1 = currentPieceId + 7;
        normalMoves.r1 = currentPieceId + 9;
        normalMoves.l2 = currentPieceId + 14;
        normalMoves.r2 = currentPieceId + 18;
      }
  
      // Calculate possible moves for "Red"
      if (square.piece.team === "Red") {
        normalMoves.l1 = currentPieceId - 7;
        normalMoves.r1 = currentPieceId - 9;
        normalMoves.l2 = currentPieceId - 14;
        normalMoves.r2 = currentPieceId - 18;
      }
  
      // Check if the moves are valid (inside the board boundaries, not occupied, etc.)
      normalMoves = validateMoves(normalMoves, currentPieceId, square.piece.team);
  
      console.log(
        `CurrentPieceId: ${currentPieceId} \n Available moves: l1: ${normalMoves.l1}, l2: ${normalMoves.l2}, r1: ${normalMoves.r1}, r2: ${normalMoves.r2}`
      );
    });
  };

  
  
  const validateMoves = (moves, currentPieceId, team) => {
    const squaresPerRow = 8; // Number of squares per row for the grid
  
    // Helper functions to calculate row and column based on square id
    const getRow = (id) => Math.floor(id / squaresPerRow);
    const getCol = (id) => id % squaresPerRow;
  
    // Check if the move is within bounds and doesn't wrap around rows
    const isWithinBounds = (moveId, currentId, direction, team) => {
      if (moveId < 0 || moveId >= board.length) {
        return false; // Move is out of board limits
      }
  
      const currentRow = getRow(currentId);
      const moveRow = getRow(moveId);
      const currentCol = getCol(currentId);
      const moveCol = getCol(moveId);
  
      // Adjust diagonal direction based on the team
      if (team === "Black") {
        // Black pieces move downwards (to the next row)
        if (direction === "l1" || direction === "l2") {
          return moveCol < currentCol && moveRow > currentRow; // Move left-down
        } else if (direction === "r1" || direction === "r2") {
          return moveCol > currentCol && moveRow > currentRow; // Move right-down
        }
      } else if (team === "Red") {
        // Red pieces move upwards (to the previous row)
        if (direction === "l1" || direction === "l2") {
          return moveCol < currentCol && moveRow < currentRow; // Move left-up
        } else if (direction === "r1" || direction === "r2") {
          return moveCol > currentCol && moveRow < currentRow; // Move right-up
        }
      }
  
      return false; // If the direction doesn't match any valid diagonal moves
    };
  
    // Loop through each move and validate
    for (let move in moves) {
      const moveId = moves[move];
  
      // Validate the move with enhanced boundary checking
      if (!isWithinBounds(moveId, currentPieceId, move, team)) {
        moves[move] = null; // Invalidate the move if it's out of bounds
      } else if (board[moveId] && board[moveId].piece) {
        // If there's a piece in the target position
        if (team === board[moveId].piece.team) {
          // Can't move to a square occupied by the same team's piece
          moves[move] = null;
        } else {
          // Handle capture logic for jumps (l2, r2)
          if (move === "l2" || move === "r2") {
            const betweenId = (move === "l2") ? 
              (team === "Black" ? currentPieceId + 7 : currentPieceId - 7) : 
              (team === "Black" ? currentPieceId + 9 : currentPieceId - 9);
            if (!board[betweenId].piece || board[betweenId].piece.team === team) {
              moves[move] = null; // No opponent to jump over or jumping over own piece
            }
          }
        }
      }
    }
  
    return moves;
  };
  
  
  



// Function to render the board and message
const render = () => {
  updateBoard();
  updateMessage();
  putPiecesInArray(); // Call the function to store pieces of the current player
  legalMove()
};

// Function to initialize the game
const initailize = () => {
    turn = "Black";
    winner = false;
    tie = false;
    piecesOfCurrentPlayer = [];
    
    render();
};

initailize()




// Selected function
const toggleSelect = (id) => {
  if (squares[id].classList.length > 1 && squares[id].classList.contains("selected")) {
    squares[id].classList.remove("selected");
  } else {
    const previouslySelected = document.querySelector(".selected");
    if (previouslySelected) {
      previouslySelected.classList.remove("selected");
    }
    squares[id].classList.add("selected");
  }
};

// Remove background image
const removeBackgroundImage = (id) => {
    if (squares[id].classList.contains("red") || squares[id].classList.contains("black")) {
        squares[id].classList.remove("red");
        squares[id].classList.remove("black");
    }
};

// Add background image
const addBackgroudImage = (id) => {
  squares[id].classList.add(turn.toLowerCase());
};

// Function to switch turns
const switchTurn = () => {
  if (!winner) {
    turn = turn === "Black" ? "Red" : "Black";
  }
  updateMessage();
  putPiecesInArray(); // Update pieces of the new current player
  legalMove()
};

// Handle click function
var handelClick = (e) => {
  let id = e.target.id;
  console.log(id);
  toggleSelect(id);
  removeBackgroundImage(id);
  addBackgroudImage(id);
  switchTurn();
};

// Reset function
const reset = () => {
  clearBoard();
  initailize();
};

/*......................................Event Listeners....................................... */

// Adding event listener "click" to the squares
squares.forEach((square) => {
  square.addEventListener("click", handelClick);
});

resetButton.addEventListener("click", reset);
