import { photographerFactory } from "../factory/photographer.js";
import { getPhotographerByID } from "../services/photographers.js";
import { getContactForm } from "../services/contactForm.js";

// Display photographer's banner section
function displayPhotographerBanner(photograph) {
  const photographBanner = document.querySelector(".photograph-banner");
  const { getPhotographerBanner } = photographerFactory(photograph);

  photographBanner.appendChild(getPhotographerBanner());
}

// Display photographer's media and likes/price
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
    // Get photographer ID from query parameters
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    // Fetch photographer data by ID
    const { photographer } = await getPhotographerByID(id);

    // Display photographer's banner and media
    displayPhotographerBanner(photographer);
    displayPhotographerMedia(photographer);

    // Set up the contact form
    getContactForm(photographer.name);
  } catch (error) {
    // Log errors to the console
    console.error(error);
  }
}

init();
