// Simulate navigation by showing or hiding sections
function showSummaryPage() {
    document.getElementById('summaryPage').style.display = 'block';
    document.getElementById('detailsPage').style.display = 'none';
}

function showDetailsPage() {
    document.getElementById('summaryPage').style.display = 'none';
    document.getElementById('detailsPage').style.display = 'block';
}

// Event listeners for navigation
document.addEventListener('DOMContentLoaded', () => {
    // Show the summary page on load
    showSummaryPage();

    // Handle clicks on episode cards
    const episodeCards = document.querySelectorAll('.episode-card');
    episodeCards.forEach((card) => {
        card.addEventListener('click', showDetailsPage);
    });

    // Back button to return to summary page
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', showSummaryPage);
    }
});

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
}
