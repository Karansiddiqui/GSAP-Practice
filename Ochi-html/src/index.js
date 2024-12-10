// window.addEventListener("mousemove", (e) => {
//   const eyes = document.querySelectorAll(".line");
//   const eyeBalls = document.querySelectorAll(".eyeBall");

//   let mouseX = e.clientX;
//   let mouseY = e.clientY;

//   let deltaX = mouseX - window.innerWidth / 2;
//   let deltaY = mouseY - window.innerHeight / 2;

//   let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

//   //   eyes.forEach((eye) => {
//   //     eye.style.transform = `rotate(${angle - 180}deg)`;
//   //   });

//   let eyeBallX = (mouseX * 100) / window.innerWidth - 50;
//   let eyeBallY = (mouseY * 100) / window.innerHeight - 50;

//   eyeBalls.forEach((eyeBall) => {
//     eyeBall.style.transform = ` translate(${eyeBallX}%, ${eyeBallY}%)`;
//     // eyeBall.style.transition = "all 0.1s ease-in-out";
//     // eyeBall.style.transform = `rotate(${angle - 180}deg)`;
//   });
// });
