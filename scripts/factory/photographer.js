import { getOnePhotographerMedia } from "../services/photographers.js";
import { mediaFactory } from "./media.js";

// Factory function to create photographer-related DOM elements
export function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `../../data/images/photos/photographersID/${portrait}`;

  // Create and return a photographer card DOM element
  const getPhotographerCardDOM = () => {
    const article = document.createElement("article");

    article.innerHTML = `
    <a href="photographer.html?id=${id}"><img src="${picture}" alt="${name}"></a>
    <a href="photographer.html?id=${id}"><h2>${name}</h2></a>
    
    <p class="photographer-section__location">${city}, ${country}</p>
    <p class="photographer-section__tagline">${tagline}</p>
    <p class="photographer-section__price">${price}€/jour</p>
    `;

    return article;
  };

  // Create and return the photographer's banner DOM element
  const getPhotographerBanner = () => {
    const banner = document.createElement("div");
    banner.className = "banner";

    banner.innerHTML = `
        <div>
          <h1>${name}</h1>
          <p class="photograph-banner__location">${city}, ${country}</p>
          <p class="photograph-banner__tagline">${tagline}</p>
        </div>
        
        <button id="openModalBtn" class="contact_button" onclick="displayModal()" alt="Contact Me">
          Contactez-moi
        </button>
        
        <img src="${picture}" alt="${name}">
        `;

    return banner;
  };

  // Fetch and return photographer's media DOM elements
  const getPhotographerMedia = async () => {
    const divAllMedia = document.createElement("div");
    divAllMedia.className = "divAllMedia";

    const media = await getOnePhotographerMedia(id);

    media.forEach((media) => {
      const { getMediaDOM, getMediaTypeDOM } = mediaFactory(media);
      divAllMedia.appendChild(getMediaDOM(getMediaTypeDOM(name)));
    });

    return divAllMedia;
  };

  // Calculate and return likes and price
  const getLikesAndPrice = async () => {
    const asideLikesPrice = document.createElement("aside");
    const media = await getOnePhotographerMedia(id);
    let totalLikes = 0;

    media.forEach((media) => {
      totalLikes = totalLikes + media.likes;
    });

    asideLikesPrice.innerHTML = `
    <p>${totalLikes} <i class="fa-solid fa-heart"></i></p>
    <p>${price}€ / jour</p>
    `;

    return asideLikesPrice;
  };

  return {
    getPhotographerCardDOM,
    getPhotographerBanner,
    getPhotographerMedia,
    getLikesAndPrice,
  };
}
