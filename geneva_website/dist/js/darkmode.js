const darkModeToggle = document.getElementById('darkModeToggle');

// Function to toggle dark mode and save preference to local storage
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Saving the current mode to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Checking local storage for dark mode preference and applying it
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode'); //getting the latest mode from local storage
    if (darkMode === 'enabled') { 
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Adding an event listener for the dark mode button 
darkModeToggle.addEventListener('click', toggleDarkMode);

// Loading the current dark mode preference on page load
loadDarkModePreference();