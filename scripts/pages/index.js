import { photographerFactory } from "../factory/photographer.js";
import { getPhotographers } from "../services/photographers.js";

function displayPhotographers(photographers) {
  const photographersSection = document.querySelector(".photographer-section");

  photographers.forEach((photographer) => {
    const { getUserCardDOM } = photographerFactory(photographer);
    photographersSection.appendChild(getUserCardDOM());
  });
}

async function init() {
  try {
    const { photographers } = await getPhotographers();
    displayPhotographers(photographers);
  } catch (error) {
    throw new Error(error);
  }
}

init();
