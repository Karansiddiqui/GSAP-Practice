document.addEventListener("mousemove", (event) => {
  const eyes = document.querySelectorAll(".eyes-svg__group");
  const bounds = document.querySelector(".h").getBoundingClientRect();
  const mouseX = event.clientX - bounds.left; // Mouse X relative to the section
  const mouseY = event.clientY - bounds.top; // Mouse Y relative to the section

  eyes.forEach((eye) => {
    const eyeBounds = eye.getBoundingClientRect();
    const eyeCenterX = eyeBounds.left + eyeBounds.width / 2;
    const eyeCenterY = eyeBounds.top + eyeBounds.height / 2;

    const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);

    // console.log(angle * (180 / Math.PI));

    const distance = Math.min(
      30,
      Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY)
    ); // Limit movement radius

    const offsetX = distance * Math.cos(angle);
    const offsetY = distance * Math.sin(angle);

    // Move the entire eye group
    eye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    eye.style.transition = "all 0.35s cubic-bezier(.3,.86,.36,.95)";

    // Move the inner circle within the group
    const outerRadius = 50;

    // Move the inner circle to the edge of the outer circle
    const innerOffsetX = outerRadius * Math.cos(angle);
    const innerOffsetY = outerRadius * Math.sin(angle);

    const innerCircle = eye.querySelector("circle:nth-child(2)"); // Target the small circle
    innerCircle.setAttribute("cx", 100 + innerOffsetX); // Adjust the center X
    innerCircle.setAttribute("cy", 100 + innerOffsetY); // Adjust the center Y
  });
});
