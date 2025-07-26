const game = document.querySelector(".game");
const gameBoxes = document.querySelectorAll(".game_box");

const resBtn = document.createElement("button");
resBtn.textContent = "NEW GAME";
resBtn.classList.add("reset-btn");
game.append(resBtn);

const win_variants = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let count = 0;
let active = true;

const start_shadow =
  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px";

gameBoxes.forEach((box) => {
  box.style.boxShadow = start_shadow;
});

function checkWinner() {
  for (let variant of win_variants) {
    let [a, b, c] = variant;
    if (
      gameBoxes[a].textContent &&
      gameBoxes[a].textContent === gameBoxes[b].textContent &&
      gameBoxes[a].textContent === gameBoxes[c].textContent
    ) {
      win_shadow([gameBoxes[a], gameBoxes[b], gameBoxes[c]]);
      active = false;
      return;
    }
  }

  if (count === 9) {
    draw();
    active = false;
  }
}

function win_shadow(boxes) {
  boxes.forEach((box) => {
    box.style.boxShadow = "0 0 20px DarkRed";
  });
}

function draw() {
  gameBoxes.forEach((box) => {
    if (!box.style.boxShadow.includes("DarkRed")) {
      box.style.boxShadow = "0 0 20px GoldenRod";
    }
  });
}

gameBoxes.forEach((box) => {
  box.addEventListener("click", function () {
    if (box.textContent === "" && active) {
      count++;
      box.textContent = count % 2 !== 0 ? "X" : "O";
      checkWinner();
    }
  });
});

resBtn.addEventListener("click", function () {
  gameBoxes.forEach((box) => {
    box.textContent = "";
    box.style.boxShadow = start_shadow;
  });
  count = 0;
  active = true;
});
