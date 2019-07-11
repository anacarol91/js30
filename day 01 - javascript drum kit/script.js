const keys = document.querySelectorAll(".key");

function playSound({ keyCode }) {
  const dataKey = `data-key="${keyCode}"`;
  const audio = document.querySelector(`audio[${dataKey}]`);
  const key = document.querySelector(`.key[${dataKey}]`);

  if (!audio) return;

  audio.currentTime = 0;
  audio.play();

  key.classList.add("playing");
}

function removeTransition({ propertyName }) {
  if (propertyName !== "transform") return;

  this.classList.remove("playing");
}

const handleTransitionListener = key =>
  key.addEventListener("transitionend", removeTransition);

window.addEventListener("keydown", playSound);
keys.forEach(handleTransitionListener);
