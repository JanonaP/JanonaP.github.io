
/**
 * EXTERNAL LIBRARY VIEW
 * Pick an external library and pipe your data to it.
 */

function showExternal(data) {
    const counts = data.features.reduce((acc, feature) => {
        const result = feature.properties.inspection_results;
        acc[result] = (acc[result] || 0) +1;
        return acc;
    }, {});

    const labels = Object.keys(counts);
    const values = Object.values(counts);
    setTimeout(() => {
    const ctx = document.querySelector("#myChart").getContext("2d");
    new Chart(ctx, {
        type: 'bar', 
        data: {
            labels: labels, 
            datasets: [{
                label: 'Number of Restaurants', 
                data: values,
                backgroundColor: [
                    '#ccc6c8', 
                    '#36a2eb', 
                    '#e05028', 
                    '#9966ff',
                    '#dfa54c',
                    '#4bc0c0',
                    '#3cba9a',
                    '#9d9d9d'
                ], 
                borderWidth: 1,
            }], 
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Restaurant Inspection Results'
                    },
                    legend: {
                        labels: {
                            font: {
                                size: 20
                            }
                        }
                    }
                }
            }
        }
    });
  }, 100);

    return `
    <div class="restaurant-card">
        <h2 class="view-title">Inspection Results Chart</h2>
        <p>See how many restaurants are compliant....and which are not.</p>
        <canvas id="myChart"></canvas>
    </div>
    `;
}
export default showExternal;

  // Requirements:
  // - Show data using an external library, such as leaflet.js or chartsjs or similar.
  // - Make a filter on this page so your external library only shows useful data.
