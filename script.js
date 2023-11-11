// Settings
const DEFAULTSQUARESPERSIDE = 32;

main();

function main() {
  createGrid();
  setSquaresByPromptBtn();
  setBlackModeBtn();
  setRainbowModeBtn();
  setFillRainbowBtn();
}

function createGrid(squaresPerSide = DEFAULTSQUARESPERSIDE) {
  const container = document.querySelector(".container");

  const gridExists = Boolean(container.children.length);
  const existingGrid = container.firstElementChild;
  if (gridExists) container.removeChild(existingGrid);

  const grid = document.createElement("div");
  grid.className = "grid";
  grid.addEventListener("mouseover", paintBlack);

  container.appendChild(grid);

  for (let i = 0, totalSquares = squaresPerSide ** 2; i < totalSquares; i++) {
    const square = createSquareDiv(squaresPerSide);
    grid.appendChild(square);
  }

  function createSquareDiv(squaresPerSide) {
    const square = document.createElement("div");
    square.className = "square";
    setSquareSize(squaresPerSide);
    return square;

    function setSquareSize(squaresPerSide) {
      var cssRules = document.styleSheets[0].cssRules;
      for (i = 0; i < cssRules.length; i++) {
        if (cssRules[i].selectorText == ".square") {
          targetrule = cssRules[i];
          break;
        }
      }
      const newSquareSize = 640 / squaresPerSide;
      targetrule.style.height = `${newSquareSize}px`;
      targetrule.style.width = `${newSquareSize}px`;
    }
  }
}

function setSquaresByPromptBtn() {
  const inputSquaresBtn = document.querySelector(".input-squares-btn");

  function getSquaresByPrompt() {
    const answer = prompt(
      "Set number of squares per side: (16-64)",
      DEFAULTSQUARESPERSIDE
    );
    if (!Number.isNaN(answer) && answer >= 16 && answer <= 64) {
      return answer;
    }
    return undefined;
  }

  inputSquaresBtn.addEventListener("click", () =>
    createGrid(getSquaresByPrompt())
  );
}

function setRainbowModeBtn() {
  const rainbowBtn = document.querySelector(".rainbow-mode-btn");

  const enableRainbowMode = () => {
    const gridElement = document.querySelector(".grid");
    gridElement.removeEventListener("mouseover", paintBlack);
    gridElement.addEventListener("mouseover", paintRainbow);
  };

  rainbowBtn.addEventListener("click", enableRainbowMode);
}

function setBlackModeBtn() {
  const blackBtn = document.querySelector(".black-mode-btn");

  function enableBlackMode() {
    const gridElement = document.querySelector(".grid");
    gridElement.removeEventListener("mouseover", paintRainbow);
    gridElement.addEventListener("mouseover", paintBlack);
  }

  blackBtn.addEventListener("click", enableBlackMode);
}

function setFillRainbowBtn() {
  const fillRainbowBtn = document.querySelector(".fill-rainbow-btn");

  function fillRainbow() {
    const gridElement = document.querySelector(".grid");
    const gridChildren = gridElement.children;

    for (let i = 0; i < gridChildren.length; i++) {
      const child = gridChildren[i];
      child.style.backgroundColor = getRandomRGB();
    }
  }

  fillRainbowBtn.addEventListener("click", fillRainbow);
}

function paintBlack(event) {
  event.target.style.backgroundColor = "#222";
}

function paintRainbow(event) {
  event.target.style.backgroundColor = getRandomRGB();
}

function getRandomRGB() {
  const getRandomRgbValue = () => Math.floor(Math.random() * 256);
  const r = getRandomRgbValue();
  const g = getRandomRgbValue();
  const b = getRandomRgbValue();
  return `rgb(${r}, ${g}, ${b})`;
}
