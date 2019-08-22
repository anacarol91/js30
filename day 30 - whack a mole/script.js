const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let score = 0;
let lastHole;
let timeUp;

const randomTime = (min, max) => Math.round(Math.random() * (max - min) + min);

const randomHole = holes => {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  hole === lastHole && randHole(holes);

  lasthole = hole;
  return hole;
};

const peep = () => {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    !timeUp && peep();
  }, time);
};

const startGame = () => {
  scoreBoard.textContent = 0;
  score = 0;
  timeUp = false;

  peep();
  setTimeout(() => (timeUp = true), 10000);
};

function bonk(e) {
  if (!e.isTrusted) return;

  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener("click", bonk));
