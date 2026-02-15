// Search Results Data
const searchResults = [
    {
        name: "BS in Information Technology",
        university: "Pangasinan State University – Urdaneta City",
        description: "Focuses on software development, database systems, and IT infrastructure.",
        passingRate: null,
        tuitionFee: "₱22K-25K/year",
        licensure: false,
        institutionType: "Public",
        isBookmarked: false
    },
    {
        name: "BS in Criminology",
        university: "Luzon College of Science & Technology – Urdaneta City",
        description: "Prepares students for careers in law enforcement, forensic science, and criminal justice.",
        passingRate: 73,
        tuitionFee: "₱30K/year",
        licensure: true,
        institutionType: "Private",
        isBookmarked: false
    },
    {
        name: "BS in Civil Engineering",
        university: "Panpacific University North Philippines – Urdaneta City",
        description: "Covers design, construction, infrastructure and project management.",
        passingRate: 80,
        tuitionFee: "₱54K/year",
        licensure: true,
        institutionType: "Private",
        isBookmarked: false
    },
    {
        name: "BS in Accountancy",
        university: "Divine Word College of Urdaneta",
        description: "Prepares students for auditing, taxation and accounting professions.",
        passingRate: 82,
        tuitionFee: "₱24K/year",
        licensure: true,
        institutionType: "Private",
        isBookmarked: false
    },
    {
        name: "BS in Nursing",
        university: "Urdaneta City University",
        description: "Focused on patient care, community health, and clinical practice.",
        passingRate: 86,
        tuitionFee: "₱30K/sem",
        licensure: true,
        institutionType: "Private",
        isBookmarked: false
    },
    {
        name: "BS in Hospitality Management",
        university: "PHINMA-Upang College Urdaneta",
        description: "Prepares students for hotel, tourism, restaurant and service-industry roles.",
        passingRate: null,
        tuitionFee: "₱40K/year",
        licensure: false,
        institutionType: "Private",
        isBookmarked: false
    },
    {
        name: "BS in Education",
        university: "Urdaneta City University",
        description: "Trains future educators with pedagogy, curriculum design, and classroom management.",
        passingRate: null,
        tuitionFee: "₱25K/sem",
        licensure: true,
        institutionType: "Private",
        isBookmarked: false
    },
    {
        name: "BS in Information Systems",
        university: "Panpacific University North Philippines – Urdaneta City",
        description: "Focuses on business applications, systems analysis, and technology solutions.",
        passingRate: null,
        tuitionFee: "₱52K/year",
        licensure: false,
        institutionType: "Private",
        isBookmarked: false
    }
];

// Create Program Card for Search Results
function createSearchResultCard(program, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-6';
    col.setAttribute('role', 'listitem');
    
    const article = document.createElement('article');
    article.className = 'program-card';
    
    const passingRateDisplay = program.passingRate 
        ? `📈 Passing Rate: ${program.passingRate}%`
        : '📈 Passing Rate: N/A';
    
    const progressBarHtml = program.passingRate 
        ? `<div class="progress-bar-custom" role="progressbar" aria-valuenow="${program.passingRate}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar-fill" style="width: ${program.passingRate}%"></div>
           </div>`
        : `<div class="progress-bar-custom" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar-fill" style="width: 0%; background-color: #d9d9d9"></div>
           </div>`;
    
    article.innerHTML = `
        <div class="program-card-header" aria-hidden="true"></div>
        <div class="program-card-body">
            <div class="program-card-top">
                <h3 class="program-card-title">${program.name}</h3>
                <button class="bookmark-btn ${program.isBookmarked ? 'bookmarked' : ''}" 
                        data-index="${index}"
                        aria-label="${program.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}">
                    <i class="bi bi-bookmark${program.isBookmarked ? '-fill' : ''}" aria-hidden="true"></i>
                </button>
            </div>
            <p class="program-university">${program.university}</p>
            <p class="program-description">${program.description}</p>
            
            <div class="program-stats">
                <div class="passing-rate-container">
                    <span class="passing-rate-text">${passingRateDisplay}</span>
                    ${progressBarHtml}
                </div>
                <div class="program-meta">
                    💸 ${program.tuitionFee} • ${program.licensure ? 'Licensure' : 'Non-licensure'} • ${program.institutionType}
                </div>
            </div>
            
            <div class="program-actions">
                <button class="btn-view-details" aria-label="View details for ${program.name}">View Details</button>
                <button class="btn-compare" aria-label="Compare ${program.name} with other programs">
                    <i class="bi bi-plus-lg" aria-hidden="true"></i>
                    Compare
                </button>
            </div>
        </div>
    `;
    
    col.appendChild(article);
    return col;
}

// Render Search Results
function renderSearchResults() {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = '';
    
    searchResults.forEach((program, index) => {
        const card = createSearchResultCard(program, index);
        resultsGrid.appendChild(card);
    });
    
    // Add bookmark event listeners
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            searchResults[index].isBookmarked = !searchResults[index].isBookmarked;
            renderSearchResults();
        });
    });
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
function initFilterPills() {
    const filterPills = document.querySelectorAll('.filter-pill');
    
    filterPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            this.classList.add('active');
            
            console.log('Filter changed to:', this.dataset.filter);
        });
    });
}

// Initialize Navigation
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

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    renderSearchResults();
    initDropdownFilters();
    initFilterPills();
    initNavigation();
    initSidebarHover();
    initSortBy();
});
