let params = new URLSearchParams(location.search);
let id = params.get("id");

async function monTets() {
  const response = await fetch("../../data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;
  const photographer = photographers.find(
    (photographer) => photographer.id == id
  );
  alert(photographer.name);
}

monTets();
