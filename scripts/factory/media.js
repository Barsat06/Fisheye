export function mediaFactory(media) {
  const getMediaTypeDOM = (name) => {
    const firstName = name.split(" ")[0];
    let typeDOM;

    if (media.image) {
      typeDOM =
        "<img src=../../data/images/photos/" +
        firstName +
        "/" +
        media.image +
        ">";
    } else if (media.video) {
      typeDOM =
        "<video> <source src=../../data/images/photos/" +
        firstName +
        "/" +
        media.video +
        " type='video/mp4' /> </video>";
    } else {
      console.log("Le media n'est pas reconnu (id:" + media.id + ")");
    }

    return typeDOM;
  };

  const getMediaDOM = (typeDOM) => {
    const divMedia = document.createElement("div");
    divMedia.innerHTML = `
    ${typeDOM}
    <div class=media>
      <p class=title>${media.title}</p>
      <p class=likes>${media.likes}<i class="fa-solid fa-heart"></i></p>
    </div>
    `;

    return divMedia;
  };

  return { getMediaDOM, getMediaTypeDOM };
}
