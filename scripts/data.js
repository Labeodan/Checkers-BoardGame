const board = [
    // Row 0 (First row, top of the board)
    [
      { color: 'light' }, 
      { color: 'dark', piece: { id: 1, type: 'black', team: 'black', startingPosition: '0,1', presentPosition: '0,1', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 2, type: 'black', team: 'black', startingPosition: '0,3', presentPosition: '0,3', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 3, type: 'black', team: 'black', startingPosition: '0,5', presentPosition: '0,5', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 4, type: 'black', team: 'black', startingPosition: '0,7', presentPosition: '0,7', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
    ],
  
    // Row 1
    [
      { color: 'dark', piece: { id: 5, type: 'black', team: 'black', startingPosition: '1,0', presentPosition: '1,0', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 6, type: 'black', team: 'black', startingPosition: '1,2', presentPosition: '1,2', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 7, type: 'black', team: 'black', startingPosition: '1,4', presentPosition: '1,4', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 8, type: 'black', team: 'black', startingPosition: '1,6', presentPosition: '1,6', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
    ],
  
    // Row 2
    [
      { color: 'light' }, 
      { color: 'dark', piece: { id: 9, type: 'black', team: 'black', startingPosition: '2,1', presentPosition: '2,1', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 10, type: 'black', team: 'black', startingPosition: '2,3', presentPosition: '2,3', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 11, type: 'black', team: 'black', startingPosition: '2,5', presentPosition: '2,5', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 12, type: 'black', team: 'black', startingPosition: '2,7', presentPosition: '2,7', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
    ],
  
    // Row 3 (empty row)
    [
      { color: 'dark' }, 
      { color: 'light' }, 
      { color: 'dark' }, 
      { color: 'light' }, 
      { color: 'dark' }, 
      { color: 'light' }, 
      { color: 'dark' }, 
      { color: 'light' },
    ],
  
    // Row 4 (empty row)
    [
      { color: 'light' }, 
      { color: 'dark' }, 
      { color: 'light' }, 
      { color: 'dark' }, 
      { color: 'light' }, 
      { color: 'dark' }, 
      { color: 'light' }, 
      { color: 'dark' }, 
    ],
  
    // Row 5
    [
      { color: 'dark', piece: { id: 13, type: 'red', team: 'red', startingPosition: '5,0', presentPosition: '5,0', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 14, type: 'red', team: 'red', startingPosition: '5,2', presentPosition: '5,2', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 15, type: 'red', team: 'red', startingPosition: '5,4', presentPosition: '5,4', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 16, type: 'red', team: 'red', startingPosition: '5,6', presentPosition: '5,6', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
    ],
  
    // Row 6
    [
      { color: 'light' }, 
      { color: 'dark', piece: { id: 17, type: 'red', team: 'red', startingPosition: '6,1', presentPosition: '6,1', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 18, type: 'red', team: 'red', startingPosition: '6,3', presentPosition: '6,3', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 19, type: 'red', team: 'red', startingPosition: '6,5', presentPosition: '6,5', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 20, type: 'red', team: 'red', startingPosition: '6,7', presentPosition: '6,7', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
    ],
  
    // Row 7
    [
      { color: 'dark', piece: { id: 21, type: 'red', team: 'red', startingPosition: '7,0', presentPosition: '7,0', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 22, type: 'red', team: 'red', startingPosition: '7,2', presentPosition: '7,2', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 23, type: 'red', team: 'red', startingPosition: '7,4', presentPosition: '7,4', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
      { color: 'dark', piece: { id: 24, type: 'red', team: 'red', startingPosition: '7,6', presentPosition: '7,6', isCaptured: false, isSelected: false, isKing: false, availableMoves: [], canCapture: false, moveHistory: [], isMoving: false, hasDoubleJump: false, isHighlighted: false }},
      { color: 'light' }, 
    ]
  ];
  
  export default board
