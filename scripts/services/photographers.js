// Fetch and return all photographers from JSON file
export async function getPhotographers() {
  try {
    const response = await fetch("../../data/photographers.json");
    const photographers = await response.json();

    return {
      // Return an object with the list photographers list
      photographers: photographers.photographers,
    };
  } catch (error) {
    // Log any errors and throw a new error
    console.error("getPhotographers", error);
    throw new Error("invalid JSON");
  }
}
// Fetch and return a photographer by ID from JSON file
export async function getPhotographerByID(id) {
  try {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const photographers = data.photographers;

    // Find and return the photographer by ID
    const photographer = photographers.find(
      (photographer) => photographer.id == id
    );

    return {
      photographer,
    };
  } catch (error) {
    // Log any errors and throw a new error
    console.error("getPhotographersByID", error);
    throw new Error("invalid JSON");
  }
}

// Fetch and return media for a specific photographer by ID
export async function getOnePhotographerMedia(id) {
  try {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const allPhotographersMedia = data.media;

    // Filter and return media photographer ID
    const onePhotographerMedia = allPhotographersMedia.filter(
      (media) => media.photographerId == id
    );

    return onePhotographerMedia;
  } catch (error) {
    // Log any errors and throw a new error
    console.error("getOnePhotographerMedia", error);
    throw new Error("invalid JSON");
  }
}
