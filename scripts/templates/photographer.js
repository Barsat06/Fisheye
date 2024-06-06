function photographerTemplate(data) {
  const { name, portrait } = data;
  const picture = `data/images/photos/photographersID/${portrait}`;

  const getUserCardDOM = () => {
    const article = document.createElement("article");

    article.innerHTML = `
    <img src= "${picture}" alt= "Photo de ${name}">
    <h2>${name}</h2>
    `;

    return article;
  };

  return { getUserCardDOM };
}
