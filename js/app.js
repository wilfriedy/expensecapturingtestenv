let hero = document.querySelector(".hero-section");
let foot = document.querySelector(".foot-section");
let firstHalf = document.querySelector(".hero-closed");
let secondHalf = document.querySelector(".hero-open");
let thirdHalf = document.querySelector(".footer-open");
let fourthHalf = document.querySelector(".footer-closed");
let modalLoader = document.querySelector(".modal-loader");
let swipePosStart = 0;
let swipePosEnd = 0;
let slideEls = [...document.querySelectorAll(".swt-itm")];
let cam1 = document.querySelector(".cam1");
let cam2 = document.querySelector(".cam2");
let total_display = document.querySelector(".total_value");
let addHeaderBtn = document.querySelector(".fa-plus");
let multiSelect = document.querySelector(".multi-input");
// ++++++ what happens when the user tries to upload
let count = -1;
const openCamToform = (e) => {
  modalLoader.style.display = "flex";
  setTimeout(() => {
    modalLoader.style.display = "none";
    count--;
    slideNex(count);
  }, 400);
};
cam1.addEventListener("change", openCamToform);
cam2.addEventListener("change", openCamToform);
let currencyFormat = new Intl.NumberFormat("en-UK", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
});
total_display.innerText = currencyFormat.format(0);

// ========== navigation between pages
let imgUrl = "";
function slideNex(count) {
  slideEls.forEach((el, pos) => {
    el.style.transform = `translateX(${100 * (pos + count)}%)`;
  });
}
slideNex(count);

hero.addEventListener("touchstart", (e) => {
  swipePosStart = e.touches[0].clientY;
});

hero.addEventListener("touchmove", (e) => {
  swipePosEnd = e.touches[0].clientY;
});

hero.addEventListener("touchend", (e) => {
  if (e.target.closest(".capture-itm")) {
  } else {
    if (swipePosStart > swipePosEnd) {
      hero.style.height = "28vh";
      foot.style.height = "72vh";
      hideShow(firstHalf, secondHalf);
      hideShow(fourthHalf, thirdHalf);
    }
  }

  if (e.target.closest(".fa-solid")) {
  } else {
    if (swipePosEnd > swipePosStart) {
      hero.style.height = "80vh";
      foot.style.height = "20vh";

      hideShow(secondHalf, firstHalf);
      hideShow(thirdHalf, fourthHalf);
    }
  }
});

function hideShow(el1, el2) {
  el1.classList.add("hide");
  el2.classList.remove("hide");
}

// ++++++++++++++++++++++++++++++++++  next page add ++++++++++++++++++++
