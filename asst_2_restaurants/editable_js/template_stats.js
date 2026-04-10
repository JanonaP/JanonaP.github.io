/**
 * STATS VIEW
 * Show aggregate statistics and insights - good for understanding the big picture
 */
function showStats(data) {
    const totalRestaurants = data.features.length;
    const totalApprovedFoodSource = data.features.reduce((sum, item) => {
        return sum + (item.properties.food_from_approved_source === "In Compliance" ? 1 : 0);
    }, 0);
    
    const foodPercentage = ((totalApprovedFoodSource / totalRestaurants) * 100).toFixed(2);
    
    const illWorkersRestricted = data.features.reduce((sum, item) => {
        return sum + (item.properties.ill_workers_restricted === "In Compliance" ? 1 : 0); 
    }, 0);
    const illWorkersPercentage = ((illWorkersRestricted / totalRestaurants) * 100).toFixed(2);
  
    return `
                <h2 class="view-title">Food Poisoning or the Flu: Is it likely?</h2>
                <p>Look at the following percentages to see how likely you are to get either of these from the previously listed restaurants</p>
                    <div class="stats-grid">
                        <div class="stat-card">
                        <p><strong class="stat-label">Total Restaurants:</strong> <div class="stat-number">${totalRestaurants}</div></p>
                        <p><strong class="stat-label">Restaurants with Approved Food Source:</strong> <div class="stat-number">${totalApprovedFoodSource} (${foodPercentage}%)</div></p>
                        <p><strong class="stat-label">Restaurants without Approved Food Source:</strong> <div class="stat-number">${totalRestaurants - totalApprovedFoodSource} (${(100 - foodPercentage).toFixed(2)}%)</div></p>
                        <p><strong class="stat-label">Restaurants restricting ill workers:</strong> <div class="stat-number">${illWorkersRestricted} (${illWorkersPercentage}%)</div></p>
                        <p><strong class="stat-label">Restaurants not restricting ill workers:</strong> <div class="stat-number">${totalRestaurants - illWorkersRestricted} (${(100 - illWorkersPercentage).toFixed(2)}%)</div></p>
                        </div>                    
                    </div>
    `;
}


export default showStats

// Requirements:
  // Replace the below "task" description with the following:
  // - One meaningful statistic calculation from the supplied dataset
  // ===- percent of restaurants not passing hand-washing, for example
  // - Present insights visually
  // - Show distributions, averages, counts, etc.
  // - Help users understand patterns in the data