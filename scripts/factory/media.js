// Factory function to create media DOM elements
export function MediaFactory() {
  // Generate HTML for media based on type
  const MediaType = (media, name) => {
    const firstName = name.split(" ")[0];
    let typeDOM;

    if (media.image) {
      typeDOM = `<img src=../../data/images/photos/${firstName}/${media.image} alt="${media.title}" >`;
    } else if (media.video) {
      typeDOM = `<video controls> <source src=../../data/images/photos/${firstName}/${media.video} type='video/mp4'/> <p>${media.title}</p> </video>`;
    } else {
      console.log("Le media n'est pas reconnu (id:" + media.id + ")");
    }

    return typeDOM;
  };
  // Create a DOM element for each media
  const MediaDOM = (media, name, likedOrNot) => {
    const typeDOM = MediaType(media, name);
    if (!typeDOM) {
      return null;
    }

    const articleMedia = document.createElement("article");
    articleMedia.innerHTML = `
    <button aria-label="Afficher en grand">${typeDOM}</button>
    
    <div class=media>
      <p class=title>${media.title}</p>
      <button id="${media.id}" class="heart-button">
        <p class=likes aria-label="likes">${media.likes}<i class="fa-regular fa-heart"></i></p>
      </button>
    </div>
    `;

    const HeartButton = articleMedia.querySelector(".heart-button");
    let actualNbOfLikes = media.likes;
    
    const addLike = () => {
      actualNbOfLikes++;
      HeartButton.innerHTML = `<p class="likes" aria-label="likes">${actualNbOfLikes}<i class="fa-solid fa-heart"></i></p>`;
      HeartButton.classList.add("liked");
    };

    const removeLike = () => {
      actualNbOfLikes--;
      HeartButton.innerHTML = `<p class="likes" aria-label="likes">${actualNbOfLikes}<i class="fa-regular fa-heart"></i></p>`;
      HeartButton.classList.remove("liked");
    };

    if (likedOrNot === "liked") {
      addLike();
    }
    if (likedOrNot === "not liked") {
      removeLike();
    }
    
    HeartButton.addEventListener("click", (e) => {
      e.stopPropagation();

      if (actualNbOfLikes === media.likes) {
        addLike();
      } else {
        removeLike();
      }
    });

    return articleMedia;
  };

  const getMediaOrder = (allMedia, sort) => {
    if (sort === undefined || sort === "popular") {
      return allMedia.sort((a, b) => b.likes - a.likes);
    }
    if (sort === "date") {
      return allMedia.sort((a, b) => b.date.localeCompare(a.date));
    }
    if (sort === "title") {
      return allMedia.sort((a, b) => a.title.localeCompare(b.title));
    }
  };

  return { MediaDOM, MediaType, getMediaOrder };
}
