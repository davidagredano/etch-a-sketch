function createSquareDiv() {
  const square = document.createElement("div");
  square.classList.add("square");
  return square;
}

function createGrid(height, width) {
  const container = document.querySelector(".container");
  for (let i = 0, totalSquares = height * width; i < totalSquares; i++) {
    const square = createSquareDiv();
    container.appendChild(square);
  }
}

createGrid(16, 16);
