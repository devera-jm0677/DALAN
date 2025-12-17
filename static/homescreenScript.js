// Programs Data
const programs = [
    {
        id: 'nursing-psu-lingayen',
        name: "BS in Nursing",
        university: "Pangasinan State University – Lingayen",
        universityShort: "PSU – Lingayen",
        location: "Lingayen, Pangasinan",
        description: "Training skilled and compassionate healthcare professionals for patient care.",
        passingRate: 87,
        tuitionFee: "₱25K-35K/year",
        licensure: true,
        institutionType: "Public",
        isBookmarked: false
    },
    {
        id: 'civil-eng-psu-urdaneta',
        name: "BS in Civil Engineering",
        university: "Pangasinan State University – Urdaneta City",
        universityShort: "PSU – Urdaneta",
        location: "Urdaneta City, Pangasinan",
        description: "Design and construct structures that last for generations.",
        passingRate: 85.71,
        tuitionFee: "Free Tuition",
        licensure: true,
        institutionType: "Public",
        isBookmarked: false
    },
    {
        id: 'accountancy-udd',
        name: "BS in Accountancy",
        university: "Universidad de Dagupan",
        universityShort: "UDD",
        location: "Dagupan City, Pangasinan",
        description: "Ideal for students aiming for excellence in finance and professional accounting through the CPA Licensure Exam.",
        passingRate: 100,
        tuitionFee: "₱26K–30K/year",
        licensure: true,
        institutionType: "Private",
        isBookmarked: false
    },
    {
        id: 'nursing-phinma-upang',
        name: "BS in Nursing",
        university: "PHINMA University of Pangasinan",
        universityShort: "PHINMA UPang",
        location: "Urdaneta City, Pangasinan",
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
    
    // Add View Details button listeners
    document.querySelectorAll('.btn-view-details').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            viewProgramDetails(programs[index]);
        });
    });
    
    // Add Compare button listeners
    document.querySelectorAll('.btn-compare').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            addToCompare(programs[index]);
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
            
            // Filter programs
            const filteredPrograms = programs.filter(program => 
                program.name.toLowerCase().includes(query) ||
                program.university.toLowerCase().includes(query)
            );
            
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
                searchResults.innerHTML = '<div class="compare-search-item" style="cursor: default; text-align: center; color: #999;">No programs found</div>';
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
            window.location.href = 'compare.html';
        });
    }
}

// Add program to compare list
function addProgramToCompareList(program) {
    let compareList = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
    
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
    // Store the selected program in localStorage
    localStorage.setItem('dalanSelectedProgram', JSON.stringify(program));
    
    // Redirect to program profile page
    window.location.href = 'program.html';
}

// Add to Compare
function addToCompare(program) {
    // Get existing compare list from localStorage
    let compareList = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
    
    // Check if program is already in compare list
    const existingIndex = compareList.findIndex(p => p.id === program.id);
    
    if (existingIndex === -1) {
        // Add program to compare list only if not already added
        compareList.push(program);
        
        // Save to localStorage
        localStorage.setItem('dalanCompareList', JSON.stringify(compareList));
    }
    
    // Navigate directly to compare.html
    window.location.href = 'compare.html';
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    renderPrograms();
    renderUniversities();
    initFilterPills();
    initNavigation();
    initCompareModal();
    
    // Add event listeners for buttons
    document.querySelectorAll('.see-more-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('See more clicked');
        });
    });
});
