export function SortingDOM() {
  const SortingDiv = document.createElement("div");
  SortingDiv.id = "sorting";
  SortingDiv.innerHTML = `
    <label for="sort-selector">Trier par</label>

    <select name="sort" id="sort-selector">
        <option value="popular">Popularité</option>
        <option value="date">Date</option>
        <option value="title">Titre</option>
    </select>
    `;
    
  return SortingDiv;
}
