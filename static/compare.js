// Program Comparison Data
// Available programs database (same as in script.js)
const availablePrograms = [
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

// Load programs from localStorage
let programsData = [];

function loadProgramsFromStorage() {
    const compareList = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
    
    // Convert to compare.js format
    programsData = compareList.map(program => ({
        id: program.id || Date.now() + Math.random(),
        programName: program.name,
        universityName: program.university,
        universityLogo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop',
        passingRate: program.passingRate || 0,
        tuition: program.tuitionFee || 'N/A',
        type: program.institutionType || 'N/A',
        location: program.location || 'N/A',
        totalPassers: 0,
        totalExaminees: 0,
        firstTimePassers: 0,
        firstTimeExaminees: 0,
        repeaterPassers: 0,
        repeaterExaminees: 0,
        topnotchers: 0
    }));
}

// Chart Data
const topProgramsData = {
    labels: ['BS in Nursing', 'BS in Civil Engineering', 'BS in Accountancy', 'BS in Architecture', 'BS in Criminology'],
    datasets: [{
        data: [25, 20, 18, 22, 15],
        backgroundColor: [
            '#2196F3',
            '#4CAF50',
            '#FFC107',
            '#00BCD4',
            '#9E9E9E'
        ],
        borderWidth: 0
    }]
};

const topUniversitiesData = {
    labels: ['PSU', 'UPANG', 'UNP', 'SLU', 'DWC'],
    datasets: [{
        label: 'Passing Rate (%)',
        data: [92, 85, 90, 88, 80],
        backgroundColor: ['#2196F3', '#9E9E9E', '#FFC107', '#00BCD4', '#4CAF50'],
        borderRadius: 8,
        barPercentage: 0.7
    }]
};

let topProgramsChart;
let topUniversitiesChart;
let deleteMode = false;
let selectedForDeletion = new Set();

// Visible Categories
const visibleCategories = {
    passingRate: true,
    tuition: true,
    type: true,
    location: true,
    examinees: false,
    firstTimers: false,
    repeaters: false,
    topnotchers: false
};

// Initialize Charts
function initCharts() {
    // Top Programs Chart (Pie)
    const programsCtx = document.getElementById('topProgramsChart');
    if (programsCtx) {
        topProgramsChart = new Chart(programsCtx, {
            type: 'pie',
            data: topProgramsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            family: 'Poppins'
                        },
                        bodyFont: {
                            size: 13,
                            family: 'Poppins'
                        }
                    }
                }
            }
        });

        // Create custom legend
        createCustomLegend();
    }

    // Top Universities Chart (Bar)
    const universitiesCtx = document.getElementById('topUniversitiesChart');
    if (universitiesCtx) {
        topUniversitiesChart = new Chart(universitiesCtx, {
            type: 'bar',
            data: topUniversitiesData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            family: 'Poppins'
                        },
                        bodyFont: {
                            size: 13,
                            family: 'Poppins'
                        },
                        callbacks: {
                            label: function(context) {
                                return 'Passing Rate: ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            font: {
                                family: 'Poppins',
                                size: 12
                            }
                        },
                        grid: {
                            display: true,
                            drawBorder: false,
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: 'Poppins',
                                size: 12
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// Create Custom Legend for Pie Chart
function createCustomLegend() {
    const legendContainer = document.getElementById('programsLegend');
    if (!legendContainer) return;

    legendContainer.innerHTML = '';

    topProgramsData.labels.forEach((label, index) => {
        const color = topProgramsData.datasets[0].backgroundColor[index];
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color" style="background-color: ${color}"></div>
            <span>${label}</span>
        `;
        legendContainer.appendChild(legendItem);
    });
}

// Get Performance Badge
function getPerformanceBadge(passingRate) {
    if (passingRate >= 85) {
        return '<span class="performance-badge performance-excellent">Performance: Excellent</span>';
    } else if (passingRate >= 70) {
        return '<span class="performance-badge performance-good">Performance: Good</span>';
    } else {
        return '<span class="performance-badge performance-average">Performance: Average</span>';
    }
}

// Render Program Cards
function renderProgramCards() {
    const grid = document.getElementById('programCardsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    // Create categories column first (left side)
    const categoriesColumn = createCategoriesColumn();
    grid.appendChild(categoriesColumn);

    // Create program cards
    programsData.forEach(program => {
        const card = createProgramCard(program);
        grid.appendChild(card);
    });
}

// Create Program Card
function createProgramCard(program) {
    const card = document.createElement('div');
    card.className = 'compare-program-card';
    card.dataset.programId = program.id;

    let detailsHTML = '';

    // Default categories
    if (visibleCategories.passingRate) {
        detailsHTML += `
            <div class="card-detail-row">
                <span class="card-detail-label">Passing Rate</span>
                <span class="card-detail-value highlight">${program.passingRate}%</span>
            </div>
        `;
    }

    if (visibleCategories.tuition) {
        detailsHTML += `
            <div class="card-detail-row">
                <span class="card-detail-label">Tuition (avg / sem)</span>
                <span class="card-detail-value">${program.tuition}</span>
            </div>
        `;
    }

    if (visibleCategories.type) {
        detailsHTML += `
            <div class="card-detail-row">
                <span class="card-detail-label">Type</span>
                <span class="card-detail-value">${program.type}</span>
            </div>
        `;
    }

    if (visibleCategories.location) {
        detailsHTML += `
            <div class="card-detail-row">
                <span class="card-detail-label">Location</span>
                <span class="card-detail-value">${program.location}</span>
            </div>
        `;
    }

    // Optional categories
    if (visibleCategories.examinees) {
        detailsHTML += `
            <div class="card-detail-row">
                <span class="card-detail-label">Passers/Examinees</span>
                <span class="card-detail-value">${program.totalPassers}/${program.totalExaminees}</span>
            </div>
        `;
    }

    if (visibleCategories.firstTimers) {
        detailsHTML += `
            <div class="card-detail-row">
                <span class="card-detail-label">First Timers</span>
                <span class="card-detail-value">${program.firstTimePassers}/${program.firstTimeExaminees}</span>
            </div>
        `;
    }

    if (visibleCategories.repeaters) {
        detailsHTML += `
            <div class="card-detail-row">
                <span class="card-detail-label">Repeaters</span>
                <span class="card-detail-value">${program.repeaterPassers}/${program.repeaterExaminees}</span>
            </div>
        `;
    }

    if (visibleCategories.topnotchers) {
        detailsHTML += `
            <div class="card-detail-row">
                <span class="card-detail-label">Topnotchers (10-yr)</span>
                <span class="card-detail-value">${program.topnotchers}</span>
            </div>
        `;
    }

    card.innerHTML = `
        <div class="delete-indicator">
            <i class="bi bi-x-lg"></i>
        </div>
        <div class="card-header-custom">
            <img src="${program.universityLogo}" alt="${program.universityName}" class="card-university-logo">
            <h3 class="card-program-name">${program.programName}</h3>
            <p class="card-university-name">${program.universityName}</p>
        </div>
        <div class="card-body-custom">
            ${detailsHTML}
        </div>
    `;

    // Add click handler for delete mode
    card.addEventListener('click', function() {
        if (deleteMode) {
            toggleCardSelection(program.id, card);
        }
    });

    return card;
}

// Create Categories Column
function createCategoriesColumn() {
    const column = document.createElement('div');
    column.className = 'categories-column';

    let categoriesHTML = '<div class="categories-header"><div class="categories-header-title">Categories</div></div>';
    categoriesHTML += '<div class="categories-body">';

    // Default categories
    if (visibleCategories.passingRate) {
        categoriesHTML += `
            <div class="category-label-row">
                <span class="category-label-text">Passing Rate</span>
            </div>
        `;
    }

    if (visibleCategories.tuition) {
        categoriesHTML += `
            <div class="category-label-row">
                <span class="category-label-text">Tuition (avg / sem)</span>
            </div>
        `;
    }

    if (visibleCategories.type) {
        categoriesHTML += `
            <div class="category-label-row">
                <span class="category-label-text">Type</span>
            </div>
        `;
    }

    if (visibleCategories.location) {
        categoriesHTML += `
            <div class="category-label-row">
                <span class="category-label-text">Location</span>
            </div>
        `;
    }

    // Optional categories
    if (visibleCategories.examinees) {
        categoriesHTML += `
            <div class="category-label-row">
                <span class="category-label-text">Passers/Examinees</span>
            </div>
        `;
    }

    if (visibleCategories.firstTimers) {
        categoriesHTML += `
            <div class="category-label-row">
                <span class="category-label-text">First Timers</span>
            </div>
        `;
    }

    if (visibleCategories.repeaters) {
        categoriesHTML += `
            <div class="category-label-row">
                <span class="category-label-text">Repeaters</span>
            </div>
        `;
    }

    if (visibleCategories.topnotchers) {
        categoriesHTML += `
            <div class="category-label-row">
                <span class="category-label-text">Topnotchers (10-yr)</span>
            </div>
        `;
    }

    categoriesHTML += '</div>';
    column.innerHTML = categoriesHTML;

    return column;
}

// Toggle Card Selection for Deletion
function toggleCardSelection(programId, cardElement) {
    if (selectedForDeletion.has(programId)) {
        selectedForDeletion.delete(programId);
        cardElement.classList.remove('selected-for-delete');
    } else {
        selectedForDeletion.add(programId);
        cardElement.classList.add('selected-for-delete');
    }
}

// Initialize Show/Hide Dropdown
function initShowHideDropdown() {
    const btn = document.getElementById('btnShowHide');
    const menu = document.getElementById('showHideMenu');

    if (!btn || !menu) return;

    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('show');
    });

    // Handle checkbox changes
    const checkboxes = menu.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const category = this.id.replace('cat-', '');
            
            // Map checkbox IDs to category keys
            const categoryMap = {
                'passers': 'passingRate',
                'tuition': 'tuition',
                'type': 'type',
                'location': 'location',
                'examinees': 'examinees',
                'firsttimers': 'firstTimers',
                'repeaters': 'repeaters',
                'topnotchers': 'topnotchers'
            };

            const categoryKey = categoryMap[category];
            if (categoryKey) {
                visibleCategories[categoryKey] = this.checked;
                renderProgramCards();
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            btn.setAttribute('aria-expanded', 'false');
            menu.classList.remove('show');
        }
    });
}

// Initialize Add Button
function initAddButton() {
    const addBtn = document.getElementById('btnAdd');
    
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            // Show the compare modal
            const compareModal = new bootstrap.Modal(document.getElementById('compareModal'));
            compareModal.show();
            updateCompareModal();
        });
    }
}

// Initialize Compare Modal
function initCompareModal() {
    const compareModal = document.getElementById('compareModal');
    const searchInput = document.getElementById('compareSearchInput');
    const searchResults = document.getElementById('compareSearchResults');
    
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
            
            // Filter available programs
            const filteredPrograms = availablePrograms.filter(program => 
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
                        const program = availablePrograms.find(p => p.id === programId);
                        
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
        // Reload programs from storage and re-render
        loadProgramsFromStorage();
        renderProgramCards();
    });
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
    const compareCount = document.getElementById('compareCount');
    
    if (!programsList || !compareCount) return;
    
    // Update count
    compareCount.textContent = compareList.length;
    
    // Update programs list
    if (compareList.length === 0) {
        programsList.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No programs added yet</p>';
    } else {
        programsList.innerHTML = compareList.map(program => `
            <div class="compare-program-item" data-program-id="${program.id}">
                <div style="flex: 1;">
                    <span class="compare-program-name">${program.name}</span>
                    <span class="compare-program-university">${program.university}</span>
                </div>
            </div>
        `).join('');
    }
}

// Remove program from compare list
function removeProgramFromCompareList(programId) {
    let compareList = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
    compareList = compareList.filter(p => p.id !== programId);
    localStorage.setItem('dalanCompareList', JSON.stringify(compareList));
    updateCompareModal();
    
    // Show success toast
    Swal.fire({
        icon: 'success',
        title: 'Removed!',
        text: 'Program removed from comparison',
        confirmButtonColor: '#2441ac',
        toast: true,
        position: 'top-end',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
    });
}

// Initialize Delete Button
function initDeleteButton() {
    const deleteBtn = document.getElementById('btnDelete');
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            deleteMode = !deleteMode;
            
            if (deleteMode) {
                this.classList.add('active');
                this.innerHTML = '<i class="bi bi-check-lg"></i> Confirm Delete';
                document.querySelectorAll('.compare-program-card').forEach(card => {
                    card.classList.add('delete-mode');
                });
            } else {
                // Perform deletion
                if (selectedForDeletion.size > 0) {
                    // Update the in-memory programsData array
                    const remainingPrograms = programsData.filter(program => 
                        !selectedForDeletion.has(program.id)
                    );
                    programsData.length = 0;
                    programsData.push(...remainingPrograms);
                    
                    // Also update localStorage
                    let compareList = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
                    compareList = compareList.filter(program => 
                        !selectedForDeletion.has(program.id)
                    );
                    localStorage.setItem('dalanCompareList', JSON.stringify(compareList));
                    
                    selectedForDeletion.clear();
                    
                    // Show success toast
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Selected programs removed from comparison',
                        confirmButtonColor: '#2441ac',
                        toast: true,
                        position: 'top-end',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                }
                
                this.classList.remove('active');
                this.innerHTML = '<i class="bi bi-trash-fill"></i> Delete';
                renderProgramCards();
            }
        });
    }
}

// Initialize Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.closest('.sidebar-nav')) {
                const allNavItems = document.querySelectorAll('.sidebar-nav .nav-item');
                allNavItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
            
            console.log('Navigated to:', this.dataset.page);
        });
    });
}

// Handle Year Selection
function initYearSelect() {
    const yearSelect = document.getElementById('yearSelect');
    
    if (yearSelect) {
        yearSelect.addEventListener('change', function() {
            console.log('Year changed to:', this.value);
            // You can update charts based on year selection here
        });
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    loadProgramsFromStorage();
    initCharts();
    renderProgramCards();
    initShowHideDropdown();
    initAddButton();
    initDeleteButton();
    initNavigation();
    initYearSelect();
    initCompareModal();
});

// Handle window resize for charts
window.addEventListener('resize', function() {
    if (topProgramsChart) topProgramsChart.resize();
    if (topUniversitiesChart) topUniversitiesChart.resize();
});