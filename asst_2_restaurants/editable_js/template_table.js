
/**
 * TABLE VIEW
 * Display data in sortable rows - good for scanning specific information
 */
function showTable(data) {
    
    //changing caps to correct case//
    function toCorrectCase(str) {
            return str
            .toLowerCase()
            .replace(/(^|\s)\S/g, char => char.toUpperCase());
        }
        
    const rows = data.features.map(feature => {
        const property = feature.properties;
        const date = property.inspection_date ? new Date(property.inspection_date).toLocaleDateString() : "N/A";

            return `
                <tr>
                    <td>${toCorrectCase(property.name)}</td>
                    <td>${date}</td>
                    <td>${property.inspection_results || "N/A"}</td>
                    <td>${toCorrectCase(property.owner)}</td>
                </tr>`;
        }).join("");

        return `
            <h2 class="view-title">Inspection Dates and Results</h2>
            <p>When was the restaurant last inspected? Is it safe? If not, feel free to report the listed owner!</p>
            <table border="2" cellpadding="15" class="restaurant-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Inspection Date</th>
                        <th>Inspection Results</th>
                        <th>Owner Name</th>
                    </tr>   
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>`;
}

        

export default showTable;

  // Requirements:
  // - Show data in a table format
  // - Include all important fields
  // - Make it easy to scan and compare
  // - Consider adding sorting functionality
  //   https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/
