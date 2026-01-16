document.addEventListener('DOMContentLoaded', () => {
    const searchContainers = document.querySelectorAll('.search-container');
    if (!searchContainers.length) return;

    const runSearch = input => {
        if (!input) return;
        const q = input.value.trim();
        if (!q) return;
        window.location.href = `/search?q=${encodeURIComponent(q)}`;
    };

    searchContainers.forEach(container => {
        const searchInput = container.querySelector('#searchInput');
        const searchIcon = container.querySelector('.search-icon');
        if (!searchInput) return;

        searchInput.addEventListener('keydown', e => {
            if (e.key !== 'Enter') return;
            runSearch(searchInput);
        });

        if (searchIcon) {
            searchIcon.addEventListener('click', () => runSearch(searchInput));
        }
    });
});
