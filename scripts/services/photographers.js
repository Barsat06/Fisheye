export async function getPhotographers() {
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

export async function getPhotographerByID(id) {
  try {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const photographers = data.photographers;

    const photographer = photographers.find(
      (photographer) => photographer.id == id
    );

    return {
      photographer,
    };
  } catch (error) {
    console.error("getPhotographersByID", error);
    throw new Error("invalid JSON");
  }
}

export async function getOnePhotographerMedia(id) {
  try {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const allPhotographersMedia = data.media;

    const onePhotographerMedia = allPhotographersMedia.filter(
      (media) => media.photographerId == id
    );

    return onePhotographerMedia;
  } catch (error) {
    console.error("getOnePhotographerMedia", error);
    throw new Error("invalid JSON");
  }
}
