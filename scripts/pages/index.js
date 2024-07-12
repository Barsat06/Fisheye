import { PhotographerFactory } from "../factory/photographer.js";
import { getPhotographers } from "../services/photographers.js";

// Display photographer cards in the section
function displayPhotographers(photographers) {
  const photographersSection = document.querySelector(".photographer-section");

  photographers.forEach((photographer) => {
    const { PhotographerCard } = PhotographerFactory(photographer);
    photographersSection.appendChild(PhotographerCard());
  });
}

async function init() {
  try {
    // Get photographers data
    const { photographers } = await getPhotographers();

    // Display photographers on the page
    displayPhotographers(photographers);
  } catch (error) {
    // Log errors to the console
    console.error(error);
  }
}

init();
