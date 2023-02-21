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
let previewImg = document.querySelector(".place-holders-img");
let imgPrevBox = document.querySelector(".img-prev");
// ++++++ what happens when the user tries to upload
let count = 0;
let uploadableArr = [];
function getImageUploadablePath(filetype) {
  const file = filetype.target.files[0];
  const uploadablePath = URL.createObjectURL(file);
  return uploadablePath;
}
const openCamToform = (e) => {
  modalLoader.style.display = "flex";
  setTimeout(() => {
    modalLoader.style.display = "none";
    count--;
    slideNex(count);
  }, 400);
  // process image to upload
  let uploadablePath1 = getImageUploadablePath(e);
  uploadableArr.push(uploadablePath1);
  previewImg.src = uploadablePath1;
};

// allow users to add more images
let addNewImg = document.querySelector(".add-new");
const limit = 2;
addNewImg.addEventListener("change", (e) => {
  // new image template
  if (uploadableArr.length == limit) return;
  let uploadablePath2 = getImageUploadablePath(e);
  let newImgPrevTem = ` <div class="place-holders">
              <img class="place-holders-img" src="${uploadablePath2}" alt="" />
            </div>`;
  uploadableArr.push(uploadablePath2);
  imgPrevBox.insertAdjacentHTML("afterbegin", newImgPrevTem);
  console.log("fd");
});

// cam functions
cam1.addEventListener("change", openCamToform);
cam2.addEventListener("change", openCamToform);

//
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
      hero.style.height = "85vh";
      foot.style.height = "15vh";

      hideShow(secondHalf, firstHalf);
      hideShow(thirdHalf, fourthHalf);
    }
  }
});

function hideShow(el1, el2) {
  el1.classList.add("hide");
  el2.classList.remove("hide");
}
