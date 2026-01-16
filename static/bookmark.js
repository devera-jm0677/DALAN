document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/user/bookmarks')
        .then(response => response.json())
        .then(bookmarks => {
            const bookmarkedPrograms = document.getElementById('bookmarked-programs');
            if (bookmarks.length === 0) {
                bookmarkedPrograms.innerHTML = '<p>No bookmarked programs yet.</p>';
                return;
            }
            const programCards = bookmarks.map(program => createProgramCard(program));
            bookmarkedPrograms.append(...programCards);
        })
        .catch(error => console.error('Error fetching bookmarks:', error));

    function createProgramCard(program) {
        const card = document.createElement('div');
        card.className = 'program-card';
        card.innerHTML = `
            <h3>${program.name}</h3>
            <p>${program.university_name}</p>
            <a href="/program/${program.id}">View Details</a>
        `;
        return card;
    }
});