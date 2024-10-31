// Show detailed view with chart
function viewDetails() {
    document.getElementById('episodeDetails').style.display = 'block';

    // Check if the chart is already initialized
    if (!window.myChart) {
        const ctx = document.getElementById('myChart').getContext('2d');
        window.myChart = new Chart(ctx, {
            type: 'bar',  // Use 'bar' or 'line' depending on your preference
            data: {
                labels: ['Episode 1', 'Episode 2', 'Episode 3'], // Sample labels
                datasets: [{
                    label: 'Intensity of Episodes',
                    data: [3, 1, 2],  // Sample data
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}
