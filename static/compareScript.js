// Program Comparison Data
const programsData = [
    {
        id: 1,
        programName: 'BS in Nursing',
        universityName: 'Pangasinan State University',
        universityLogo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop',
        passingRate: 89,
        tuition: '₱45K/sem',
        type: 'Private',
        location: 'Dagupan City',
        totalPassers: 156,
        totalExaminees: 175,
        firstTimePassers: 142,
        firstTimeExaminees: 155,
        repeaterPassers: 14,
        repeaterExaminees: 20,
        topnotchers: 5
    },
    {
        id: 2,
        programName: 'BS in Civil Engineering',
        universityName: 'Pangasinan State University',
        universityLogo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop',
        passingRate: 91,
        tuition: 'No tuition',
        type: 'Public',
        location: 'Urdaneta City',
        totalPassers: 82,
        totalExaminees: 90,
        firstTimePassers: 75,
        firstTimeExaminees: 80,
        repeaterPassers: 7,
        repeaterExaminees: 10,
        topnotchers: 3
    },
    {
        id: 3,
        programName: 'BS in Accountancy',
        universityName: 'UPANG College',
        universityLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop',
        passingRate: 85,
        tuition: '₱38K/sem',
        type: 'Private',
        location: 'Urdaneta City',
        totalPassers: 95,
        totalExaminees: 112,
        firstTimePassers: 88,
        firstTimeExaminees: 100,
        repeaterPassers: 7,
        repeaterExaminees: 12,
        topnotchers: 2
    }
];

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
            const programName = prompt('Enter program name to add:');
            if (programName && programName.trim()) {
                // Create new program with default values
                const newProgram = {
                    id: Date.now(),
                    programName: programName.trim(),
                    universityName: 'To be determined',
                    universityLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop',
                    passingRate: 0,
                    tuition: 'N/A',
                    type: 'N/A',
                    location: 'N/A',
                    totalPassers: 0,
                    totalExaminees: 0,
                    firstTimePassers: 0,
                    firstTimeExaminees: 0,
                    repeaterPassers: 0,
                    repeaterExaminees: 0,
                    topnotchers: 0
                };
                
                programsData.push(newProgram);
                renderProgramCards();
            }
        });
    }
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
                    const remainingPrograms = programsData.filter(program => 
                        !selectedForDeletion.has(program.id)
                    );
                    programsData.length = 0;
                    programsData.push(...remainingPrograms);
                    selectedForDeletion.clear();
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

// Handle Sidebar Hover
function initSidebarHover() {
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('mainWrapper');
    
    if (!sidebar || !mainWrapper) return;

    sidebar.addEventListener('mouseenter', function() {
        mainWrapper.style.marginLeft = '398px';
    });
    
    sidebar.addEventListener('mouseleave', function() {
        mainWrapper.style.marginLeft = '91px';
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
    initCharts();
    renderProgramCards();
    initShowHideDropdown();
    initAddButton();
    initDeleteButton();
    initNavigation();
    initSidebarHover();
    initYearSelect();
});

// Handle window resize for charts
window.addEventListener('resize', function() {
    if (topProgramsChart) topProgramsChart.resize();
    if (topUniversitiesChart) topUniversitiesChart.resize();
});
