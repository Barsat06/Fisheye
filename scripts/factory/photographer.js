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
    const header = document.createElement("header");

    header.innerHTML = `
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

    return header;
  };

  return { getUserCardDOM, getPhotographerHeader };
}
