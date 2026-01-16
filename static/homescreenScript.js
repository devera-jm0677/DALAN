// Universities Data
// Create University Card
// Create University Card
// function createUniversityCard(university) {
//     const col = document.createElement('div');
//     col.className = 'col-lg-6';
//     col.setAttribute('role', 'listitem');
    
//     const article = document.createElement('article');
//     article.className = 'university-card';
    
//     article.innerHTML = `
//         <div class="university-logo">
//             <img src="${university.logo}" alt="${university.name} logo">
//         </div>
//         <div class="university-info">
//             <h3 class="university-title">${university.name}</h3>
//             <p class="university-location">${university.location} • ${university.type}</p>
//             <p class="university-description">${university.description}</p>
            
//             <div class="university-stats">
//                 <span class="university-stat">⭐ Passing Rate: ${university.passingRate}%</span>
//                 <span class="university-stat">🎓 ${university.programCount} Programs</span>
//             </div>
            
//             <button class="btn-view-university" aria-label="View ${university.name}">View University</button>
//         </div>
//     `;
    
//     col.appendChild(article);
//     return col;
// }

// Render Universities
// function renderUniversities() {
//     const universitiesGrid = document.getElementById('universitiesGrid');
//     universitiesGrid.innerHTML = '';
    
//     universities.forEach(university => {
//         const card = createUniversityCard(university);
//         universitiesGrid.appendChild(card);
//     });
// }

document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-view-university');
    if (!btn) return;

    const card = btn.closest('.university-card');
    const name = card.querySelector('.university-title')?.textContent;

    if (name) {
        window.location.href = `/search?q=${encodeURIComponent(name)}`;
    }
});

// Initialize Filter Pills
function initFilterPills() {
    const filterPills = document.querySelectorAll('.filter-pill');
    
    filterPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            this.classList.add('active');
            
            // Here you would add filtering logic
            console.log('Filter changed to:', this.dataset.filter);
        });
    });
}

// Initialize Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    const pageRoutes = {
        recommended: '/dashboard', // Home
        compare: '/compare',
        bookmarks: '/bookmark'      // Bookmarks page
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            const target = pageRoutes[page];

            if (!target) return;

            if (page === 'compare' && window.location.pathname === '/dashboard') {
                localStorage.setItem('dalanCompareList', JSON.stringify([]));
            }

            // Active state only for main nav
            if (item.closest('.sidebar-nav')) {
                document
                    .querySelectorAll('.sidebar-nav .nav-item')
                    .forEach(n => n.classList.remove('active'));

                item.classList.add('active');
            }

            window.location.href = target;
        });
    });

    const profileButton = document.querySelector('.profile-button');
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            window.location.href = '/user-profile';
        });
    }
}

async function applyBookmarkState() {
    const res = await fetch('/api/user/bookmarked-ids', { credentials: 'same-origin' });
    if (!res.ok) return;

    const ids = new Set(await res.json());

    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        const id = Number(btn.dataset.programId);
        const icon = btn.querySelector('i');

        if (ids.has(id)) {
            btn.classList.add('bookmarked');
            icon.className = 'bi bi-bookmark-fill';
        }
    });
}

document.addEventListener('DOMContentLoaded', applyBookmarkState);

document.addEventListener('DOMContentLoaded', () => {
    const isBookmarkPage = window.location.pathname === '/bookmark';

    fetch('/api/user/bookmarked-ids', {
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(ids => {
        ids.forEach(id => {
            const card = document.querySelector(
                `.program-card[data-program-id="${id}"]`
            );
            if (!card) return;

            const icon = card.querySelector('.bookmark-btn i');
            icon.classList.remove('bi-bookmark');
            icon.classList.add('bi-bookmark-fill');
        });
    });
    document.body.addEventListener('click', async (e) => {
        const btn = e.target.closest('.bookmark-btn');
        if (!btn) return;

        e.preventDefault();

        const card = btn.closest('.program-card');
        const programId = card.dataset.programId;

        if (!programId) return;

        try {
            const res = await fetch('/api/bookmark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify({ program_id: programId })
            });

            if (res.status === 401) {
                alert('Please log in to bookmark programs.');
                return;
            }

            const data = await res.json();

            if (!data.success) return;

            toggleBookmarkIcon(btn, data.action);
            if (data.action === 'added') {
                Swal.fire({
                    icon: 'success',
                    title: 'Bookmarked!',
                    text: 'Bookmark saved.',
                    confirmButtonColor: '#2441ac',
                    toast: true,
                    position: 'top-end',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            } else if (data.action === 'removed') {
                if (isBookmarkPage && card) {
                    card.remove();
                    refreshBookmarkCount();
                    showEmptyBookmarksMessage();
                }
                Swal.fire({
                    icon: 'info',
                    title: 'Removed',
                    text: 'Bookmark removed.',
                    confirmButtonColor: '#2441ac',
                    toast: true,
                    position: 'top-end',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }

        } catch (err) {
            console.error('Bookmark failed:', err);
        }
    });
});

function toggleBookmarkIcon(button, action) {
    const icon = button.querySelector('i');

    if (action === 'added') {
        icon.classList.remove('bi-bookmark');
        icon.classList.add('bi-bookmark-fill');
    } else {
        icon.classList.remove('bi-bookmark-fill');
        icon.classList.add('bi-bookmark');
    }
}

function refreshBookmarkCount() {
    const title = document.getElementById('programsTitle');
    const grid = document.getElementById('programsGrid');
    if (!title || !grid) return;

    const count = grid.querySelectorAll('.program-card').length;
    title.textContent = `Bookmarks (${count})`;
}

function showEmptyBookmarksMessage() {
    const grid = document.getElementById('programsGrid');
    if (!grid) return;
    if (grid.querySelector('.program-card')) return;

    grid.innerHTML = '<p>No bookmarked programs yet.</p>';
}

function normalizeProgramName(name) {
    return (name || '').trim().toLowerCase();
}

function getCompareBaseProgramName(list) {
    const entry = list.find(p => p && (p.name || p.program_name || p.programName));
    const name = entry?.name || entry?.program_name || entry?.programName;
    return normalizeProgramName(name);
}

function getCompareBaseProgramDisplayName(list) {
    const entry = list.find(p => p && (p.name || p.program_name || p.programName));
    return entry?.name || entry?.program_name || entry?.programName || '';
}

// Initialize Compare Modal
function initCompareModal() {
    const compareModal = document.getElementById('compareModal');
    const searchInput = document.getElementById('compareSearchInput');
    const searchResults = document.getElementById('compareSearchResults');
    const goCompareBtn = document.getElementById('btnGoCompare');
    
    if (!compareModal) return;
    
    // Handle search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            if (query.length === 0) {
                searchResults.style.display = 'none';
                searchResults.innerHTML = '';
                return;
            }
            
            const compareList = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
            const baseName = getCompareBaseProgramName(compareList);
            const baseDisplayName = getCompareBaseProgramDisplayName(compareList);

            // Filter programs
            const filteredPrograms = programs.filter(program => {
                const matchesQuery = program.name.toLowerCase().includes(query) ||
                    program.university.toLowerCase().includes(query);

                if (!matchesQuery) return false;
                if (!baseName) return true;
                return normalizeProgramName(program.name) === baseName;
            });
            
            if (filteredPrograms.length > 0) {
                searchResults.style.display = 'block';
                searchResults.innerHTML = filteredPrograms.map(program => `
                    <div class="compare-search-item" data-program-id="${program.id}">
                        <span class="compare-search-item-name">${program.name}</span>
                        <span class="compare-search-item-university">${program.university}</span>
                    </div>
                `).join('');
                
                // Add click handlers to search results
                searchResults.querySelectorAll('.compare-search-item').forEach(item => {
                    item.addEventListener('click', function() {
                        const programId = this.dataset.programId;
                        const program = programs.find(p => p.id === programId);
                        
                        if (program) {
                            addProgramToCompareList(program);
                        }
                        
                        // Clear search
                        searchInput.value = '';
                        searchResults.style.display = 'none';
                        searchResults.innerHTML = '';
                    });
                });
            } else {
                searchResults.style.display = 'block';
                const emptyMessage = baseName
                    ? `Only ${baseDisplayName || 'the same program'} can be compared`
                    : 'No programs found';
                searchResults.innerHTML = `<div class="compare-search-item" style="cursor: default; text-align: center; color: #999;">${emptyMessage}</div>`;
            }
        });
    }
    
    // Handle modal shown event
    compareModal.addEventListener('shown.bs.modal', function() {
        updateCompareModal();
        searchInput.focus();
    });
    
    // Handle modal hidden event
    compareModal.addEventListener('hidden.bs.modal', function() {
        searchInput.value = '';
        searchResults.style.display = 'none';
        searchResults.innerHTML = '';
    });
    
    // Handle Go to Compare button
    if (goCompareBtn) {
        goCompareBtn.addEventListener('click', function() {
            window.location.href = '/compare';
        });
    }
}

// Add program to compare list
function addProgramToCompareList(program) {
    let compareList = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
    const baseName = getCompareBaseProgramName(compareList);
    const baseDisplayName = getCompareBaseProgramDisplayName(compareList);

    if (baseName && normalizeProgramName(program.name) !== baseName) {
        Swal.fire({
            icon: 'info',
            title: 'Only same program',
            text: `Only ${baseDisplayName || 'the same program'} can be compared.`,
            confirmButtonColor: '#2441ac',
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
        return;
    }
    
    // Check if already exists
    if (compareList.find(p => p.id === program.id)) {
        Swal.fire({
            icon: 'info',
            title: 'Already Added',
            text: 'This program is already in your comparison list!',
            confirmButtonColor: '#2441ac',
            confirmButtonText: 'OK',
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
        return;
    }
    
    // Add to list
    compareList.push(program);
    localStorage.setItem('dalanCompareList', JSON.stringify(compareList));
    
    // Update modal
    updateCompareModal();
    
    // Show success toast
    Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${program.name} added to comparison`,
        confirmButtonColor: '#2441ac',
        toast: true,
        position: 'top-end',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
    });
}

// Update compare modal content
function updateCompareModal() {
    const compareList = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
    const programsList = document.getElementById('compareProgramsList');
    const emptyState = document.getElementById('compareEmptyState');
    const goCompareBtn = document.getElementById('btnGoCompare');
    
    if (!programsList || !emptyState) return;
    
    // Update programs list
    if (compareList.length === 0) {
        programsList.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        programsList.innerHTML = compareList.map(program => `
            <div class="compare-program-item" data-program-id="${program.id}">
                <div style="flex: 1;">
                    <span class="compare-program-name">${program.name}</span>
                    <span class="compare-program-university">${program.university}</span>
                </div>
                <button class="btn-delete-program" data-program-id="${program.id}" aria-label="Remove program">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
        `).join('');
        
        // Add delete handlers
        programsList.querySelectorAll('.btn-delete-program').forEach(btn => {
            btn.addEventListener('click', function() {
                const programId = this.dataset.programId;
                removeProgramFromCompareList(programId);
            });
        });
    }
    
    // Update button state - Allow going to compare with any number of programs
    if (goCompareBtn) {
        goCompareBtn.disabled = compareList.length === 0;
    }
}

// Remove program from compare list
function removeProgramFromCompareList(programId) {
    let compareList = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
    compareList = compareList.filter(p => p.id !== programId);
    localStorage.setItem('dalanCompareList', JSON.stringify(compareList));
    updateCompareModal();
}

// View Program Details
function viewProgramDetails(program) {
    const programId = programs.findIndex(p => p.id === program.id) + 1; // Use index as mock ID
    // Store the selected program in localStorage
    localStorage.setItem('dalanSelectedProgram', JSON.stringify(program));
    
    // Redirect to program profile page
    window.location.href = `/program/${programId}`;
}

// Add to Compare
function addToCompare(program) {
    // Get existing compare list from localStorage
    let compareList = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
    const baseName = getCompareBaseProgramName(compareList);
    const baseDisplayName = getCompareBaseProgramDisplayName(compareList);

    if (baseName && normalizeProgramName(program.name) !== baseName) {
        Swal.fire({
            icon: 'info',
            title: 'Only same program',
            text: `Only ${baseDisplayName || 'the same program'} can be compared.`,
            confirmButtonColor: '#2441ac',
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
        return;
    }
    
    // Check if program is already in compare list
    const existingIndex = compareList.findIndex(p => p.id === program.id);
    
    if (existingIndex === -1) {
        // Add program to compare list only if not already added
        compareList.push(program);
        
        // Save to localStorage
        localStorage.setItem('dalanCompareList', JSON.stringify(compareList));
    }
    
    // Navigate directly to compare.html
    window.location.href = '/compare';
}

function initHomeSearchSuggestions() {
    const input = document.getElementById('searchInput');
    const dropdown = document.getElementById('searchResultsDropdown');

    if (!input || !dropdown) return;

    /* ===== PROGRAMS (FROM DOM) ===== */
    const programItems = [...document.querySelectorAll('.program-card')].map(card => {
        const programId =
            card.querySelector('.btn-view-details')?.getAttribute('href')?.split('/').pop();

        return {
            type: 'program',
            title: card.querySelector('.program-card-title')?.textContent || '',
            subtitle: card.querySelector('.program-university')?.textContent || '',
            url: programId ? `/program/${programId}` : null
        };
    }).filter(p => p.url);

    /* ===== UNIVERSITIES (FROM JS DATA) ===== */
    const universityItems = universities.map(u => ({
        type: 'university',
        title: u.name,
        subtitle: u.location,
        url: `/search?q=${encodeURIComponent(u.name)}`
    }));

    const searchIndex = [...programItems, ...universityItems];

    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();

        if (!query) {
            dropdown.hidden = true;
            dropdown.innerHTML = '';
            return;
        }

        const matches = searchIndex
            .filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.subtitle.toLowerCase().includes(query)
            )
            .slice(0, 6);

        if (matches.length === 0) {
            dropdown.innerHTML =
                `<div class="search-result-item">No results found</div>`;
            dropdown.hidden = false;
            return;
        }

        dropdown.innerHTML = matches.map(item => `
            <div class="search-result-item" data-url="${item.url}">
                <span class="search-result-title">${item.title}</span>
                <span class="search-result-sub">${item.subtitle}</span>
            </div>
        `).join('');

        dropdown.hidden = false;

        dropdown.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = item.dataset.url;
            });
        });
    });

    /* ENTER → SEARCH PAGE */
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const q = encodeURIComponent(input.value.trim());
            if (q) window.location.href = `/search?q=${q}`;
        }
    });

    /* CLICK OUTSIDE → CLOSE */
    document.addEventListener('click', e => {
        if (!e.target.closest('.search-container')) {
            dropdown.hidden = true;
        }
    });
}

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const q = searchInput.value.trim();
        if (q) {
            window.location.href = `/search?q=${encodeURIComponent(q)}`;
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const seeMorePrograms = document.getElementById('seeMorePrograms');
    const seeMoreUniversities = document.getElementById('seeMoreUniversities');

    if (seeMorePrograms) {
        seeMorePrograms.addEventListener('click', () => {
            window.location.href = '/programs';
        });
    }

    if (seeMoreUniversities) {
        seeMoreUniversities.addEventListener('click', () => {
            window.location.href = '/universities';
        });
    }
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // createUniversityCard();
    // renderUniversities();
    initFilterPills();
    initNavigation();
    initCompareModal();
    initHomeSearchSuggestions();

    // document.querySelectorAll('.see-more-btn').forEach(btn => {
    //     btn.addEventListener('click', () => {
    //         const section = btn
    //             .closest('.content-section')
    //             ?.querySelector('.section-title')
    //             ?.textContent
    //             ?.toLowerCase();

    //         if (section === 'programs') {
    //             window.location.href = '/programs';
    //         }

    //         if (section === 'universities') {
    //             window.location.href = '/search';
    //         }
    //     });
    // });

});
