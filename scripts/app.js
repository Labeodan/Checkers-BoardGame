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
let continuingCapture = false; // Track if the current turn can continue due to capture
let hasCaptured = false; // Track if a capture was made in the current move
const initialBoardState = structuredClone(board);

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
      if (element.piece) {
        if (element.piece.team === "Red") {
          square.classList.add("red");
          if (element.piece.isKing) {
            square.classList.add("redKing");
          }
        } else if (element.piece.team === "Black") {
          square.classList.add("black");
          if (element.piece.isKing) {
            square.classList.add("blackKing");
          }
        }
      }
  
      square.addEventListener("click", handleClick);
  
      squares.push(square); // Add elements to "squares" array
      grid.appendChild(square); // Add elements to page
    });
  };
  
  

// Function to update the message
const updateMessage = () => {
  if (winner) {
    message.textContent = `Congratulations, ${winner} won!`;
  } else if (tie) {
    message.textContent = "It's a tie";
  } else {
    message.textContent = `${turn}'s turn`;
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
    const currentSquare = board[squareId];
    const currentPiece = currentSquare.piece;
    const moves = [];
    
    if (!currentPiece) return moves;
  
    // Determine directions based on whether the piece is a king
    const directions = currentPiece.isKing
      ? [1, -1] // Kings can move in both directions
      : [currentPiece.team === "Black" ? 1 : -1]; // Regular pieces move forward

    directions.forEach((dir) => {
      const leftMove = squareId + dir * 7;
      const rightMove = squareId + dir * 9;

      // Check if move is within board boundaries and not wrapping around rows
      if (isValidMove(leftMove, squareId)) {
        if (
          board[leftMove] &&
          !board[leftMove].piece &&
          Math.abs(Math.floor(leftMove / 8) - Math.floor(squareId / 8)) === 1
        ) {
          moves.push(leftMove);
        }
      }

      if (isValidMove(rightMove, squareId)) {
        if (
          board[rightMove] &&
          !board[rightMove].piece &&
          Math.abs(Math.floor(rightMove / 8) - Math.floor(squareId / 8)) === 1
        ) {
          moves.push(rightMove);
        }
      }
  
      // Check for captures
      const captureMoves = getCaptureMoves(squareId, dir, currentPiece.team);
      moves.push(...captureMoves);
    });
  
    return moves;
};

const getCaptureMoves = (squareId, direction, currentPieceTeam) => {
    const moves = [];
    const captureOffsets = [14, 18]; // 2 steps left and right for capture
  
    captureOffsets.forEach((offset) => {
      const targetId = squareId + direction * offset;
      const opponentId = squareId + direction * (offset / 2);
  
      // Ensure target and opponent IDs are within board boundaries
      if (
        targetId >= 0 && targetId < 64 &&
        opponentId >= 0 && opponentId < 64 &&
        Math.abs(Math.floor(targetId / 8) - Math.floor(squareId / 8)) === 2
      ) {
        if (
          board[targetId] &&
          !board[targetId].piece &&
          board[opponentId] &&
          board[opponentId].piece &&
          board[opponentId].piece.team !== currentPieceTeam
        ) {
          moves.push(targetId);
        }
      }
    });
  
    return moves;
};

// Helper function to check if move is within board boundaries
const isValidMove = (targetId, squareId) => {
  return targetId >= 0 && targetId < 64 &&
         !((squareId % 8 === 0 && targetId % 8 === 7) || (squareId % 8 === 7 && targetId % 8 === 0));
};


// Move the selected piece to the new square
const movePiece = (fromId, toId) => {
    const targetSquare = board[toId];
    const fromSquare = board[fromId];
    
    // Capture logic (if applicable)
    const capturedPieceId = getCapturedPieceId(fromId, toId);
    if (capturedPieceId !== null) {
      board[capturedPieceId].piece = null; // Remove captured piece
    }
    
    // Move the piece to the new position
    targetSquare.piece = fromSquare.piece;
    fromSquare.piece = null;
  
    // Check if the piece should be promoted to a king
    const piece = targetSquare.piece;
    if (piece) {
      if (piece.team === "Black" && toId >= 56) {
        piece.isKing = true;
        console.log('Black piece promoted to king');
      } else if (piece.team === "Red" && toId <= 7) {
        piece.isKing = true;
        console.log('Red piece promoted to king');
      }
    }
  
    // Re-render the board
    render();
  };
  
  

// Get the id of the captured piece
const getCapturedPieceId = (fromId, toId) => {
  const direction = turn === "Black" ? 1 : -1;
  const midId = fromId + (toId - fromId) / 2;

  return board[midId] && board[midId].piece && board[midId].piece.team !== turn
    ? midId
    : null;
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
    clearHighlights();

    if (hasCaptured && canContinueCapture(squareId)) {
      // Continue turn if a subsequent capture is possible and the player has captured
      continuingCapture = true;
    } else {
      // Switch turn if no further capture is possible
      continuingCapture = false;
      switchTurn();
    }

    selectedPiece = null;
    checkWin();
    checkTie();
  }
  // If deselecting a piece
  else if (squareId === selectedPiece.id) {
    toggleSelect(squareId);
    clearHighlights();
    selectedPiece = null;
  }
};

// Function to check if a subsequent capture is possible
const canContinueCapture = (squareId) => {
  return getCaptureMoves(squareId, turn === "Black" ? 1 : -1).length > 0;
};

// Function to check win conditions
const checkWin = () => {
  const blackPieces = board.filter(
    (square) => square.piece && square.piece.team === "Black"
  );
  const redPieces = board.filter(
    (square) => square.piece && square.piece.team === "Red"
  );

  // Check if one player has no pieces left
  if (blackPieces.length === 0) {
    winner = "Red";
  } else if (redPieces.length === 0) {
    winner = "Black";
  } else {
    // Check if the opponent has no valid moves
    if (!hasValidMoves("Black") && turn === "Black") {
      winner = "Red";
    } else if (!hasValidMoves("Red") && turn === "Red") {
      winner = "Black";
    }
  }

  if (winner) {
    updateMessage();
    // Optionally, disable further clicks or add a game over screen
  }
};

// Function to check if the given team has valid moves
const hasValidMoves = (team) => {
  return board.some(
    (square) =>
      square.piece &&
      square.piece.team === team &&
      getValidMoves(square.id).length > 0
  );
};

// Function to check tie conditions
const checkTie = () => {
  const remainingBlackPieces = board.filter(
    (square) => square.piece && square.piece.team === "Black"
  ).length;
  const remainingRedPieces = board.filter(
    (square) => square.piece && square.piece.team === "Red"
  ).length;

  // If both players are unable to capture and neither has won, declare a tie
  if (remainingBlackPieces <= 1 && remainingRedPieces <= 1) {
    tie = true;
    updateMessage();
  }
};

// Function to reset the game
const resetGame = () => {
  winner = false;
  tie = false;
  turn = "Black";
  board.length = 0;
  board.push(...structuredClone(initialBoardState));
  render();
  updateMessage();
};

// Render the board
const render = () => {
  clearBoard();
  updateBoard();
};

/*......................................Event Listeners...................................... */

resetButton.addEventListener("click", resetGame);

/*......................................Initial Render...................................... */

render();
updateMessage();
