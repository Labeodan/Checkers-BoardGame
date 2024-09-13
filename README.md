# Checkers-BoardGame
# Checkers User Story

## 1. Game Setup
- As a **player**, I want to see an 8x8 board at the start of the game, with alternating dark and light squares.
- As a **player**, I want my pieces to be set up on the first three rows of the dark squares for each player at the start of the game.
- As a **player**, I want to control either black or red pieces, depending on a function that randomly picks wich player goes first.
- As a **player**, I want the black pieces to be assigned to the player that is selected through the random function.

## 2. Turn Management
- As a **player**, I want to take turns with my opponent, with black always moving first.
- As a **player**, I want to be able to select one of my pieces and move it diagonally forward on dark squares to an adjacent unoccupied square.

## 3. Capturing Opponent Pieces
- As a **player**, I want to jump over an opponent’s piece diagonally if there is an empty square behind it, allowing me to capture that piece.
- As a **player**, I want to continue jumping and capturing additional pieces if multiple consecutive jumps are possible in one turn.

## 4. Becoming a King
- As a **player**, I want my piece to be promoted to a "king" when it reaches the last row on my opponent’s side of the board.
- As a **king**, I want to be able to move diagonally both forward and backward.

## 5. Winning the Game
- As a **player**, I want to win the game by either capturing all of my opponent’s pieces or blocking them so they have no legal moves left.
- As a **player**, I want the game to display a victory message when I win or a loss message when I lose.

## 6. Draw Conditions
- As a **player**, I want the game to detect a stalemate or draw when neither player can make a legal move.

## 7. Game Reset
- As a **player**, I want the option to reset the game at any time, clearing the board and starting over from the initial setup.
<br><br><br><br>

# Level Up
## 8. Multiple Rounds and Scorekeeping
- As a **player**, I want the ability to play multiple rounds with my opponent, keeping track of wins for each player.
- As a **player**, I want the game to display the current score after each round.

## 9. Audio feedback
- As a **player**, I want a sound should be played On the successful movement of a piece.

## 10. Rotating board
- As a **player**, I want the board to turn `180 degrees`  when it's the next players turn to play. 
<br><br>
<br><br>
<br><br>
<br><br>
<br><br>
<br><br>
# Checkers Game Logic

## Variables:
- **`playerTurn`**: Keeps track of whose turn it is (either `'black'` or `'red'`).
- **`winner`**: Stores the result of the game (`null` at the start, updates when someone wins).
- **`message`**: Displays game status (e.g., "Player X's turn", "Player X wins!").

## Cached Elements:
- **`checkersBoard`**: Represents the visual board (DOM element) where the pieces are displayed.
- **`messageDiv`**: Displays game messages (DOM element).
- **`resetButton`**: Button to reset the game (DOM element).

---

## Initialization Functions

### 1. `randomFirstPlayer()`
- Randomly selects which player starts the game.
- Updates `playerTurn` to `'black'` or `'red'`.
- Updates `message` to "Player X's turn".

### 2. `initializeGame()`
- Resets the `winner` variable to `null`.
- Initializes `playerTurn` by calling `randomFirstPlayer()`.
- Updates `messageDiv` with the current player's turn.
- Loops through the board array to place the pieces based on starting positions.
- Assigns event listeners to each piece for highlighting and movement.

---

## Turn Management Functions

### 3. `switchTurn()`
- Switches `playerTurn` between `'black'` and `'red'`.
- Updates `messageDiv` to show the current player's turn.

### 4. `hasLegalMove(playerType)`
- Loops through all pieces of the current player.
- Checks if any pieces have a valid move.
- Returns `true` if there's a valid move, otherwise returns `false`.

---

## Piece Interaction Functions

### 5. `highlightPiece(row, col)`
- Checks if the clicked piece belongs to the current player.
- Toggles the `isSelected` property for the piece.
- If selected, highlights the piece visually on the board.

### 6. `checkHighlightedPiece(targetRow, targetCol)`
- Loops through all pieces on the board.
- If a piece is selected (`isSelected == true`):
  - Checks if the selected piece can move to the clicked cell (`targetRow`, `targetCol`).
  - If valid, calls `movePiece()`.
  - Otherwise, shows an invalid move message.
- If no piece is selected, the game continues.

---

## Capturing Opponent Pieces Functions

### 7. `isCaptureMove(startRow, startCol, targetRow, targetCol)`
- Checks if the move is a jump over an opponent’s piece:
  - The target cell is two diagonal spaces away.
  - An opponent's piece is located in the middle of the diagonal jump.
- If valid, calls `capturePiece()`.
- Returns `true` for a valid capture, `false` otherwise.

### 8. `capturePiece(capturedRow, capturedCol)`
- Removes the opponent’s piece at `capturedRow`, `capturedCol` from the board.
- Marks the piece as captured (`isCaptured = true`).
- Updates the board visually to remove the captured piece.
- Checks if the capturing piece can continue capturing more pieces.

### 9. `checkForContinuedCapture(piece)`
- Checks if the capturing piece has another valid capture available.
- If yes, allows the current player to continue capturing with that piece.

---

## Becoming a King Functions

### 10. `promoteToKing(piece, row)`
- Checks if the piece reaches the last row of the opponent’s side:
  - For black: `row == 7`
  - For red: `row == 0`
- If true, sets `piece.isKing` to `true`.
- Updates the piece visually to indicate it is now a king.

### 11. `kingMovement(piece, targetRow, targetCol)`
- Allows a king to move diagonally both forward and backward.
- Checks if the target cell is diagonally adjacent to the current position.
- Calls `isCaptureMove()` if the king is making a capture.

---

## Winning the Game Functions

### 12. `checkWinCondition()`
- Checks if all opponent pieces have been captured:
  - If the opponent has no pieces left, calls `declareWinner()`.
- Checks if the opponent has any legal moves:
  - Calls `hasLegalMove(opponentType)`.
  - If no legal moves, calls `declareWinner()`.

### 13. `declareWinner(winnerType)`
- Sets the `winner` variable to the current player (`'black'` or `'red'`).
- Updates `messageDiv` with "Player X wins!".
- Ends the game by disabling further moves.

---

## Draw Condition Function

### 14. `checkForDraw()`
- Checks if neither player can make a legal move.
- If both players are stuck in a stalemate, updates `messageDiv` with "Draw!".

---

## Reset Function

### 15. `resetGame()`
- Resets all variables to their initial states:
  - Sets `winner` to `null`.
  - Sets `playerTurn` to `null`.
  - Resets all pieces on the board to their starting positions.
- Calls `initializeGame()` to start a new game.
- Updates `messageDiv` to indicate the new game has started.

---

## Event Listeners

- **On clicking a piece**:
   - Calls `highlightPiece()` to select or deselect the piece.
   - If the piece is highlighted, calls `checkHighlightedPiece()` to handle the move.
   
- **On clicking an empty board cell**:
   - Calls `checkHighlightedPiece()` to move a selected piece or display an error if the move is invalid.

- **On clicking the reset button**:
   - Calls `resetGame()` to restart the game.
