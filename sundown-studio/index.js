const scroll = new LocomotiveScroll({
  el: document.querySelector("#smoothScroll"),
  smooth: true,
});

const fixedImage = document.querySelector("#fixed-image");
const elems = document.querySelectorAll(".elem");

elems.forEach((elem) => {
  elem.addEventListener("mouseenter", () => {
    fixedImage.style.display = "block";

    fixedImage.style.backgroundImage = `url(${elem.dataset.image})`;
    fixedImage.addEventListener("mouseenter", function () {
      fixedImage.style.display = "block";
    });
  });
  elem.addEventListener("mouseleave", () => {
    fixedImage.style.display = "none";
  });
  fixedImage.addEventListener("mouseleave", function () {
    fixedImage.style.display = "none";
  });
});

function page4Swipper() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
  });
}

page4Swipper();
