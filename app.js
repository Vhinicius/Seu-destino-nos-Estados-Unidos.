document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector("#search-input");
    const searchButton = document.querySelector("#search-button");
    const items = document.querySelectorAll(".item");

    function searchDestinations() {
        const searchTerm = searchInput.value.toLowerCase();

        if (searchTerm.trim() === "") {
            // Show all items and close any open submenus
            items.forEach(item => {
                item.style.display = "block";
                const submenu = item.querySelector('.sub-menu');
                if (submenu) {
                    submenu.style.display = 'none';
                }
            });
        } else {
            // Filter items and keep existing submenu state
            items.forEach(item => {
                const city = item.querySelector("h2").textContent.toLowerCase();
                const description = item.querySelector("p").textContent.toLowerCase();

                if (city.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        }
    }

    // Handle search button click
    searchButton.addEventListener("click", searchDestinations);

    // Handle search input keyup (Enter key or empty search)
    searchInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter" || searchInput.value.trim() === "") {
            searchDestinations();
        }
    });

    // Add accordion functionality
    const accordionLinks = document.querySelectorAll('.item-link');
    accordionLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const item = link.closest('.item');
            const submenu = item.querySelector('.sub-menu');

            // Toggle submenu visibility
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {
                // Hide all other submenus
                document.querySelectorAll('.sub-menu').forEach(sub => {
                    if (sub !== submenu) {
                        sub.style.display = 'none';
                    }
                });
                submenu.style.display = 'block';
            }
        });
    });

    // Close open submenus when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.item')) {
            document.querySelectorAll('.sub-menu').forEach(submenu => {
                submenu.style.display = 'none';
            });
        }
    });
});