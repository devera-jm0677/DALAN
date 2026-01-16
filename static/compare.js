/*************************************************
 * FETCH CHART DATA
 *************************************************/
async function fetchTopPrograms(year) {
    const targetYear = year || new Date().getFullYear();
    const res = await fetch(`/api/graph/top-programs/${targetYear}`);
    if (!res.ok) {
        console.error('Top programs fetch failed');
        return [];
    }
    return await res.json();
}

async function fetchTopUniversities(year) {
    const targetYear = year || new Date().getFullYear();
    const res = await fetch(`/api/graph/top-universities/${targetYear}`);
    if (!res.ok) {
        console.error('Top universities fetch failed');
        return [];
    }
    return await res.json();
}
/*************************************************
 * UPDATE CHARTS
 *************************************************/
async function updateChartsByYear() {
    const year = getSelectedYear();
    if (!year) return;

    // ===== TOP PROGRAMS =====
    const programs = await fetchTopPrograms(year);

    const programLabels = programs.map(p => p.program_name);
    const programRates = programs.map(p => p.passing_rate);

    if (topProgramsChart) {
        topProgramsChart.data.labels = programLabels;
        topProgramsChart.data.datasets[0].data = programRates;
        topProgramsChart.update();
        createCustomLegend();
    }

    // ===== TOP UNIVERSITIES =====
    const universities = await fetchTopUniversities(year);

    const uniLabels = universities.map(u => u.abbreviation);
    const uniRates = universities.map(u => u.passing_rate);

    // Store full names for tooltip use
    topUniversitiesChart.fullNames = universities.map(u => u.university_name);

    topUniversitiesChart.data.labels = uniLabels;
    topUniversitiesChart.data.datasets[0].data = uniRates;
    topUniversitiesChart.update();

    console.log('Chart year:', year);
    console.log('Top programs:', programs);
    console.log('Top universities:', universities);

}

function createCustomLegend() {
    const legendContainer = document.getElementById('programsLegend');
    if (!legendContainer || !topProgramsChart) return;

    legendContainer.innerHTML = '';

    topProgramsChart.data.labels.forEach((label, index) => {
        const color = topProgramsChart.data.datasets[0].backgroundColor[index % 
            topProgramsChart.data.datasets[0].backgroundColor.length];

        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color" style="background-color: ${color}"></div>
            <span>${label}</span>
        `;
        legendContainer.appendChild(legendItem);
    });
}
// Chart Data

const topProgramsData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: ['#2196F3','#4CAF50','#FFC107','#00BCD4','#9E9E9E'],
        borderWidth: 0
    }]
};

const topUniversitiesData = {
    labels: [],
    datasets: [{
        label: 'Passing Rate (%)',
        data: [],
        backgroundColor: ['#2196F3','#9E9E9E','#FFC107','#00BCD4','#4CAF50'],
        borderRadius: 8,
        barPercentage: 0.7
    }]
};

let topProgramsChart;
let topUniversitiesChart;

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
                            title: function (context) {
                                const index = context[0].dataIndex;
                                return topUniversitiesChart.fullNames[index];
                            },
                            label: function (context) {
                                return `Passing Rate: ${context.parsed.y}%`;
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

/*************************************************
 * UTILITIES
 *************************************************/
function getSelectedYear() {
    const yearSelect = document.getElementById('yearSelect');
    if (!yearSelect) return String(new Date().getFullYear());
    return yearSelect.value || String(new Date().getFullYear());
}

function getCompareIdsFromStorage() {
    const raw = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');

    return raw
        .map(item => {
            if (typeof item === 'number') return item;
            if (item?.program_id) return item.program_id;
            if (item?.id) return item.id;
            return null;
        })
        .filter(Boolean);
}

function normalizeProgramName(name) {
    return (name || '').trim().toLowerCase();
}

function getBaseCompareProgramName() {
    const fromData = programsData?.[0]?.programName;
    if (fromData) return normalizeProgramName(fromData);

    const raw = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
    const entry = raw.find(p => p && (p.program_name || p.name || p.programName));
    const name = entry?.program_name || entry?.name || entry?.programName;
    return normalizeProgramName(name);
}

function getBaseCompareProgramDisplayName() {
    const fromData = programsData?.[0]?.programName;
    if (fromData) return fromData;

    const raw = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
    const entry = raw.find(p => p && (p.program_name || p.name || p.programName));
    return entry?.program_name || entry?.name || entry?.programName || '';
}

/*************************************************
 * GLOBAL STATE
 *************************************************/
let programsData = [];
let deleteMode = false;
let selectedForDeletion = new Set();

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

let categoryOrder = [
    'passingRate',
    'tuition',
    'type',
    'location',
    'examinees',
    'firstTimers',
    'repeaters',
    'topnotchers'
];

const categoryMeta = {
    passingRate: { label: 'Passing Rate' },
    tuition: { label: 'Tuition (est.)' },
    type: { label: 'Type' },
    location: { label: 'Location' },
    examinees: { label: 'Passers / Examinees' },
    firstTimers: { label: 'First Timers' },
    repeaters: { label: 'Repeaters' },
    topnotchers: { label: 'Topnotchers' }
};

/*************************************************
 * FETCH FROM DATABASE
 *************************************************/
async function searchProgramsFromDB(query) {
    const res = await fetch(`/api/programs/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    return await res.json();
}

async function fetchComparePrograms(ids, year) {
    if (!ids.length || !year) return [];

    const res = await fetch(
        `/api/compare/programs?ids=${ids.join(',')}&year=${year}`
    );

    if (!res.ok) return [];
    return await res.json();
}

/*************************************************
 * NORMALIZE DB → UI FORMAT
 *************************************************/
function normalizeCompareProgram(db) {
    const tuitionRange = db.tuition_range ?? db.tuitionRange;
    const tuitionValue = db.tuition;

    return {
        id: db.program_id ?? db.id,
        programName: db.program_name,
        universityName: db.university_name,
        universityLogo: db.university_logo || db.logo_url || db.program_logo || '/static/img/university-placeholder.png',

        passingRate: db.passing_rate ?? 0,
        tuition: tuitionRange
            ? String(tuitionRange)
            : (tuitionValue
                ? `?${Number(tuitionValue).toLocaleString()}`
                : 'N/A'),

        type: db.institution_type,
        location: db.location,

        totalPassers: db.total_passers ?? 0,
        totalExaminees: db.total_examinees ?? 0,

        firstTimePassers: db.first_timers_passed ?? 0,
        firstTimeExaminees: db.first_timers_total ?? 0,

        repeaterPassers: db.repeaters_passed ?? 0,
        repeaterExaminees: db.repeaters_total ?? 0,

        topnotchers: db.number_of_topnotchers ?? 0
    };
}


/*************************************************
 * LOAD + RENDER (SINGLE SOURCE OF TRUTH)
 *************************************************/
async function loadAndRenderCompare() {
    const ids = getCompareIdsFromStorage();
    const year = getSelectedYear();

    if (!ids.length || !year) {
        programsData = [];
        renderProgramCards();
        return;
    }

    const dbPrograms = await fetchComparePrograms(ids, year);
    const normalizedPrograms = dbPrograms.map(normalizeCompareProgram);
    const byId = new Map(normalizedPrograms.map(program => [Number(program.id), program]));
    programsData = ids.map(id => byId.get(Number(id))).filter(Boolean);
    renderProgramCards();
}

/*************************************************
 * RENDER PROGRAM CARDS
 *************************************************/
function renderProgramCards() {
    selectedForDeletion.clear();
    const grid = document.getElementById('programCardsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (!programsData.length) {
        grid.innerHTML = `
            <div class="text-muted text-center w-100 py-5">
                Add a program to compare
            </div>`;
        return;
    }

    grid.appendChild(createCategoriesColumn());

    programsData.forEach(program => {
        grid.appendChild(createProgramCard(program));
    });
}

/*************************************************
 * PROGRAM CARD
 *************************************************/
function createProgramCard(program) {
    const card = document.createElement('div');
    card.className = 'compare-program-card';
    card.dataset.programId = program.id;

    let detailsHTML = '';
    categoryOrder.forEach(key => {
        if (!visibleCategories[key]) return;

        let value = '';
        let highlight = false;

        switch (key) {
            case 'passingRate':
                value = `${program.passingRate}%`;
                highlight = true;
                break;
            case 'tuition':
                value = program.tuition;
                break;
            case 'type':
                value = program.type;
                break;
            case 'location':
                value = program.location;
                break;
            case 'examinees':
                value = `${program.totalPassers}/${program.totalExaminees}`;
                break;
            case 'firstTimers':
                value = `${program.firstTimePassers}/${program.firstTimeExaminees}`;
                break;
            case 'repeaters':
                value = `${program.repeaterPassers}/${program.repeaterExaminees}`;
                break;
            case 'topnotchers':
                value = program.topnotchers;
                break;
            default:
                return;
        }

        detailsHTML += row(categoryMeta[key].label, value, highlight);
    });

    card.innerHTML = `
        <div class="delete-indicator"><i class="bi bi-x-lg"></i></div>
        <div class="card-header-custom">
            <img src="${program.universityLogo}" class="card-university-logo">
            <h3 class="card-program-name">${program.universityName}</h3>
            <p class="card-university-name">${program.programName}</p>
        </div>
        <div class="card-body-custom">${detailsHTML}</div>
    `;

    card.addEventListener('click', () => {
        if (deleteMode) toggleCardSelection(program.id, card);
    });

    return card;
}


function row(label, value, highlight = false) {
    return `
        <div class="card-detail-row">
            <span class="card-detail-label">${label}</span>
            <span class="card-detail-value ${highlight ? 'highlight' : ''}">
                ${value}
            </span>
        </div>`;
}

/*************************************************
 * CATEGORIES COLUMN
 *************************************************/
function createCategoriesColumn() {
    const column = document.createElement('div');
    column.className = 'categories-column';

    const labelsHtml = categoryOrder
        .filter(key => visibleCategories[key])
        .map(key => `<div class="category-label-row">${categoryMeta[key].label}</div>`)
        .join('');

    column.innerHTML = `
        <div class="categories-header">
            <div class="categories-header-title">Categories</div>
        </div>
        <div class="categories-body">
            ${labelsHtml}
        </div>`;

    return column;
}


/*************************************************
 * DELETE MODE
 *************************************************/
function toggleCardSelection(programId, card) {
    if (selectedForDeletion.has(programId)) {
        selectedForDeletion.delete(programId);
        card.classList.remove('selected-for-delete');
    } else {
        selectedForDeletion.add(programId);
        card.classList.add('selected-for-delete');
    }

    const btn = document.getElementById('btnDelete');
    if (btn && deleteMode) {
        btn.disabled = selectedForDeletion.size === 0;
    }
}

/*************************************************
 * UI CONTROLS
 *************************************************/
function initShowHideDropdown() {
    const btn = document.getElementById('btnShowHide');
    const menu = document.getElementById('showHideMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', e => {
        e.stopPropagation();
        menu.classList.toggle('show');
    });

    menu.addEventListener('click', e => {
        e.stopPropagation();
    });

    menu.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            const key = cb.id.replace('cat-', '');
            const map = {
                passers: 'passingRate',
                tuition: 'tuition',
                type: 'type',
                location: 'location',
                examinees: 'examinees',
                firsttimers: 'firstTimers',
                repeaters: 'repeaters',
                topnotchers: 'topnotchers'
            };
            const categoryKey = map[key];
            visibleCategories[categoryKey] = cb.checked;
            if (cb.checked) {
                categoryOrder = [categoryKey, ...categoryOrder.filter(k => k !== categoryKey)];
            }
            renderProgramCards();
        });
    });

    document.addEventListener('click', e => {
        if (e.target.closest('#btnShowHide') || e.target.closest('#showHideMenu')) return;
        menu.classList.remove('show');
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

    if (!compareModal || !searchInput || !searchResults) return;

    // 🔥 ONE input handler ONLY
    searchInput.addEventListener('input', async function () {
        const query = this.value.trim();

        if (!query) {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
            return;
        }

        // DATABASE SEARCH
        const programs = await searchProgramsFromDB(query);
        const baseName = getBaseCompareProgramName();
        const baseDisplayName = getBaseCompareProgramDisplayName();
        const filteredPrograms = baseName
            ? programs.filter(p => normalizeProgramName(p.program_name) === baseName)
            : programs;

        if (!filteredPrograms.length) {
            searchResults.style.display = 'block';
            const emptyMessage = baseName
                ? `Only ${baseDisplayName || 'the same program'} can be compared`
                : 'No programs found';
            searchResults.innerHTML =
                `<div class="compare-search-item text-muted">${emptyMessage}</div>`;
            return;
        }

        searchResults.style.display = 'block';
        searchResults.innerHTML = filteredPrograms.map(p => `
            <div class="compare-search-item"
                 data-program-id="${p.program_id}"
                 data-program-name="${p.program_name}"
                 data-program-university="${p.university_name}">
                <span class="compare-search-item-name">${p.university_name}</span>
                <span class="compare-search-item-university">${p.program_name}</span>
            </div>
        `).join('');

        // Click to add
        searchResults.querySelectorAll('.compare-search-item').forEach(item => {
            item.addEventListener('click', () => {
            addProgramToCompareList(Number(item.dataset.programId), item.dataset.programName);

                searchInput.value = '';
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
            });
        });
    });

    compareModal.addEventListener('shown.bs.modal', () => {
        updateCompareModal();
        searchInput.focus();
    });

    compareModal.addEventListener('hidden.bs.modal', () => {
        searchInput.value = '';
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
    });
}

// Add program to compare list
function addProgramToCompareList(programId, programName) {
    let list = getCompareIdsFromStorage();
    const baseName = getBaseCompareProgramName();

    if (baseName && normalizeProgramName(programName) !== baseName) {
        const baseDisplayName = getBaseCompareProgramDisplayName() || 'the same program';
        Swal.fire({
            icon: 'info',
            title: 'Only same program',
            text: `Only ${baseDisplayName} can be compared.`,
            confirmButtonColor: '#2441ac',
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
        return;
    }

    if (list.includes(programId)) {
        Swal.fire({
            icon: 'info',
            title: 'Already Added',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });
        return;
    }

    list.unshift(programId);

    localStorage.setItem(
        'dalanCompareList',
        JSON.stringify(list)
    );

    updateCompareModal();
    loadAndRenderCompare();

    Swal.fire({
        icon: 'success',
        title: 'Added!',
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false
    });
}

// Update compare modal content
function updateCompareModal() {
    const ids = getCompareIdsFromStorage();
    const programsList = document.getElementById('compareProgramsList');
    const compareCount = document.getElementById('compareCount');

    if (!programsList || !compareCount) return;

    compareCount.textContent = ids.length;

    if (!ids.length) {
        programsList.innerHTML =
            '<p style="text-align:center;color:#999;padding:2rem;">No programs added yet</p>';
        return;
    }

    programsList.innerHTML = programsData.map(p => `
        <div class="compare-program-item" data-program-id="${p.id}">
            <div style="flex:1;">
                <span class="compare-program-name">${p.universityName}</span>
                <span class="compare-program-university">${p.programName}</span>
            </div>
        </div>
    `).join('');
}

// Remove program from compare list
function removeProgramFromCompareList(programId) {
    let list = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
    list = list.filter(id => id !== Number(programId));
    localStorage.setItem('dalanCompareList', JSON.stringify(list));
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

// init delete
function initDeleteButton() {
    const btn = document.getElementById('btnDelete');
    if (!btn) return;

    btn.addEventListener('click', () => {

        // ENTER DELETE MODE
        if (!deleteMode) {
            deleteMode = true;
            selectedForDeletion.clear();
            btn.classList.add('active');
            btn.innerHTML = '<i class="bi bi-check-lg"></i> Confirm Delete';
            return;
        }

        // CONFIRM DELETE
        if (selectedForDeletion.size === 0) {
            console.log('Deleting IDs:', [...selectedForDeletion]);
            console.log('Before:', getCompareIdsFromStorage());

            Swal.fire({
                icon: 'info',
                title: 'No program selected',
                text: 'Please select at least one program to delete.',
                confirmButtonColor: '#2441ac'
            });
            return;
        }

        // 🔥 DELETE (using FIX 1)
    const idsToDelete = new Set(selectedForDeletion);

    const updatedIds = getCompareIdsFromStorage()
        .filter(id => !idsToDelete.has(Number(id)));

    localStorage.setItem(
        'dalanCompareList',
        JSON.stringify(updatedIds)
    );

        selectedForDeletion.clear();
        deleteMode = false;

        btn.classList.remove('active');
        btn.innerHTML = '<i class="bi bi-trash-fill"></i> Delete';

        loadAndRenderCompare();
        updateCompareModal();
    });
}

function initYearSelect() {
    const yearSelect = document.getElementById('yearSelect');
    if (yearSelect) {
        yearSelect.addEventListener('change', () => {
            loadAndRenderCompare();
            updateChartsByYear();
        });
    }
}

document.addEventListener('click', e => {
    const item = e.target.closest('.compare-program-item');
    if (!item) return;

    const id = item.dataset.programId;
    if (!id) return;

    window.location.href = `/program/${id}`;
});

// function sanitizeCompareList() {
//     const raw = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');

//     const cleanIds = raw
//         .map(item => {
//             if (typeof item === 'number') return item;
//             if (item?.program_id) return item.program_id;
//             if (item?.id) return item.id;
//             return null;
//         })
//         .filter(Boolean);

//     localStorage.setItem(
//         'dalanCompareList',
//         JSON.stringify([...new Set(cleanIds)])
//     );
// }

/*************************************************
 * INIT
 *************************************************/
document.addEventListener('DOMContentLoaded', async () => {
    // sanitizeCompareList();  
    initShowHideDropdown();
    initDeleteButton();
    initYearSelect();
    initAddButton();
    initCompareModal();
    initCharts();

    await loadAndRenderCompare();  
    await updateChartsByYear();
});


