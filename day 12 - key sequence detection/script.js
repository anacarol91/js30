const pressed = [];
const secretCode = "wesbros";

window.addEventListener("keyup", ({ key }) => {
  pressed.push(key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);

  pressed.join("").includes(secretCode) && cornify_add();
});
