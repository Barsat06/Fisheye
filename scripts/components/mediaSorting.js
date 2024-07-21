import { MediaFactory } from "../factory/media.js";
import { lightBox } from "./lightBox.js";
import { PhotographerFactory } from "../factory/photographer.js";

export function MediaSorting(allMedia, name, data) {
  let likedArray = [];

  const SortingDiv = document.createElement("div");
  SortingDiv.id = "sorting";
  SortingDiv.innerHTML = `
  <label for="sort-selector">Trier par</label>
  
  <select name="sort" id="sort-selector">
  <option value="popular">Popularité</option>
  <option value="date">Date</option>
  <option value="title">Titre</option>
  </select>
  `;

  SortingDiv.addEventListener("change", (e) => {
    const sortValue = e.target.value;

    /* ************************** Ajout Code ******************************* */
    likedArray = [];

    const allLikedMedia = Array.from(
      document.querySelectorAll(".heart-button")
    );

    allLikedMedia.forEach((media) => {
      if (media.classList.contains("liked")) {
        likedArray.push({ liked: media.id });
      } else {
        likedArray.push({ notLiked: media.id });
      }
    });
    /* ********************************************************************* */

    updateGallery(sortValue);
  });

  function updateGallery(sort) {
    const gallery = document.querySelector("#divAllMedia");
    gallery.innerHTML = "";
    const { MediaDOM, getMediaOrder } = MediaFactory();
    const sortedMedia = getMediaOrder(allMedia, sort);
    sortedMedia.forEach((media) => {
      const searchId = String(media.id);
      const founded = likedArray.find(
        (item) => item.liked === searchId || item.notLiked === searchId
      );
      const likedOrNot = Object.keys(founded)[0]; 
      const PhotographerMedia = MediaDOM(media, name, likedOrNot);

      PhotographerMedia.addEventListener("click", () => {
        lightBox(allMedia, media, name);
      });

      if (!PhotographerMedia) {
        return;
      }

      gallery.appendChild(PhotographerMedia);
    });
    /* ************************** Ajout Code ******************************* */
    const mediaSection = document.querySelector(".photograph-main");
    const asideLikesPrice = document.getElementById("asideLikesPrice");
    const { PhotographerLikesAndPrice } = PhotographerFactory(data);

    asideLikesPrice.remove();
    const likesAndPrice = PhotographerLikesAndPrice();
    mediaSection.appendChild(likesAndPrice);
    /* ********************************************************************* */
  }

  return SortingDiv;
}
