const slider = document.querySelector(".items");
let isDown = false;
let scrollLeft;
let startX;

const turnOff = () => {
  isDown = false;
  slider.classList.remove("active");
};

slider.addEventListener("mouseleave", turnOff);

slider.addEventListener("mouseup", turnOff);

slider.addEventListener("mousedown", e => {
  isDown = true;
  slider.classList.add("active");

  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mousemove", e => {
  if (!isDown) return;

  e.preventDefault();
  const currentX = e.pageX - slider.offsetLeft;
  const walk = currentX - startX;
  slider.scrollLeft = scrollLeft - walk;
});
