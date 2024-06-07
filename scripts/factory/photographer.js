export function photographerFactory() {
  const getUserCardDOM = (data) => {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `../../data/images/photos/photographersID/${portrait}`;

    const article = document.createElement("article");

    article.innerHTML = `
    <a href="photographer.html?id=${id}"><img src="${picture}" alt="${name}"></a>
    <a href=""><h2>${name}</h2></a>
    
    <p class="photographer-section__location">${city}, ${country}</p>
    <p class="photographer-section__tagline">${tagline}</p>
    <p class="photographer-section__price">${price}€/jour</p>
    `;

    return article;
  };

  return { getUserCardDOM };
}
