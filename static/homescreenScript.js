// Programs Data
const programs = [
    {
        name: "BS in Nursing",
        university: "Pangasinan State University – Lingayen",
        description: "Training skilled and compassionate healthcare professionals for patient care.",
        passingRate: 87,
        tuitionFee: "₱25K-35K/year",
        licensure: true,
        institutionType: "Public",
        isBookmarked: false
    },
    {
        name: "BS in Civil Engineering",
        university: "Pangasinan State University – Urdaneta City",
        description: "Design and construct structures that last for generations.",
        passingRate: 85.71,
        tuitionFee: "Free Tuition",
        licensure: true,
        institutionType: "Public",
        isBookmarked: false
    },
    {
        name: "BS in Accountancy",
        university: "Universidad de Dagupan",
        description: "Ideal for students aiming for excellence in finance and professional accounting through the CPA Licensure Exam.",
        passingRate: 100,
        tuitionFee: "₱26K–30K/year",
        licensure: true,
        institutionType: "Private",
        isBookmarked: false
    },
    {
        name: "BS in Nursing",
        university: "PHINMA University of Pangasinan",
        description: "Start your path to becoming a compassionate, board-ready nurse.",
        passingRate: 87.88,
        tuitionFee: "₱30K/year",
        licensure: true,
        institutionType: "Private",
        isBookmarked: false
    }
];

// Universities Data
const universities = [
    {
        name: "Pangasinan State University",
        location: "Urdaneta City, Pangasinan",
        type: "Public",
        description: "Top public school known for licensure success and low tuition.",
        passingRate: 83,
        programCount: 10,
        logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop"
    },
    {
        name: "Universidad de Dagupan",
        location: "Dagupan City, Pangasinan",
        type: "Private",
        description: "Renowned for licensure success and industry-ready programs.",
        passingRate: 85,
        programCount: 26,
        logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=200&fit=crop"
    }
];

// Create Program Card
function createProgramCard(program, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-6';
    col.setAttribute('role', 'listitem');
    
    const article = document.createElement('article');
    article.className = 'program-card';
    
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
                    <span class="passing-rate-text">📈 Passing Rate: ${program.passingRate}%</span>
                    <div class="progress-bar-custom" role="progressbar" aria-valuenow="${program.passingRate}" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar-fill" style="width: ${program.passingRate}%"></div>
                    </div>
                </div>
                <div class="program-meta">
                    💸 ${program.tuitionFee} • ${program.licensure ? 'Licensure' : 'Non-Licensure'} • ${program.institutionType}
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

// Create University Card
function createUniversityCard(university) {
    const col = document.createElement('div');
    col.className = 'col-lg-6';
    col.setAttribute('role', 'listitem');
    
    const article = document.createElement('article');
    article.className = 'university-card';
    
    article.innerHTML = `
        <div class="university-logo">
            <img src="${university.logo}" alt="${university.name} logo">
        </div>
        <div class="university-info">
            <h3 class="university-title">${university.name}</h3>
            <p class="university-location">${university.location} • ${university.type}</p>
            <p class="university-description">${university.description}</p>
            
            <div class="university-stats">
                <span class="university-stat">⭐ Passing Rate: ${university.passingRate}%</span>
                <span class="university-stat">🎓 ${university.programCount} Programs</span>
            </div>
            
            <button class="btn-view-university" aria-label="View ${university.name}">View University</button>
        </div>
    `;
    
    col.appendChild(article);
    return col;
}

// Render Programs
function renderPrograms() {
    const programsGrid = document.getElementById('programsGrid');
    programsGrid.innerHTML = '';
    
    programs.forEach((program, index) => {
        const card = createProgramCard(program, index);
        programsGrid.appendChild(card);
    });
    
    // Add bookmark event listeners
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            programs[index].isBookmarked = !programs[index].isBookmarked;
            renderPrograms();
        });
    });
}

// Render Universities
function renderUniversities() {
    const universitiesGrid = document.getElementById('universitiesGrid');
    universitiesGrid.innerHTML = '';
    
    universities.forEach(university => {
        const card = createUniversityCard(university);
        universitiesGrid.appendChild(card);
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
            
            // Here you would add filtering logic
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

// Handle Sidebar Hover - Push Main Content
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

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    renderPrograms();
    renderUniversities();
    initFilterPills();
    initNavigation();
    initSidebarHover();
    
    // Add event listeners for buttons
    document.querySelectorAll('.see-more-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('See more clicked');
        });
    });
});
