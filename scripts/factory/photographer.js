import { getOnePhotographerMedia } from "../services/photographers.js";
import { mediaFactory } from "./media.js";

export function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `../../data/images/photos/photographersID/${portrait}`;

  const getUserCardDOM = () => {
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

  const getPhotographerHeader = () => {
    const banner = document.createElement("div");
    banner.className = "banner";

    banner.innerHTML = `
        <div>
          <h1>${name}</h1>
          <p class="photograph-header__location">${city}, ${country}</p>
          <p class="photograph-header__tagline">${tagline}</p>
        </div>
        
        <button class="contact_button" onclick="displayModal()">
          Contactez-moi
        </button>
        
        <img src="${picture}" alt="${name}">
        `;

    return banner;
  };

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

  return { getUserCardDOM, getPhotographerHeader, getPhotographerMedia };
}
