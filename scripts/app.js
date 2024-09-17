import board from "./data.js";
console.log(board);

/*......................................Cashed Elements...................................... */
const grid = document.querySelector("#grid");
const squares = [] //this will contain all the divs representing squares
const message = document.querySelector("#message")
const resetButton = document.querySelector("#reset")
let squareId;
console.dir(resetButton);
console.log(squares)

/*......................................Variables............................................ */
let presentBackground;
let turn = "Black"
message.textContent = "Black Plays first"
let winner = "" 
/*......................................Functions............................................ */
// Piking who goes first randomly
const random = () => {
    let player;
   (Math.floor(Math.random() * 2)) === 0 ? player = "player1" : player = "player2"
    return message.textContent = `${player} goes first`
}

const initailize = () => {
    random()
    turn = "Black"
    winner = ""

    board.forEach((row, ridx) => {
        row.forEach((element, colidx) => {
            squareId  =  ridx * 8 + colidx //Getting an id for each square
            const square = document.createElement("div");
            
            square.id = squareId;
            square.classList.add("square");
            
            if (element.color === "light") {
                square.style.backgroundColor = "#F8F1E4";  // Light color
            } else {
                square.style.backgroundColor = "#7E3A0E";  // Dark color     
            }            

            if (element.piece && element.piece.type === "red") {
                square.classList.add("red")
            } else if ( element.piece && element.piece.type === "black") {
                square.classList.add("black")
            } 

            squares.push(square) //Add elements to "squares" array
            grid.appendChild(square); //Add elements to page
        });
    });

}



initailize()




// selected function
const toggleSelect = (id) => {
  if (squares[id].classList.length > 1 && squares[id].classList.contains("selected")) {
        squares[id].classList.remove("selected")
  } else {
    const previouslySelected = document.querySelector('.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }
    squares[id].classList.add("selected")
  }
}




// remove background image
const removeBackgroundImage = (id) => {

}


// add background image
const addBackgroudImage = (id) => {
    squares[id].classList.add('red')
}


// handle click function
const handelClick = (e) => {
    let id = e.target.id
    toggleSelect(id)
    // console.dir(id)
    addBackgroudImage(id)
}

// reset ???? this creates a new board and doesnt refresh the old board
const reset = () => {
    initailize()
}

/*......................................Event Listners....................................... */

// Adding event listner "click" to the squares
squares.forEach((square) => {
    square.addEventListener("click", handelClick)
})

resetButton.addEventListener("click", reset)