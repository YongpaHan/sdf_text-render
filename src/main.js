import "modern-css-reset";
import "./style.css";
import { sketch } from "./sketch.js";

window.addEventListener("DOMContentLoaded", () => {
  containerResize();
});

console.log(sketch);

function containerResize() {
  const container = document.getElementById("main"),
    leftBox = document.getElementById("controler"),
    resizeHandle = document.getElementById("resize-handle"),
    rightBox = document.getElementById("p5canvas");

  function handleMove(e) {
    e.preventDefault();

    resizeHandle.classList.add("active");
    document.body.style.cursor = "col-resize";

    if (e.type === "touchstart") {
      document.addEventListener("touchmove", resize);
      document.addEventListener("touchend", stopResize);
    } else {
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResize);
    }
  }

  function resize(e) {
    const containerRect = container.getBoundingClientRect();
    const x =
      e.type === "touchmove"
        ? e.touches[0].pageX - containerRect.left
        : e.pageX - containerRect.left;
    const containerWidth = container.offsetWidth;
    const maxLeftWidth = 80;
    const minLeftWidth = 20;
    const maxRightWidth = 80;
    const minRightWidth = 20;

    let leftWidth = Math.min(
      maxLeftWidth,
      Math.max(minLeftWidth, (x / containerWidth) * 100)
    );
    let rightWidth =
      100 - leftWidth - (resizeHandle.offsetWidth / containerWidth) * 100;

    if (rightWidth < minRightWidth) {
      rightWidth = minRightWidth;
      leftWidth =
        100 - rightWidth - (resizeHandle.offsetWidth / containerWidth) * 100;
    } else if (rightWidth > maxRightWidth) {
      rightWidth = maxRightWidth;
      leftWidth =
        100 - rightWidth - (resizeHandle.offsetWidth / containerWidth) * 100;
    }

    leftBox.style.width = `${leftWidth}%`;
    rightBox.style.width = `${rightWidth}%`;

    container.style.width = "100%";
    container.style.width = `${container.offsetWidth}px`;

    if (sketch) {
      const newSize = rightBox.getBoundingClientRect();
      sketch.resizeCanvas(newSize.width, newSize.height);
    }
  }

  function stopResize(e) {
    resizeHandle.classList.remove("active");
    document.body.style.cursor = "";

    if (e.type === "touchend") {
      document.removeEventListener("touchmove", resize);
      document.removeEventListener("touchend", stopResize);
    } else {
      document.removeEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResize);
    }
  }

  resizeHandle.addEventListener("mousedown", handleMove);
  resizeHandle.addEventListener("touchstart", handleMove);
  window.addEventListener("resize", (e) => {
    resize(e);
  });
}
