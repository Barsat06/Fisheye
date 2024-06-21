import { photographerFactory } from "../factory/photographer.js";
import { getPhotographerByID } from "../services/photographers.js";

function displayPhotographerHeader(photograph) {
  const photographHeader = document.querySelector(".photograph-header");
  const { getPhotographerHeader } = photographerFactory(photograph);

  photographHeader.appendChild(getPhotographerHeader());
}

async function init() {
  try {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const { photographer } = await getPhotographerByID(id);
    displayPhotographerHeader(photographer);
  } catch (error) {
    throw new Error(error);
  }
}

init();
