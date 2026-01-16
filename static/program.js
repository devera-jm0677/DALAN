let currentProgram = null;
let bookmarkedIds = new Set();

document.addEventListener('DOMContentLoaded', async function () {
    currentProgram = window.currentProgram;
    ensureCurrentProgramInCompare();

    await loadBookmarkedIds();
    hydrateBookmarkButton();

    initChart(5);
    initMap();
    initYearsSelector();
    initNavigation();
    initSidebarHover();
    initActionButtons();
    initCompareModalCleanup();
});

// BOOKMARK
async function loadBookmarkedIds() {
    try {
        const res = await fetch('/api/user/bookmarked-ids', {
            credentials: 'same-origin'
        });

        if (!res.ok) return;

        const ids = await res.json();
        bookmarkedIds = new Set(ids);
    } catch (err) {
        console.warn('Failed to load bookmarks');
    }
}
function hydrateBookmarkButton() {
    const btn = document.querySelector('.bookmark-btn');
    if (!btn || !currentProgram) return;

    const icon = btn.querySelector('i');
    const label = btn.querySelector('span');

    if (bookmarkedIds.has(currentProgram.program_id)) {
        icon.className = 'bi bi-bookmark-fill';
        label.textContent = 'Saved';
        btn.classList.add('saved');
    } else {
        icon.className = 'bi bi-bookmark';
        label.textContent = 'Save';
        btn.classList.remove('saved');
    }
}

/* =======================
   PROGRAM FETCH
======================= */
// function getProgramIdFromUrl() {
//     const pathParts = window.location.pathname.split('/');
//     const programIdIndex = pathParts.indexOf('program') + 1;
//     return pathParts[programIdIndex];
// }
/* =======================
   PAGE CONTENT
======================= */
function updatePageContent(program) {
    document.querySelector('.program-name').textContent = program.program_name;
    document.querySelector('.university-name').textContent = program.university_name;

    const desc = document.querySelector('.program-description-text');
    if (desc) {
        desc.textContent = program.long_description || 'No description available.';
    }

    document.querySelector('[data-info="type"]').textContent = program.institution_type;
    document.querySelector('[data-info="licensure"]').textContent =
        program.is_licensure_based ? 'Licensure' : 'Non-Licensure';

    document.querySelector('[data-info="location"]').textContent = program.location;
}

/* =======================
   CHART (RESTORED)
======================= */
let passingRateChart;

function getChartDataFromDB(years) {
    const results = window.DALAN.exam_results[String(years)] || [];
    const sorted = [...results].reverse();

    return {
        labels: sorted.map(r => r.year),
        data: sorted.map(r => r.passing_rate)
    };
}

function initChart(years = 5) {
    const ctx = document.getElementById('passingRateChart');
    if (!ctx) return;

    const data = getChartDataFromDB(years);

    if (passingRateChart) passingRateChart.destroy();

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
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 100 },
                x: { grid: { display: false } }
            }
        }
    });

    updatePerformanceSummary(years);
}

function initYearsSelector() {
    const yearsSelect = document.getElementById('yearsSelect');
    if (!yearsSelect) return;

    yearsSelect.addEventListener('change', function () {
        initChart(parseInt(this.value));
    });
}

/* =======================
   SUMMARY
======================= */

function updatePerformanceSummary(years) {
    const summaryEl = document.getElementById('performanceSummary');
    if (!summaryEl) return;

    const data = window.DALAN.exam_results[String(years)] || [];

    if (!data.length) {
        summaryEl.textContent = 'No exam data available.';
        return;
    }

    const parsed = data
        .map(r => ({
            year: Number(r.year),
            rate: Number(r.passing_rate)
        }))
        .filter(r => !isNaN(r.year) && !isNaN(r.rate));

    if (!parsed.length) {
        summaryEl.textContent = 'No exam data available.';
        return;
    }

    parsed.sort((a, b) => a.year - b.year);

    const rates = parsed.map(r => r.rate);
    const avg = rates.reduce((a, b) => a + b, 0) / rates.length;
    const min = Math.min(...rates);
    const max = Math.max(...rates);

    const variance = rates.reduce((sum, r) => sum + Math.pow(r - avg, 2), 0) / rates.length;
    const stdDev = Math.sqrt(variance);

    let trend = 'stable';
    if (rates.length >= 2) {
        const delta = rates[rates.length - 1] - rates[0];
        if (delta > 2) {
            trend = 'improving';
        } else if (delta < -2) {
            trend = 'declining';
        }
    }

    let consistency = 'variable';
    if (stdDev <= 5) {
        consistency = 'consistent';
    } else if (stdDev <= 10) {
        consistency = 'moderately consistent';
    }

    let performanceTone = 'weak';
    if (avg >= 75) {
        performanceTone = 'strong';
    } else if (avg >= 60) {
        performanceTone = 'solid';
    } else if (avg >= 50) {
        performanceTone = 'fair';
    }

    const programName = window.DALAN.program.program_name || 'this program';
    const abbrev = window.DALAN.program.university_abbreviation
        || window.DALAN.program.university_name
        || 'the university';
    const yearsCount = parsed.length;

    summaryEl.textContent =
        `Based on PRC licensure examination data from the last ${yearsCount} years, ` +
        `the ${programName} program at ${abbrev} demonstrates a ${performanceTone} performance. ` +
        `The program recorded an average passing rate of ${avg.toFixed(2)}%, ` +
        `with results ranging from ${min.toFixed(2)}% to ${max.toFixed(2)}%. ` +
        `Overall performance is considered ${consistency}, showing a ${trend} trend over time.`;
}

/* =======================
   MAP (RESTORED)
======================= */
function initMap() {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;

    const lat = parseFloat(mapDiv.dataset.lat);
    const lng = parseFloat(mapDiv.dataset.lon);

    const map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    L.marker([lat, lng]).addTo(map);

    setTimeout(() => map.invalidateSize(), 100);
}

/* =======================
   COMPARE STORAGE
======================= */
function getCompareList() {
    return JSON.parse(localStorage.getItem('dalanCompareList') || '[]');
}

function saveCompareList(list) {
    localStorage.setItem('dalanCompareList', JSON.stringify(list));
}

function normalizeProgramName(name) {
    return (name || '').trim().toLowerCase();
}

function getCompareBaseProgramName(list) {
    const entry = list.find(p => p && (p.program_name || p.name || p.programName));
    const name = entry?.program_name || entry?.name || entry?.programName;
    return normalizeProgramName(name);
}

function getCompareBaseProgramDisplayName(list) {
    const entry = list.find(p => p && (p.program_name || p.name || p.programName));
    return entry?.program_name || entry?.name || entry?.programName || currentProgram?.program_name || '';
}

function ensureCurrentProgramInCompare() {
    if (!currentProgram || !currentProgram.program_id) return;

    const list = [{
        program_id: currentProgram.program_id,
        program_name: currentProgram.program_name,
        university_name: currentProgram.university_name,
        location: currentProgram.location,
        institution_type: currentProgram.institution_type,
        locked: true
    }];
    saveCompareList(list);
}


/* =======================
   COMPARE MODAL
======================= */
function renderCompareModal() {
    const container = document.getElementById('compareProgramsList');
    if (!container) return;

    const list = getCompareList();
    const count = document.getElementById('compareCount');
    if (count) {
        count.textContent = String(list.length);
    }

    container.innerHTML = list.map(p => `
        <div class="compare-program-item ${p.locked ? 'locked' : ''}"
            data-program-id="${p.program_id}">
            <div style="flex: 1;">
                <span class="compare-program-name">${p.program_name}</span>
                <span class="compare-program-university">${p.university_name}</span>
            </div>
            ${
                p.locked
                ? `<span class="locked-badge"></span>`
                : `<button class="btn-delete-program" data-program-id="${p.program_id}" aria-label="Remove program">
                        <i class="bi bi-trash-fill"></i>
                   </button>`
            }
        </div>
    `).join('');

    initDeleteButtons();
}

document.getElementById('btnGoCompare').onclick = () => {
    const ids = getCompareList().map(p => p.program_id);

    if (ids.length < 2) {
        showToast('Select at least 2 programs to compare');
        return;
    }

    window.location.href = `/compare?ids=${ids.join(',')}`;
};

function initDeleteButtons() {
    document.querySelectorAll('.btn-delete-program').forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.programId;
            if (!id) return;

            const list = getCompareList().filter(p => p.program_id !== Number(id));
            saveCompareList(list);

            showToast('Program removed from comparison');
            renderCompareModal();
        };
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.zIndex = 9999;
    toast.style.background = '#222';
    toast.style.color = '#fff';
    toast.style.padding = '10px 14px';
    toast.style.borderRadius = '8px';

    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2500);
}

function updateGoCompareButton() {
    const btn = document.getElementById('btnGoCompare');
    if (!btn) return;
    btn.disabled = getCompareList().length < 2;
}

function initCompareSearch() {
    const input = document.getElementById('compareSearchInput');
    const results = document.getElementById('compareSearchResults');

    if (!input || !results) return;

    input.oninput = async () => {
        const q = input.value.trim();
        results.innerHTML = '';

        if (q.length < 2) {
            results.style.display = 'none';
            return;
        }

        const res = await fetch(`/api/programs/search?q=${encodeURIComponent(q)}`);
        const programs = await res.json();

        const compareList = getCompareList();
        const baseName = getCompareBaseProgramName(compareList);
        const baseDisplayName = getCompareBaseProgramDisplayName(compareList);
        const filteredPrograms = baseName
            ? programs.filter(p => normalizeProgramName(p.program_name) === baseName)
            : programs;

        if (!filteredPrograms.length) {
            const emptyMessage = baseName
                ? `Only ${baseDisplayName || 'the same program'} can be compared`
                : 'No programs found';
            results.innerHTML = `<div class="compare-search-item text-muted">${emptyMessage}</div>`;
            results.style.display = 'block';
            return;
        }

        filteredPrograms.forEach(p => {
            if (compareList.some(x => x.program_id === p.program_id)) return;

            const div = document.createElement('div');
            div.className = 'compare-search-item';
            div.innerHTML = `
                <span class="compare-search-item-name">${p.program_name}</span>
                <span class="compare-search-item-university">${p.university_name}</span>
            `;

            div.onclick = () => {
                addProgramToCompare(p);
                showToast('Program added to comparison');
                input.value = '';
                results.innerHTML = '';
                results.style.display = 'none';
            };

            results.appendChild(div);
        });
        results.style.display = 'block';
    };
}

function addProgramToCompare(program) {
    const list = getCompareList();
    const baseName = getCompareBaseProgramName(list);

    if (baseName && normalizeProgramName(program.program_name) !== baseName) {
        const baseDisplayName = getCompareBaseProgramDisplayName(list) || 'the same program';
        showToast(`Only ${baseDisplayName} can be compared`);
        return;
    }

    if (list.some(p => p.program_id === program.program_id)) return;

    list.push({
        program_id: program.program_id,
        program_name: program.program_name,
        university_name: program.university_name,
        location: program.location,
        institution_type: program.institution_type,
        locked: false
    });

    saveCompareList(list);
    renderCompareModal();
    updateGoCompareButton();
}

/* =======================
   MODAL CLEANUP
======================= */
function initCompareModalCleanup() {
    const modal = document.getElementById('compareModal');
    if (!modal) return;

    modal.addEventListener('hidden.bs.modal', () => {
        // Remove Bootstrap modal leftovers
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
    });
}

/* =======================
   ACTION BUTTONS
======================= */

function initActionButtons() {
    const saveBtn = document.querySelector('.save-btn');
    const compareBtn = document.querySelector('.compare-btn');
    const visitBtn = document.querySelector('.visit-btn');
    const viewMapBtn = document.getElementById('btnViewMap');
    const modalEl = document.getElementById('compareModal');

    /* SAVE */
    if (saveBtn && currentProgram?.program_id) {
        saveBtn.addEventListener('click', async () => {
            const res = await fetch('/api/bookmark', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ program_id: currentProgram.program_id })
            });

            if (!res.ok) return;

            const data = await res.json();
            if (!data.success) return;

            if (data.action === 'added') {
                bookmarkedIds.add(currentProgram.program_id);
            } else {
                bookmarkedIds.delete(currentProgram.program_id);
            }

            hydrateBookmarkButton();
        });
    }

    /* COMPARE */
    if (compareBtn) {
        compareBtn.addEventListener('click', () => {
            ensureCurrentProgramInCompare();
            renderCompareModal();
            updateGoCompareButton();

            bootstrap.Modal.getOrCreateInstance(
                document.getElementById('compareModal')
            ).show();

            initCompareSearch();
        });
    }


    /* VISIT UNIVERSITY */
    if (visitBtn) {
        visitBtn.addEventListener('click', () => {
            if (currentProgram?.university_id) {
                window.location.href = `/university/${currentProgram.university_id}`;
            }
        });
    }

    /* VIEW LARGER MAP */
    if (viewMapBtn) {
        viewMapBtn.addEventListener('click', () => {
            const mapDiv = document.getElementById('map');
            if (!mapDiv) return;

            const lat = mapDiv.dataset.lat;
            const lng = mapDiv.dataset.lon;

            window.open(
                `https://www.google.com/maps?q=${lat},${lng}`,
                '_blank'
            );
        });
    }
}

function addCurrentProgramToCompare(programId) {
    let list = JSON.parse(localStorage.getItem('dalanCompareList') || '[]');

    if (!list.includes(programId)) {
        list.push(programId);
        localStorage.setItem('dalanCompareList', JSON.stringify(list));
    }

    window.location.href = '/compare';
}

/* =======================
   UI HELPERS
======================= */
function initNavigation() {}
function initSidebarHover() {}

window.addEventListener('resize', () => {
    if (passingRateChart) passingRateChart.resize();
});
