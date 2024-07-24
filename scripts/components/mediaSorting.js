import { MediaFactory } from "../factory/media.js";
import { lightBox } from "./lightBox.js";
import { PhotographerFactory } from "../factory/photographer.js";

export function MediaSorting(allMedia, name, data) {
  let likedArray = [];

  const SortingDiv = document.createElement("div");
  SortingDiv.id = "sort-container";
  SortingDiv.innerHTML = `
  <p>Trier par</p>
  <div>
    <button class="sort-button" id="sortButton">
      Popularité <span class="arrow"><i class="fa-solid fa-angle-down"></i></span>
    </button>
    <div class="sort-menu" id="sortMenu">
      <button aria-label="Trier par date" class="sort-option">Date</button>
      <button aria-label="Trier par titre" class="sort-option">Titre</button>
    </div>
  </div>
  
  `;

  const sortButton = SortingDiv.lastElementChild.firstElementChild;
  const sortMenu = SortingDiv.lastElementChild.lastElementChild;
  const options = ["Popularité", "Date", "Titre"];

  const updateSortMenu = (selectedOption) => {
    sortMenu.innerHTML = "";
    options.forEach((option) => {
      if (option !== selectedOption) {
        const button = document.createElement("button");
        button.className = "sort-option";
        button.ariaLabel = "trier par" + option
        button.textContent = option;
        button.addEventListener("click", () => {
          sortButton.innerHTML = `${option} <span class="arrow"><i class="fa-solid fa-angle-down"></i></span>`;
          sortMenu.style.display = "none";
          updateSortMenu(option);

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

          updateGallery(option);
        });
        sortMenu.appendChild(button);
      }
    });
  };

  sortButton.addEventListener("click", () => {
    const isMenuVisible = sortMenu.style.display === "block";
    sortMenu.style.display = isMenuVisible ? "none" : "block";
    sortButton.querySelector(".arrow").innerHTML = isMenuVisible
      ? "<i class='fa-solid fa-angle-down'></i>"
      : "<i class='fa-solid  fa-angle-up'></i>";
  });

  document.addEventListener("click", (event) => {
    if (!sortButton.contains(event.target)) {
      sortMenu.style.display = "none";
      sortButton.querySelector(".arrow").innerHTML = "<i class='fa-solid fa-angle-down'></i>";
    }
  });

  updateSortMenu("Popularité");

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
    const mediaSection = document.querySelector(".photograph-main");
    const asideLikesPrice = document.getElementById("asideLikesPrice");
    const { PhotographerLikesAndPrice } = PhotographerFactory(data);

    asideLikesPrice.remove();
    const likesAndPrice = PhotographerLikesAndPrice();
    mediaSection.appendChild(likesAndPrice);
  }

  return SortingDiv;
}
