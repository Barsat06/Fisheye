// Factory function to create media DOM elements
export function mediaFactory(media) {
  // Generate HTML for media based on type
  const getMediaTypeDOM = (name) => {
    const firstName = name.split(" ")[0];
    let typeDOM;

    if (media.image) {
      typeDOM =
        "<img src=../../data/images/photos/" +
        firstName +
        "/" +
        media.image +
        " alt='" +
        media.title +
        "'>";
    } else if (media.video) {
      typeDOM =
        "<video> <source src=../../data/images/photos/" +
        firstName +
        "/" +
        media.video +
        " type='video/mp4' /> <p>" +
        media.title +
        "</p> </video>";
    } else {
      console.log("Le media n'est pas reconnu (id:" + media.id + ")");
    }

    return typeDOM;
  };
  // Create a DOM element for each media
  const getMediaDOM = (typeDOM) => {
    const articleMedia = document.createElement("article");
    articleMedia.innerHTML = `
    ${typeDOM}
    <div class=media>
      <p class=title>${media.title}</p>
      <p class=likes aria-label="likes">${media.likes}<i class="fa-solid fa-heart"></i></p>
    </div>
    `;

    return articleMedia;
  };

  return { getMediaDOM, getMediaTypeDOM };
}
