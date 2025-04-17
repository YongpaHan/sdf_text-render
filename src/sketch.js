import p5 from "p5";

export const sketch = new p5((p) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(220);
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(p.mouseX, p.mouseY, 200);
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };
});
