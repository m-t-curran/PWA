if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
}

// Navigation and Chart rendering functions go here

function navigateToDetails(episodeId) {
    window.location.href = 'details.html?episode=' + episodeId;
}

function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const episodeId = urlParams.get('episode');
    if (episodeId && document.getElementById('episodeChart')) {
        renderChart();
    }
});

function renderChart() {
    const ctx = document.getElementById('episodeChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['M', 'W', 'F', 'Su'],
            datasets: [{
                label: 'Episodes',
                data: [3, 6, 4, 3],
                backgroundColor: 'orange'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
