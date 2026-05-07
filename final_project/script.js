// Load data //

async function loadData() {
  try {

    const response = await fetch ('battles.json')  // go get some data
    const data = await response.json();
    console.log("data loaded", data);
    
    return data;
  } catch (error) {
    console.error("Failed to load data:", error);
    throw new Error("Could not load data from Kaggle");
  }
}

//Scroll Trigger//

gsap.registerPlugin(ScrollTrigger);


const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".fact-section",
    start: "top center", 
    end: "+=2000",
    scrub: 1,
  },

  defaults: { ease: "none" }
});

tl.to({}, {duration: 0.3}).set(".dragon-side", { attr: 
    { src: "./assets/dragon_top.jpg" } })

tl.fromTo(".dragon-side", 
  { xPercent: -50, left: "50%", top: "100px" }, 
  { 
    x: -200, 
    y: 200, 
    duration: 1 
  }
)
.to(".dragon-side", {
  x: -500,
  y: 1200,
  duration: 1
})
.to(".dragon-side", {
  x: 400,
  y: 2000,
  duration: 1
});

// Battle Chart.js //

let battleChart = null;

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Starting application...");
    const battles = await loadData(); 
    createBattleChart(battles);      
});

async function createBattleChart(battles) {
    if (typeof Chart === 'undefined') {
        alert('Chart.js not available. Check console.');
        return;
    }
    
    if (battles.length === 0 ) {
        alert('No data loaded.');
        return;
    }

    const chartLabels = battles.map(battle => battle.name || "Unknown");
    const attackerData = battles.map(battle => battle.attacker_size || 0);
    const defenderData = battles.map(battle => battle.defender_size || 0);
    console.log('Chart data prepared:', { labels: chartLabels, attackerData, defenderData });

    try {
        const ctx= document.querySelector ('#battleChart').getContext('2d');
        if (battleChart) {
            battleChart.destroy();
            battleChart = null;
        }

        battleChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels, 
                datasets: [{
                    label: 'Attacker', 
                    data: attackerData,
                    borderColor: '#e2073633',
                    backgroundColor: '#e2073633',
                },
                {
                    label: 'Defender', 
                    data: defenderData, 
                    borderColor: '#0b87da33',
                    backgroundColor: '#0b87da33'
                }]
            }, 
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Comparison of Army Size: Attacker vs. Defender'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Soldiers'
                        }
                    }
                }
            }
        })
     } catch (error) {
            if (typeof handleChartError === 'function') {
                handleChartError(error);
            }   else {
                console.error('Error creating chart:', error);
                alert('Error creating chart.');
            }
        }
    }

