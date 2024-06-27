import { photographerFactory } from "../factory/photographer.js";
import { getPhotographerByID } from "../services/photographers.js";

function displayPhotographerHeader(photograph) {
  const photographHeader = document.querySelector(".photograph-header");
  const { getPhotographerHeader } = photographerFactory(photograph);

  photographHeader.appendChild(getPhotographerHeader());
}

async function displayPhotographerMedia(photograph) {
  const mediaSection = document.querySelector(".photograph-main");
  const { getPhotographerMedia, getLikesAndPrice } =
    photographerFactory(photograph);
  const allMedia = await getPhotographerMedia();
  const likesAndPrice = await getLikesAndPrice();

  mediaSection.appendChild(allMedia);
  mediaSection.appendChild(likesAndPrice);
}

async function init() {
  try {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const { photographer } = await getPhotographerByID(id);
    displayPhotographerHeader(photographer);
    displayPhotographerMedia(photographer);
  } catch (error) {
    throw new Error(error);
  }
}

init();
