import board from "./data.js";
console.log(board);

/*......................................Cashed Elements...................................... */
const grid = document.querySelector("#grid");
console.dir(grid);

/*......................................Variables............................................ */

/*......................................Functions............................................ */
let id = 1;


board.forEach((row, ridx) => {
    row.forEach((element, colidx) => {
        const square = document.createElement("div");
        const squareId = id++;  // Increment the id globally

        square.id = squareId;
        square.classList.add("square");

        if (element.color === "light") {
            square.style.backgroundColor = "#F8F1E4";  // Light color
        } else {
            square.style.backgroundColor = "#333333";  // Dark color
        }

        square.addEventListener("click", (e) => {
            console.log(squareId);  // Log the unique id when clicked
        });

        grid.appendChild(square);
    });
});


/*......................................Event Listners....................................... */
