import board from "./data.js";

/*......................................Cashed Elements...................................... */
const grid = document.querySelector("#grid");
const squares = []; // This will contain all the divs representing squares
const message = document.querySelector("#message");
const resetButton = document.querySelector("#reset");

/*......................................Variables............................................ */
let turn = "Black";
let winner = false;
let tie = false;
let selectedPiece = null;
let validMoves = [];

/*......................................Functions............................................ */

// Function to clear the existing board
const clearBoard = () => {
  grid.innerHTML = ""; // Clear the grid HTML content
  squares.length = 0; // Reset the squares array
};

// Function to update the board
const updateBoard = () => {
  board.forEach((element) => {
    const squareId = element.id; // Getting an id for each square
    const square = document.createElement("div");

    square.id = squareId;
    square.classList.add("square");

    if (element.color === "light") {
      square.style.backgroundColor = "#F8F1E4"; // Light color
    } else {
      square.style.backgroundColor = "#7E3A0E"; // Dark color
    }

    // Adding pieces
    if (element.piece && element.piece.team === "Red") {
      square.classList.add("red");
    } else if (element.piece && element.piece.team === "Black") {
      square.classList.add("black");
    }

    square.addEventListener("click", handleClick);

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

// Validate if the selected square has a valid piece
const validatePieceSelection = (square) => {
  return square.piece && square.piece.team === turn;
};

// Highlight valid moves for the selected piece
const highlightValidMoves = (squareId) => {
  validMoves = getValidMoves(squareId);
  validMoves.forEach((moveId) => {
    squares[moveId].classList.add("highlight");
  });
};

// Clear all highlighted moves
const clearHighlights = () => {
  validMoves.forEach((moveId) => {
    squares[moveId].classList.remove("highlight");
  });
  validMoves = [];
};

// Get valid moves for the selected piece
const getValidMoves = (squareId) => {
  const currentPiece = board[squareId].piece;
  const direction = currentPiece.team === "Black" ? 1 : -1;
  const leftMove = squareId + direction * 7;
  const rightMove = squareId + direction * 9;
  const moves = [];

  // Check if leftMove and rightMove are within bounds and the destination is empty
  if (board[leftMove] && !board[leftMove].piece) {
    moves.push(leftMove);
  }
  if (board[rightMove] && !board[rightMove].piece) {
    moves.push(rightMove);
  }

  // Check for captures
  const captureMoves = getCaptureMoves(squareId, direction);
  moves.push(...captureMoves);

  return moves;
};

// Get capture moves
const getCaptureMoves = (squareId, direction) => {
  const moves = [];
  const captureOffsets = [14, 18]; // 2 steps left and right for capture
  
  captureOffsets.forEach(offset => {
    const targetId = squareId + direction * offset;
    const opponentId = squareId + direction * (offset / 2);

    if (board[targetId] && board[opponentId] && board[opponentId].piece && 
        board[opponentId].piece.team !== turn && !board[targetId].piece) {
      moves.push(targetId);
    }
  });

  return moves;
};

// Move the selected piece to the new square
const movePiece = (fromId, toId) => {
  const targetSquare = board[toId];
  const capturedPieceId = getCapturedPieceId(fromId, toId);
  
  if (capturedPieceId !== null) {
    board[capturedPieceId].piece = null; // Remove captured piece
  }
  
  targetSquare.piece = board[fromId].piece;
  board[fromId].piece = null;
  render();
};

// Get the id of the captured piece
const getCapturedPieceId = (fromId, toId) => {
  const direction = turn === "Black" ? 1 : -1;
  const midId = fromId + (toId - fromId) / 2;
  
  return board[midId] && board[midId].piece && board[midId].piece.team !== turn ? midId : null;
};

// Switch turns
const switchTurn = () => {
  turn = turn === "Black" ? "Red" : "Black";
  updateMessage();
};

// Toggle selection of squares
const toggleSelect = (id) => {
  const square = squares[id];
  if (square.classList.contains("selected")) {
    square.classList.remove("selected");
  } else {
    square.classList.add("selected");
  }
};

// Handle the click event
const handleClick = (e) => {
  const squareId = parseInt(e.target.id, 10);
  const clickedSquare = board[squareId];
  
  // If selecting a piece
  if (!selectedPiece) {
    if (validatePieceSelection(clickedSquare)) {
      selectedPiece = clickedSquare;
      highlightValidMoves(squareId);
      toggleSelect(squareId);
    }
  } 
  // If moving a piece
  else if (validMoves.includes(squareId)) {
    movePiece(selectedPiece.id, squareId);
    switchTurn();
    clearHighlights();
    selectedPiece = null;
  } 
  // If deselecting a piece
  else if (squareId === selectedPiece.id) {
    toggleSelect(squareId);
    clearHighlights();
    selectedPiece = null;
  }
};

// Function to render the board and message
const render = () => {
  clearBoard();
  updateBoard();
  updateMessage();
};

// Initialize the game
const initialize = () => {
  turn = "Black";
  winner = false;
  tie = false;
  selectedPiece = null;
  render();
};

// Reset function
const reset = () => {
  initialize();
};

/*......................................Event Listeners....................................... */

// Reset button
resetButton.addEventListener("click", reset);

// Initialize the game
initialize();
