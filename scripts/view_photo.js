"strict";

const body = document.querySelector("body");
const imageBox = document.querySelector(".image_box");
const imageMask = document.querySelector(".image_mask");
const photoFooter = document.querySelector("#photo_footer");
const closeButton = document.createElement("button");

const toggleImageBox = () => {
  imageBox.style.visibility =
    imageBox.style.visibility == "hidden" ? "visible" : "hidden";
};

const moveToScroll = e => {
  if (!imageBox.classList.contains("magnified")) {
    return;
  }
  const windowW = window.innerWidth;
  const windowH = window.innerHeight;
  imageBox.scroll(
    (e.pageX / window.innerWidth) * (imageBox.scrollWidth - windowW),
    (e.pageY / window.innerHeight) * (imageBox.scrollHeight - windowH)
  );
};

document.onkeydown = e => {
  e = e || window.event;
  if (
    !"key" in e ||
    (e.key !== "Escape" && e.key !== "Esc" && e.keyCode !== 27)
  ) {
    return;
  }

  toggleImageBox();
};

imageBox.addEventListener("click", e => {
  e.stopPropagation();
  toggleImageBox();
});

body.addEventListener("click", e => {
  e.stopPropagation();
  toggleImageBox();
});

imageMask.addEventListener("click", e => {
  e.stopPropagation();
  imageBox.classList.toggle("magnified");
  moveToScroll(e);
});

closeButton.classList.add("close-button");
closeButton.innerText = "×";
body.appendChild(closeButton);
closeButton.addEventListener("click", e => {
  e.preventDefault();
  window.close();
});

document.onmousemove = moveToScroll;
