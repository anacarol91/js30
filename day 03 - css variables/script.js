const inputs = document.querySelectorAll(".controls input");

const events = {
  change: "change",
  mouseover: "mouseover"
};

const handleListener = (input, event) =>
  input.addEventListener(event, handleUpdate);

const handleListeners = event =>
  inputs.forEach(input => handleListener(input, event));

function handleUpdate() {
  const suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}

Object.values(events).map(handleListeners);
