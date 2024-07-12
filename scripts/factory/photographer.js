import { getMediaByPhotographerId } from "../services/photographers.js";
import { MediaFactory } from "./media.js";
import { ContactForm } from "../components/contactForm.js";

// Factory function to create photographer-related DOM elements
export function PhotographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `../../data/images/photos/photographersID/${portrait}`;

  // Create and return a photographer card DOM element
  const PhotographerCard = () => {
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
  const PhotographerBanner = () => {
    const banner = document.createElement("div");
    banner.className = "banner";

    banner.innerHTML = `
        <div>
          <h1>${name}</h1>
          <p class="photograph-banner__location">${city}, ${country}</p>
          <p class="photograph-banner__tagline">${tagline}</p>
        </div>
        
        <button id="contactFormBtn" class="contact_button" alt="Contact Me">
          Contactez-moi
        </button>
        
        <img src="${picture}" alt="${name}">
        `;

        banner.querySelector("#contactFormBtn").addEventListener("click", () => {
          ContactForm(name)
        });

    return banner;
  };

  // Fetch and return photographer's media DOM elements
  const PhotographerGallery = async () => {
    const divAllMedia = document.createElement("div");
    divAllMedia.className = "divAllMedia";

    const media = await getMediaByPhotographerId(id);

    media.forEach((media) => {
      const { MediaDOM } = MediaFactory(media);
      const PhotographerMedia = MediaDOM(name);

      if (!PhotographerMedia) {
        return;
      }

      divAllMedia.appendChild(PhotographerMedia);
    });

    return divAllMedia;
  };

  // Calculate and return likes and price
  const PhotographerLikesAndPrice = async () => {
    const asideLikesPrice = document.createElement("aside");
    const media = await getMediaByPhotographerId(id);
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
    PhotographerCard,
    PhotographerBanner,
    PhotographerGallery,
    PhotographerLikesAndPrice,
  };
}
