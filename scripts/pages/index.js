import { photographerFactory } from "../factory/photographer.js";

async function getPhotographers() {
  try {
    const response = await fetch("../../data/photographers.json");
    const photographers = await response.json();

    return {
      photographers: photographers.photographers,
    };
  } catch (error) {
    console.error("getPhotographers", error);
    throw new Error("invalid JSON");
  }
}

function displayPhotographers(photographers) {
  const photographersSection = document.querySelector(".photographer-section");

  photographers.forEach((photographer) => {
    const { getUserCardDOM } = photographerFactory();
    photographersSection.appendChild(getUserCardDOM(photographer));
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
