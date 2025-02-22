import { MediaFactory } from "../factory/media.js";
import { Modal } from "./modal.js";

export function lightBox(allMedia, media, name) {
  const actualMedia = media.id;
  let index = 0;
  let actualIndex;
  const totalIndex = allMedia.length;

  allMedia.forEach((media) => {
    if (media.id === actualMedia) {
      actualIndex = index;
    } else {
      index++;
    }
  });

  const { MediaType } = MediaFactory();

  const BigPicture = document.createElement("div");
  BigPicture.className = "bigPicture";

  BigPicture.innerHTML = `
    <div>
        <button id="prevPicture" class="arrow" type="button"><img src="../../assets/icons/arrow.svg" alt="Previous image"></button>
        <div id="mainMedia">${MediaType(allMedia[actualIndex], name)}</div>
        <button id="nextPicture" class="arrow" type="button"><img src="../../assets/icons/arrow.svg" alt="Next image"></button>
    </div>
    <p id="mediaTitle">${media.title}</p>
  `;

  Modal(BigPicture, "lightBox");

  const lightBoxContainer = document.querySelector(".bigPicture");
  lightBoxContainer.addEventListener("keydown", (e) => {
    let isArrowLeftPressed = e.key === "ArrowLeft";
    let isArrowRightPressed = e.key === "ArrowRight";

    if (isArrowLeftPressed) {
      prevImage();
    }
    if (isArrowRightPressed) {
      nextImage();
    }
  });

  const prevImage = () => {
    if (actualIndex === 0) {
      actualIndex = totalIndex - 1;
    } else {
      actualIndex--;
    }

    const { MediaType } = MediaFactory();
    const updateMedia = document.getElementById("mainMedia");
    updateMedia.innerHTML = MediaType(allMedia[actualIndex], name);
    const updateTitle = document.getElementById("mediaTitle");
    updateTitle.innerHTML = allMedia[actualIndex].title;
  };

  const nextImage = () => {
    if (actualIndex === totalIndex - 1) {
      actualIndex = 0;
    } else {
      actualIndex++;
    }

    const { MediaType } = MediaFactory();
    const updateMedia = document.getElementById("mainMedia");
    updateMedia.innerHTML = MediaType(allMedia[actualIndex], name);
    const updateTitle = document.getElementById("mediaTitle");
    updateTitle.innerHTML = allMedia[actualIndex].title;
  };

  const prevButton = document.getElementById("prevPicture");
  prevButton.addEventListener("click", prevImage);

  const nextButton = document.getElementById("nextPicture");
  nextButton.addEventListener("click", nextImage);
}
