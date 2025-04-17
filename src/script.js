//from ep(https://everyday-practice.com/)
function resize(e) {
  if (iframes) {
    disableIframe();
  }

  const containerRect = container.getBoundingClientRect();
  let x;
  if (e.type === "touchmove") {
    x = e.touches[0].pageX - containerRect.left;
  } else {
    x = e.pageX - containerRect.left;
  }

  const containerWidth = container.offsetWidth;
  const maxLeftWidth = 85;
  const minLeftWidth = 15;
  const maxRightWidth = 85;
  const minRightWidth = 15;

  // Check if the resizeTrigger element is visible and has non-zero width and height
  if (
    resizeTrigger.offsetWidth > 0 &&
    resizeTrigger.offsetHeight > 0 &&
    resizeTrigger.offsetParent !== null
  ) {
    let leftWidth = Math.min(
      Math.max(minLeftWidth, (x / containerWidth) * 100),
      maxLeftWidth
    );
    let rightWidth =
      100 - leftWidth - (resizeTrigger.offsetWidth / containerWidth) * 100;

    // Enforce min and max width for right-side element
    if (rightWidth < minRightWidth) {
      rightWidth = minRightWidth;
      leftWidth =
        100 - rightWidth - (resizeTrigger.offsetWidth / containerWidth) * 100;
    } else if (rightWidth > maxRightWidth) {
      rightWidth = maxRightWidth;
      leftWidth =
        100 - rightWidth - (resizeTrigger.offsetWidth / containerWidth) * 100;
    }

    // Set the width of the left and right side elements using percentage values
    leftSide.style.width = `${leftWidth}%`;
    rightSide.style.width = `${rightWidth}%`;

    // Adjust the container width to match the new window width in pixels
    container.style.width = "100%";
    container.style.width = `${container.offsetWidth}px`;
  }

  if (document.documentElement.clientWidth <= 1200) {
    container.style.width = "100%";
  }
}
