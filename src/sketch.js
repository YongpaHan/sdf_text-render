import p5 from "p5";

const parrentDiv = document.getElementById("p5canvas");
const pSize = parrentDiv.getBoundingClientRect();
let sketch;

new p5((p) => {
  sketch = p;
  p.setup = () => {
    p.createCanvas(pSize.width, pSize.height);
    p.background(220);
  };

  p.draw = () => {
    p.background(255);
    p.ellipse(p.mouseX, p.mouseY, 20);
  };

  p.windowResized = () => {
    const newSize = parrentDiv.getBoundingClientRect();
    p.resizeCanvas(newSize.width, newSize.height);
  };
}, parrentDiv);

export { sketch };
