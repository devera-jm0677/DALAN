let bookmarkedIds = new Set();

// BOOOKMARK
async function loadBookmarkedIds() {
    try {
        const res = await fetch('/api/user/bookmarked-ids', {
            credentials: 'same-origin'
        });

        if (!res.ok) return;

        const ids = await res.json();
        bookmarkedIds = new Set(ids);
    } catch {
        console.warn('Failed to load bookmarked ids');
    }
}

function hydrateSSRBookmarks() {
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        const programId = Number(btn.dataset.programId);
        const icon = btn.querySelector('i');

        if (bookmarkedIds.has(programId)) {
            btn.classList.add('bookmarked');
            icon.classList.remove('bi-bookmark');
            icon.classList.add('bi-bookmark-fill');
        } else {
            btn.classList.remove('bookmarked');
            icon.classList.remove('bi-bookmark-fill');
            icon.classList.add('bi-bookmark');
        }
    });
}

// Create Program Card for Search Results
function createSearchResultCard(program, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-6';
    col.setAttribute('role', 'listitem');
    
    const article = document.createElement('article');
    article.className = 'program-card';

    const programName = program.program_name ?? program.name ?? '';
    const universityName = program.university_name ?? program.university ?? '';
    const institutionType = program.institution_type ?? program.institutionType ?? '';
    const tuitionRange = program.tuition_range ?? program.tuition_fee ?? program.tuitionFee ?? 'N/A';
    const isLicensure =
        program.has_licensure_exam === 1 ||
        program.is_licensure_based === 1 ||
        program.is_licensure_based === true ||
        program.licensure === true;
    const licensureLabel = isLicensure ? 'Licensure' : 'Non-Licensure';
    article.dataset.institutionType = institutionType.toString().trim().toLowerCase();
    article.dataset.licensure = isLicensure ? 'licensure' : 'non-licensure';

    const passingRateValue = program.passing_rate ?? program.passingRate;
    const passingRateDisplay = passingRateValue
        ? `dY"^ Passing Rate: ${passingRateValue}%`
        : 'dY"^ Passing Rate: N/A';
    
    const progressBarHtml = passingRateValue
        ? `<div class="progress-bar-custom" role="progressbar" aria-valuenow="${passingRateValue}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar-fill" style="width: ${passingRateValue}%"></div>
           </div>`
        : `<div class="progress-bar-custom" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar-fill" style="width: 0%; background-color: #d9d9d9"></div>
           </div>`;
    
    article.innerHTML = `
        <div class="program-card-header" aria-hidden="true"></div>
        <div class="program-card-body">
            <div class="program-card-top">
                <h3 class="program-card-title">${programName}</h3>
                <button
                    class="bookmark-btn ${bookmarkedIds.has(program.program_id) ? 'bookmarked' : ''}"
                    data-program-id="${program.program_id}"
                    aria-label="Bookmark program"
                >
                    <i class="bi bi-bookmark${bookmarkedIds.has(program.program_id) ? '-fill' : ''}"></i>
                </button>
            </div>
            <p class="program-university">${universityName}</p>
            <p class="program-description">${program.description || ''}</p>
            
            <div class="program-stats">
                <div class="passing-rate-container">
                    <span class="passing-rate-text">${passingRateDisplay}</span>
                    ${progressBarHtml}
                </div>
                <div class="program-meta">
                    dY', ${tuitionRange} ƒ?› ${licensureLabel} ƒ?› ${institutionType}
                </div>
            </div>
            
            <div class="program-actions">
                <button class="btn-view-details" aria-label="View details for ${programName}">View Details</button>
                <button class="btn-compare" aria-label="Compare ${programName} with other programs">
                    <i class="bi bi-plus-lg" aria-hidden="true"></i>
                    Compare
                </button>
            </div>
        </div>
    `;
    
    col.appendChild(article);
    return col;
}


function attachBookmarkHandlers() {
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        btn.onclick = async () => {
            const programId = Number(btn.dataset.programId);
            
            const res = await fetch('/api/bookmark', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ program_id: programId })
            });
            
            if (!res.ok) return;
            
            const data = await res.json();
            if (!data.success) return;
            
            const icon = btn.querySelector('i');

            if (data.action === 'added') {
                bookmarkedIds.add(programId);
                btn.classList.add('bookmarked');
                icon.classList.replace('bi-bookmark', 'bi-bookmark-fill');
            } else {
                bookmarkedIds.delete(programId);
                btn.classList.remove('bookmarked');
                icon.classList.replace('bi-bookmark-fill', 'bi-bookmark');
            }
        };
    });
}

// Render Search Results
function renderSearchResults() {
    const resultsGrid = document.getElementById('programsGrid');
    resultsGrid.innerHTML = '';
    
    searchResults.forEach((program, index) => {
        const card = createSearchResultCard(program, index);
        resultsGrid.appendChild(card);
    });

    attachBookmarkHandlers();
}
// Initialize Dropdown Filters
function initDropdownFilters() {
    const dropdowns = [
        { btn: 'programTypesBtn', menu: 'programTypesMenu' },
        { btn: 'locationBtn', menu: 'locationMenu' },
        { btn: 'typesBtn', menu: 'typesMenu' },
        { btn: 'tuitionBtn', menu: 'tuitionMenu' }
    ];

    dropdowns.forEach(dropdown => {
        const btn = document.getElementById(dropdown.btn);
        const menu = document.getElementById(dropdown.menu);
        
        if (!btn || !menu) return;

        // Toggle dropdown
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close other dropdowns
            dropdowns.forEach(other => {
                if (other.btn !== dropdown.btn) {
                    const otherBtn = document.getElementById(other.btn);
                    const otherMenu = document.getElementById(other.menu);
                    if (otherBtn && otherMenu) {
                        otherBtn.setAttribute('aria-expanded', 'false');
                        otherMenu.classList.remove('show');
                    }
                }
            });

            // Toggle current dropdown
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('show');
        });

        // Handle menu item clicks
        const items = menu.querySelectorAll('.dropdown-filter-item');
        items.forEach(item => {
            item.addEventListener('click', function() {
                // Update active state
                items.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Update button text
                const span = btn.querySelector('span');
                span.textContent = this.textContent;
                
                // Close dropdown
                btn.setAttribute('aria-expanded', 'false');
                menu.classList.remove('show');
                
                console.log('Filter changed:', this.textContent);
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
            const btn = document.getElementById(dropdown.btn);
            const menu = document.getElementById(dropdown.menu);
            if (btn && menu) {
                btn.setAttribute('aria-expanded', 'false');
                menu.classList.remove('show');
            }
        });
    });
}

// Initialize Filter Pills
function applyProgramFilter(filter, kind) {
    const cards = document.querySelectorAll('.program-card');
    let visibleCount = 0;
    const normalizedKind = kind === 'licensure' ? 'licensure' : 'institution_type';

    cards.forEach(card => {
        const value = normalizedKind === 'licensure'
            ? (card.dataset.licensure || '')
            : (card.dataset.institutionType || '');
        const shouldShow = filter === 'all' || value === filter;
        const wrapper = card.closest('[role="listitem"]') || card.closest('.col-lg-6') || card;
        wrapper.style.display = shouldShow ? '' : 'none';
        if (shouldShow) visibleCount += 1;
    });

    const title = document.getElementById('programsTitle');
    if (title) {
        title.textContent = `Programs (${visibleCount})`;
    }
}

function applyUniversityFilter(filter) {
    const cards = document.querySelectorAll('[data-institution-type]');
    let visibleCount = 0;

    cards.forEach(card => {
        const value = (card.dataset.institutionType || '').toLowerCase();
        const shouldShow = filter === 'all' || value === filter;
        const wrapper = card.closest('[role="listitem"]') || card.closest('.col-lg-6') || card;
        wrapper.style.display = shouldShow ? '' : 'none';
        if (shouldShow) visibleCount += 1;
    });

    const title = document.getElementById('universitiesTitle');
    if (title) {
        title.textContent = `Universities (${visibleCount})`;
    }
}

function initFilterPills() {
    const filterPills = document.querySelectorAll('.filter-pill');
    
    filterPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            this.classList.add('active');
            
            const scope = this.dataset.scope || 'programs';
            const filter = this.dataset.filter || 'all';
            const kind = this.dataset.kind || 'institution_type';
            if (scope === 'universities') {
                applyUniversityFilter(filter);
            } else {
                applyProgramFilter(filter, kind);
            }
        });
    });
}

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Only apply active state to main nav items, not bottom items
            if (this.closest('.sidebar-nav')) {
                const allNavItems = document.querySelectorAll('.sidebar-nav .nav-item');
                allNavItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
            
            console.log('Navigated to:', this.dataset.page);
        });
    });
}

// Handle Sidebar Hover
function initSidebarHover() {
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('mainWrapper');
    
    sidebar.addEventListener('mouseenter', function() {
        mainWrapper.style.marginLeft = '398px';
    });
    
    sidebar.addEventListener('mouseleave', function() {
        mainWrapper.style.marginLeft = '91px';
    });
}

// Handle Sort By
function initSortBy() {
    const sortBySelect = document.getElementById('sortBySelect');
    
    sortBySelect.addEventListener('change', function() {
        const value = this.value;
        console.log('Sort by:', value);
        
        // You can implement sorting logic here
        // For now, just log the selection
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

document.getElementById("seeMorePrograms")?.addEventListener("click", () => {
    window.location.href = "/search?type=programs";
});

document.getElementById("seeMoreUniversities")?.addEventListener("click", () => {
    window.location.href = "/universities";
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', async function () {
    await loadBookmarkedIds();
    hydrateSSRBookmarks();
    attachBookmarkHandlers();
    initDropdownFilters();
    initFilterPills();
    initNavigation();
    initSidebarHover();
    initSortBy();
    const firstPill = document.querySelector('.filter-pill.active');
    if (firstPill?.dataset.scope === 'universities') {
        applyUniversityFilter(firstPill.dataset.filter || 'all');
    } else {
        const filter = firstPill?.dataset.filter || 'all';
        const kind = firstPill?.dataset.kind || 'institution_type';
        applyProgramFilter(filter, kind);
    }

    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
});
