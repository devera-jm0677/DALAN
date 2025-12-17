// Passing Rate Data
const passingRateData = {
    3: {
        labels: ['2023', '2024', '2025'],
        data: [92, 90, 93]
    },
    5: {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        data: [90, 92, 92, 90, 93]
    },
    7: {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        data: [88, 90, 90, 92, 92, 90, 93]
    },
    10: {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        data: [84, 86, 85, 88, 90, 90, 92, 92, 90, 93]
    }
};

let passingRateChart;
let currentProgram = null;

// Load Program Data from localStorage
function loadProgramData() {
    const programData = localStorage.getItem('dalanSelectedProgram');
    
    if (!programData) {
        console.error('No program data found!');
        // Redirect back to homepage if no program is selected
        alert('No program selected. Redirecting to homepage...');
        window.location.href = 'index.html';
        return null;
    }
    
    currentProgram = JSON.parse(programData);
    updatePageContent(currentProgram);
    return currentProgram;
}

// Update Page Content with Program Data
function updatePageContent(program) {
    // Update program name
    const programName = document.querySelector('.program-name');
    if (programName) {
        programName.textContent = program.name;
    }
    
    // Update university name
    const universityName = document.querySelector('.university-name');
    if (universityName) {
        universityName.textContent = program.university;
    }
    
    // Update description
    const descriptionElement = document.querySelector('.program-description-text');
    if (descriptionElement) {
        descriptionElement.textContent = program.description;
    }
    
    // Update info cards
    const tuitionElement = document.querySelector('[data-info="tuition"]');
    if (tuitionElement) {
        tuitionElement.textContent = program.tuitionFee;
    }
    
    const typeElement = document.querySelector('[data-info="type"]');
    if (typeElement) {
        typeElement.textContent = program.institutionType;
    }
    
    const licensureElement = document.querySelector('[data-info="licensure"]');
    if (licensureElement) {
        licensureElement.textContent = program.licensure ? 'Licensure' : 'Non-Licensure';
    }
    
    const locationElement = document.querySelector('[data-info="location"]');
    if (locationElement) {
        locationElement.textContent = program.location || 'Pangasinan';
    }
    
    console.log('Program data loaded:', program);
}

// Initialize Chart
function initChart(years = 5) {
    const ctx = document.getElementById('passingRateChart');
    
    if (!ctx) return;

    const data = passingRateData[years];

    // Destroy existing chart if it exists
    if (passingRateChart) {
        passingRateChart.destroy();
    }

    passingRateChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Passing Rate (%)',
                data: data.data,
                backgroundColor: '#fda015',
                borderRadius: 8,
                barPercentage: 0.9,
                categoryPercentage: 0.8
            }]
        },
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
                        stepSize: 10,
                        callback: function(value) {
                            return value;
                        },
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

// Initialize Map
function initMap() {
    // Pangasinan State University - Lingayen coordinates
    const lat = 16.0186;
    const lng = 120.2347;

    // Initialize map
    const map = L.map('map').setView([lat, lng], 15);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Add marker
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup('<b>Pangasinan State University</b><br>Lingayen Campus').openPopup();

    // Fix map rendering issue
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

// Handle Years Selection
function initYearsSelector() {
    const yearsSelect = document.getElementById('yearsSelect');
    
    if (!yearsSelect) return;

    yearsSelect.addEventListener('change', function() {
        const years = parseInt(this.value);
        initChart(years);
        updateChartTitle(years);
    });
}

// Update Chart Title
function updateChartTitle(years) {
    const chartTitle = document.querySelector('.chart-title');
    if (!chartTitle) return;

    const data = passingRateData[years];
    const startYear = data.labels[0];
    const endYear = data.labels[data.labels.length - 1];
    
    chartTitle.textContent = `Passing Rate (${startYear}-${endYear})`;
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
    
    if (!sidebar || !mainWrapper) return;

    sidebar.addEventListener('mouseenter', function() {
        mainWrapper.style.marginLeft = '398px';
    });
    
    sidebar.addEventListener('mouseleave', function() {
        mainWrapper.style.marginLeft = '91px';
    });
}

// Handle Action Buttons
function initActionButtons() {
    const saveBtn = document.querySelector('.save-btn');
    const compareBtn = document.querySelector('.compare-btn');
    const visitBtn = document.querySelector('.visit-btn');
    const viewMapBtn = document.getElementById('btnViewMap');

    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            this.classList.toggle('saved');
            const span = this.querySelector('span');
            if (this.classList.contains('saved')) {
                span.textContent = 'Saved';
                console.log('Program saved');
            } else {
                span.textContent = 'Save';
                console.log('Program unsaved');
            }
        });
    }

    if (compareBtn) {
        compareBtn.addEventListener('click', function() {
            console.log('Compare program clicked');
            // Modal will open automatically via Bootstrap data-bs-toggle
        });
    }

    if (visitBtn) {
        visitBtn.addEventListener('click', function() {
            console.log('Visit university clicked');
            // Navigate to university page
        });
    }

    if (viewMapBtn) {
        viewMapBtn.addEventListener('click', function() {
            // Open map in new window with Google Maps
            const lat = 16.0186;
            const lng = 120.2347;
            const url = `https://www.google.com/maps?q=${lat},${lng}`;
            window.open(url, '_blank');
        });
    }
}

// Handle Compare Modal
function initCompareModal() {
    const addProgramBtn = document.getElementById('btnAddProgram');
    const goCompareBtn = document.getElementById('btnGoCompare');
    const programsList = document.getElementById('compareProgramsList');

    if (addProgramBtn) {
        addProgramBtn.addEventListener('click', function() {
            // Create a simple prompt for demo purposes
            const programName = prompt('Enter program name to compare:');
            if (programName && programName.trim()) {
                addProgramToCompare(programName.trim());
            }
        });
    }

    if (goCompareBtn) {
        goCompareBtn.addEventListener('click', function() {
            console.log('Navigating to comparison page...');
            // Get compare list from localStorage
            const compareList = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
            
            // Add current program to compare list if not already there
            if (currentProgram && !compareList.find(p => p.id === currentProgram.id)) {
                compareList.push(currentProgram);
                localStorage.setItem('dalanCompareList', JSON.stringify(compareList));
            }
            
            // Navigate to comparison page
            window.location.href = 'compare.html';
        });
    }

    // Initialize delete buttons
    initDeleteButtons();
}

function addProgramToCompare(programName) {
    const programsList = document.getElementById('compareProgramsList');
    if (!programsList) return;

    const programItem = document.createElement('div');
    programItem.className = 'compare-program-item';
    programItem.innerHTML = `
        <span class="compare-program-name">${programName}</span>
        <button class="btn-delete-program" aria-label="Remove program">
            <i class="bi bi-trash-fill"></i>
        </button>
    `;

    programsList.appendChild(programItem);

    // Re-initialize delete buttons
    initDeleteButtons();

    // Update Go to Compare button state
    updateGoCompareButton();
}

function initDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.btn-delete-program');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const programItem = this.closest('.compare-program-item');
            if (programItem) {
                programItem.remove();
                updateGoCompareButton();
            }
        });
    });
}

function updateGoCompareButton() {
    const goCompareBtn = document.getElementById('btnGoCompare');
    const programsList = document.getElementById('compareProgramsList');
    
    if (!goCompareBtn || !programsList) return;

    const programCount = programsList.querySelectorAll('.compare-program-item').length;
    
    if (programCount < 2) {
        goCompareBtn.disabled = true;
    } else {
        goCompareBtn.disabled = false;
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    loadProgramData();
    initChart(5); // Default to 5 years
    initMap();
    initYearsSelector();
    initNavigation();
    initSidebarHover();
    initActionButtons();
    initCompareModal();
});

// Handle window resize for chart
window.addEventListener('resize', function() {
    if (passingRateChart) {
        passingRateChart.resize();
    }
});