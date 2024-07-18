import { PhotographerFactory } from "../factory/photographer.js";
import { getPhotographerByID } from "../services/photographers.js";

// Display photographer's banner section
function displayPhotographerBanner(photograph) {
  const photographBanner = document.querySelector(".photograph-banner");
  const { PhotographerBanner } = PhotographerFactory(photograph);

  photographBanner.appendChild(PhotographerBanner());
}

// Display photographer's media and likes/price
async function displayPhotographerMedia(photograph) {
  const mediaSection = document.querySelector(".photograph-main");
  const { PhotographerGallery, PhotographerLikesAndPrice } =
    PhotographerFactory(photograph);
  const MainContent = await PhotographerGallery();
  mediaSection.appendChild(MainContent);

  const likesAndPrice = await PhotographerLikesAndPrice();
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
  } catch (error) {
    // Log errors to the console
    console.error(error);
    throw new Error("test");
  }
}

init();
