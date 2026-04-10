/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories - good for understanding relationships and patterns
 */
function groupByCity(data) {
  return data.features.reduce((groups, feature) => {
    const props = feature.properties;
    const city = props.city || "Unknown";

    if (!groups[city]) {
      groups[city] = [];
    }

    groups[city].push(props);

    return groups;
  }, {});
}

function showCategories(data) {
    
    //changing caps to correct case//
    function toCorrectCase(str) {
      return str
      .toLowerCase()
      .replace(/(^|\s)\S/g, char => char.toUpperCase());
}
   const grouping = groupByCity(data);

   const html = Object.entries(grouping)
      .sort(([cityA], [cityB]) => cityA.localeCompare(cityB))  
      .map(([city, items]) => {
        return `
          <tr class="category-header">
            <td colspan="3"><strong>${toCorrectCase(city)} (${items.length})</strong></td>
          </tr>
          ${items.map((item) => `
                <tr class="category-items">
                  <td class="category-item">${toCorrectCase(item.name)}</td>
                  <td class="category-items">${item.inspection_type}</td>
                </tr>
              `
            )
            .join("")}
        `;
      })
      .join("");

      return `
        <h2 class="view-title">How good are restaurant inspections in your city?</h2>
        <table border="2" cellpadding="10" class="category-section">
          <thead class="category-header">
          </thead>
          <tbody>
            ${html}
          </tbody>
        </table>
      `;
};
     
  /* html */



export default showCategories;

// Requirements:
  // - Group data by a meaningful category (cuisine, neighborhood, price, etc.)
  // - Show items within each group
  // - Make relationships between groups clear
  // - Consider showing group statistics
