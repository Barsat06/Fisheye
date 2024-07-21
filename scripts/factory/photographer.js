import { getMediaByPhotographerId } from "../services/photographers.js";
import { MediaFactory } from "./media.js";
import { ContactFormModal } from "../components/contactForm.js";
import { lightBox } from "../components/lightBox.js";
import { MediaSorting } from "../components/mediaSorting.js";

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
      ContactFormModal(name);
    });

    return banner;
  };

  // Fetch and return photographer's media DOM elements
  const PhotographerGallery = async () => {
    const MainContent = document.createElement("div");
    const divAllMedia = document.createElement("div");
    divAllMedia.id = "divAllMedia";

    const allMedia = await getMediaByPhotographerId(id);
    const { getMediaOrder } = MediaFactory();

    const createGallery = () => {
      divAllMedia.innerHTML = ``;

      getMediaOrder(allMedia, "popular").forEach((media) => {
        const { MediaDOM } = MediaFactory(media);
        const PhotographerMedia = MediaDOM(media, name);

        PhotographerMedia.addEventListener("click", () => {
          lightBox(allMedia, media, name);
        });

        if (!PhotographerMedia) {
          return;
        }

        divAllMedia.appendChild(PhotographerMedia);
      });
    };

    createGallery();

    const SortSelector = MediaSorting(allMedia, name, data);
    MainContent.appendChild(SortSelector);
    MainContent.appendChild(divAllMedia);

    return MainContent;
  };

  // Calculate and return likes and price
  const PhotographerLikesAndPrice = () => {
    const asideLikesPrice = document.createElement("aside");
    asideLikesPrice.id = "asideLikesPrice";

    const UpdateTotalLikesPrice = () => {
      const media = document.querySelectorAll(".likes");
      let totalLikes = 0;

      media.forEach((media) => {
        totalLikes = totalLikes + parseInt(media.innerText);
      });

      asideLikesPrice.innerHTML = `
      <p>${totalLikes} <i class="fa-solid fa-heart"></i></p>
      <p>${price}€ / jour</p>
      `;
    };

    UpdateTotalLikesPrice();

    const LikeButton = document.querySelectorAll(".heart-button");
    LikeButton.forEach((button) => {
      button.addEventListener("click", () => {
        UpdateTotalLikesPrice();
      });
    });

    return asideLikesPrice;
  };

  return {
    PhotographerCard,
    PhotographerBanner,
    PhotographerGallery,
    PhotographerLikesAndPrice,
  };
}
