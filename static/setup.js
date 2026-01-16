// DALAN Preferences Modal JavaScript
// Aligned with dalandb.sql and app.py

console.log('=== PREFERENCES MODAL JS LOADING ===');

// Global Data Arrays
let SHS_STRANDS = [];
let PROGRAMS = [];
let INSTITUTION_TYPES = [];
let BUDGET_RANGES = [];
let municipalities = [];
let municipalityDocListenerAttached = false;

// Global State
let currentStep = 1;
let preferences = {
    strand_id: null,
    program_ids: [],
    municipality_id: null,
    type_id: null,
    budget_id: null
};

const isSetupFlow = () => window.location.pathname === '/setup';
const hasSwal = () => typeof Swal !== 'undefined' && Swal?.fire;

function showAlert({ icon, title, text }) {
    if (hasSwal()) {
        Swal.fire({
            icon,
            title,
            text,
            confirmButtonColor: '#2441AC'
        });
        return;
    }

    alert(`${title}\n${text}`);
}

async function loadPreferenceData() {
    try {
        console.log('Attempting to fetch API data...');
        const responses = await Promise.all([
            fetch('/api/shs_strands'),
            fetch('/api/programs'),
            fetch('/api/institution_type'),
            fetch('/api/budget_ranges'),
            fetch('/api/municipalities')
        ]);

        for (const res of responses) {
            if (!res.ok) throw new Error(`API Endpoint ${res.url} returned ${res.status}`);
        }

        SHS_STRANDS = await responses[0].json();
        PROGRAMS = await responses[1].json();
        INSTITUTION_TYPES = await responses[2].json();
        BUDGET_RANGES = await responses[3].json();
        municipalities = await responses[4].json();

        console.log('API Data loaded successfully');
        renderStep(1);

    } catch (error) {
        console.error('API Fetch failed, using MOCK DATA. Reason:', error.message);
        showAlert({
            icon: 'error',
            title: 'Failed to Load Data',
            text: 'Could not load preference options from the server. Please try again later.'
        });
    }
}

// Initialize Modal
// document.addEventListener('DOMContentLoaded', function() {
//     if (document.getElementById('preferencesModal')) {
//         setupEventListeners();
//         loadPreferenceData();
//     } else {
//         console.error('CRITICAL: preferencesModal element not found!');
//     }
// });
// 1. Remove any immediate calls to loadPreferenceData() at the top level or inside DOMContentLoaded
// 2. Update openPreferencesModal to handle initialization

// setup.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup listeners so buttons work when the modal is eventually opened
    if (document.getElementById('preferencesModal')) {
        setupPreferencesEventListeners();
    }

    // 2. AUTO-OPEN for New Users only
    // Logic: If the URL is exactly '/setup', open it automatically
    if (window.location.pathname === '/setup') {
        openPreferencesModal();
    }
});

function openPreferencesModal(prefill = null) {
    const modal = document.getElementById('preferencesModal');
    if (!modal) return;

    setupPreferencesEventListeners();

    // Show the modal by removing the hidden class
    modal.classList.remove('hidden');
    
    currentStep = 1;

    // Load API data for the dropdowns/options
    loadPreferenceData();

    // If data is passed (Existing User flow), fill the state
    if (prefill) {
        preferences = {
            strand_id: prefill.strandId || null,
            program_ids: prefill.programIds || [],
            municipality_id: prefill.municipalityId || null,
            type_id: prefill.institutionTypeId || null,
            budget_id: prefill.budgetId || null
        };
    }
}

// function openPreferencesModal(prefill = null) {
//     const modal = document.getElementById('preferencesModal');
//     if (!modal) {
//         console.error('Modal element not found');
//         return;
//     }

//     // Show the modal
//     modal.classList.remove('hidden');
    
//     // Initialize listeners only once
//     setupEventListeners();

//     // Reset current step to 1 and load data
//     currentStep = 1;
//     loadPreferenceData(); 

//     if (prefill) {
//         // Map the database names to the preference state
//         preferences = {
//             strand_id: prefill.strand_id || null,
//             program_ids: prefill.program_ids || [],
//             municipality_id: prefill.municipality_id || null,
//             district_id: prefill.district_id || null,
//             type_id: prefill.type_id || null,
//             budget_id: prefill.budget_id || null
//         };
//     }
// }

// 3. Prevent multiple event listener attachments
let listenersAttached = false;
function setupPreferencesEventListeners() {
    if (listenersAttached) return;

    const modal = document.getElementById('preferencesModal');
    if (!modal) return;

    modal.addEventListener('click', (event) => {
        const close = event.target.closest('#closeButton');
        if (close) {
            event.preventDefault();
            closeModal();
            return;
        }

        const skip = event.target.closest('#skipButton');
        if (skip) {
            event.preventDefault();
            skipPreferences();
            return;
        }

        const back = event.target.closest('#backButton');
        if (back) {
            event.preventDefault();
            goToPreviousStep();
            return;
        }

        const next = event.target.closest('#nextButton');
        if (next) {
            event.preventDefault();
            goToNextStep();
            return;
        }

        const categoryItem = event.target.closest('.category-item');
        if (categoryItem) {
            const step = parseInt(categoryItem.getAttribute('data-step'));
            if (step < currentStep || isStepCompleted(step) || step === currentStep) {
                goToStep(step);
            }
        }
    });

    listenersAttached = true;
}

window.openPreferencesModal = openPreferencesModal;

// --------------------------------------------------------------------------
// RENDER LOGIC
// --------------------------------------------------------------------------

function renderStep(step) {
    currentStep = step;
    
    const contentBody = document.getElementById('contentBody');
    const contentTitle = document.getElementById('contentTitle');
    const contentSubtitle = document.getElementById('contentSubtitle');
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');
    const helpLink = document.getElementById('helpLink');

    if (!contentBody) {
        console.error('CRITICAL: contentBody element not found!');
        return;
    }

    try {
        // Button States
        if (backButton) backButton.disabled = (step === 1);
        if (nextButton) {
            if (step === 6) {
                nextButton.textContent = isSetupFlow() ? 'Get Started' : 'Save';
            } else {
                nextButton.innerHTML = `Next <svg width="12" height="24" viewBox="0 0 12 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.343 12L10.414 19.071L9 20.485L1.222 12.707C1.03453 12.5195 0.929214 12.2652 0.929214 12C0.929214 11.7348 1.03453 11.4805 1.222 11.293L9 3.515L10.414 4.929L3.343 12Z" fill="white"/></svg>`;
            }
        }

        // Step Routing
        switch (step) {
            case 1:
                renderSHSStrandStep(contentTitle, contentSubtitle, contentBody);
                if (helpLink) helpLink.style.display = 'block';
                break;
            case 2:
                renderProgramsStep(contentTitle, contentSubtitle, contentBody);
                if (helpLink) helpLink.style.display = 'block';
                break;
            case 3:
                renderLocationStep(contentTitle, contentSubtitle, contentBody);
                if (helpLink) helpLink.style.display = 'block';
                break;
            case 4:
                renderInstitutionStep(contentTitle, contentSubtitle, contentBody);
                if (helpLink) helpLink.style.display = 'block';
                break;
            case 5:
                renderBudgetStep(contentTitle, contentSubtitle, contentBody);
                if (helpLink) helpLink.style.display = 'block';
                break;
            case 6:
                renderCompletionStep(contentTitle, contentSubtitle, contentBody);
                if (helpLink) helpLink.style.display = 'none';
                break;
        }

        updateProgress();
        updateCategoryStates();
        
    } catch (err) {
        console.error("Error during rendering step " + step, err);
        contentBody.innerHTML = `<div class="alert alert-danger">Error rendering content: ${err.message}</div>`;
    }
}

function renderSHSStrandStep(titleEl, subtitleEl, bodyEl) {
    titleEl.textContent = 'SHS Strand';
    subtitleEl.textContent = 'What is your Senior High School strand?';

    let html = '<div class="radio-options">';
    SHS_STRANDS.forEach((strand, index) => {
        const isChecked = preferences.strand_id === strand.strand_id ? 'checked' : '';
        html += `
            <div>
                <input 
                    type="radio" 
                    id="strand-${index}" 
                    class="radio-option" 
                    name="strand" 
                    value="${strand.strand_id}" 
                    ${isChecked}
                    onchange="handleStrandChange(this)">
                <label for="strand-${index}" class="radio-label">${strand.strand_name}</label>
            </div>
        `;
    });
    html += '</div>';
    bodyEl.innerHTML = html;
}

function renderProgramsStep(titleEl, subtitleEl, bodyEl) {
    titleEl.textContent = 'Target Programs';
    subtitleEl.textContent = 'What programs are you interested in?';

    let html = '<div class="programs-list">';
    PROGRAMS.forEach((program, index) => {
        const isChecked = preferences.program_ids.includes(program.interest_program_id) ? 'checked' : '';
        html += `
            <div>
                <input 
                    type="checkbox" 
                    id="program-${index}" 
                    class="program-checkbox" 
                    value="${program.interest_program_id}" 
                    ${isChecked}
                    onchange="handleProgramChange(this)">
                <label for="program-${index}" class="program-label">${program.program_name}</label>
            </div>
        `;
    });
    html += '</div>';
    bodyEl.innerHTML = html;
}

function renderLocationStep(titleEl, subtitleEl, bodyEl) {
    titleEl.textContent = 'Location';
    subtitleEl.textContent = 'Where do you want to study?';

    const selectedMunicipality = municipalities.find(
        m => m.municipality_id === preferences.municipality_id
    );
    const selectedName = selectedMunicipality ? selectedMunicipality.municipality_name : '';

    const html = `
        <div class="form-field">
            <label class="form-label">Province</label>
            <input type="text" class="form-input" value="Pangasinan" disabled>
        </div>

        <div class="form-field location-autocomplete">
            <label for="municipalitySearch" class="form-label">City / Municipality</label>
            <input
                type="text"
                id="municipalitySearch"
                class="form-input"
                placeholder="Type a city or municipality"
                autocomplete="off"
                value="${selectedName}">
            <div class="autocomplete-results" id="municipalityResults" role="listbox" aria-label="Location suggestions"></div>
        </div>
    `;

    bodyEl.innerHTML = html;
    setupMunicipalityAutocomplete();
}

function renderInstitutionStep(titleEl, subtitleEl, bodyEl) {
    titleEl.textContent = 'Institution Type';
    subtitleEl.textContent = 'What type of institution do you prefer?';

    let html = '<div class="radio-options">';
    INSTITUTION_TYPES.forEach(type => {
        const isChecked = preferences.type_id === type.type_id ? 'checked' : '';
        html += `
            <div>
                <input
                    type="radio"
                    id="institution-${type.type_id}"
                    class="radio-option"
                    name="institution"
                    value="${type.type_id}"
                    ${isChecked}
                    onchange="handleInstitutionChange(this)">
                <label for="institution-${type.type_id}" class="radio-label">
                    ${type.type_name}
                </label>
            </div>
        `;
    });
    html += '</div>';
    bodyEl.innerHTML = html;
}

function renderBudgetStep(titleEl, subtitleEl, bodyEl) {
    titleEl.textContent = 'Budget';
    subtitleEl.textContent = 'What is your budget range per semester? (Optional)';

    let html = '<div class="radio-options">';
    BUDGET_RANGES.forEach(budget => {
        const isChecked = preferences.budget_id === budget.budget_id ? 'checked' : '';
        html += `
            <div>
                <input
                    type="radio"
                    id="budget-${budget.budget_id}"
                    class="radio-option"
                    name="budget"
                    value="${budget.budget_id}"
                    ${isChecked}
                    onchange="handleBudgetChange(this)">
                <label for="budget-${budget.budget_id}" class="radio-label">
                    ${budget.label}
                </label>
            </div>
        `;
    });
    html += '</div>';
    bodyEl.innerHTML = html;
}

function renderCompletionStep(titleEl, subtitleEl, bodyEl) {
    titleEl.textContent = '100% Setup Complete!';
    subtitleEl.textContent = 'You\'re all set to explore programs and universities';

    const { strandName, programNames, locationName, typeName, budgetName } = getPreferenceSummary();

    const html = `
        <div class="completion-container">
            <svg class="completion-icon" width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="58" stroke="#2441AC" stroke-width="4" fill="#E8F4FD"/>
                <path d="M45 60L55 70L75 50" stroke="#2441AC" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
            <h2 class="completion-title">Your Preferences:</h2>
            
            <div class="completion-summary">
                <div class="summary-item">
                    <span class="summary-label">SHS Strand:</span>
                    <span class="summary-value">${strandName}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Target Programs:</span>
                    <span class="summary-value">${programNames}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Location:</span>
                    <span class="summary-value">${locationName}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Institution Type:</span>
                    <span class="summary-value">${typeName}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Budget:</span>
                    <span class="summary-value">${budgetName}</span>
                </div>
            </div>
            
            <p class="completion-note">You can always update these preferences in your account settings.</p>
        </div>
    `;

    bodyEl.innerHTML = html;
}

function getPreferenceSummary() {
    const strand = SHS_STRANDS.find(i => i.strand_id === preferences.strand_id);
    const strandName = strand ? strand.strand_name : 'Not set';

    const programNames = preferences.program_ids.length
        ? PROGRAMS
            .filter(p => preferences.program_ids.includes(p.interest_program_id))
            .map(p => p.program_name)
            .join(', ')
        : 'Not set';

    const municipality = municipalities.find(i => i.municipality_id === preferences.municipality_id);
    const locationName = municipality ? municipality.municipality_name : 'Not set';

    const institutionType = INSTITUTION_TYPES.find(i => i.type_id === preferences.type_id);
    const typeName = institutionType ? institutionType.type_name : 'Not set';

    const budget = BUDGET_RANGES.find(i => i.budget_id === preferences.budget_id);
    const budgetName = budget ? budget.label : 'Not set';

    return { strandName, programNames, locationName, typeName, budgetName };
}

function updateProfilePreferencesUI() {
    const prefItems = document.querySelectorAll('.preference-item');
    if (prefItems.length < 3) return;

    const { programNames, locationName, typeName } = getPreferenceSummary();

    prefItems[0].querySelector('.preference-value').textContent = programNames;
    prefItems[1].querySelector('.preference-value').textContent = locationName;
    prefItems[2].querySelector('.preference-value').textContent = typeName;
}

function saveProfilePreferencesToStorage() {
    const { strandName, programNames, locationName, typeName } = getPreferenceSummary();

    localStorage.setItem(
        'dalanProfilePreferences',
        JSON.stringify({
            strandName,
            programNames,
            locationName,
            typeName
        })
    );
}

function updateDashboardCardsFromSummary() {
    const cards = document.querySelectorAll('.dashboard-card');
    if (cards.length < 3) return;

    const { strandName, locationName } = getPreferenceSummary();

    const locationText = locationName !== 'Not set'
        ? `${locationName}.`
        : 'No preferred location set.';
    cards[1].querySelector('.card-content').textContent = locationText;

    const strandText = strandName !== 'Not set'
        ? `Your SHS Strand: ${strandName}`
        : 'SHS Strand not set.';
    cards[2].querySelector('.card-content').textContent = strandText;
}

// --------------------------------------------------------------------------
// EVENT HANDLERS
// --------------------------------------------------------------------------

function handleStrandChange(radio) {
    preferences.strand_id = parseInt(radio.value);
}

function handleProgramChange(checkbox) {
    const id = parseInt(checkbox.value);
    if (checkbox.checked) {
        preferences.program_ids.push(id);
    } else {
        preferences.program_ids = preferences.program_ids.filter(p => p !== id);
    }
}

function setupMunicipalityAutocomplete() {
    const input = document.getElementById('municipalitySearch');
    const results = document.getElementById('municipalityResults');
    if (!input || !results) return;

    let currentMatches = [];

    const clearResults = () => {
        results.innerHTML = '';
        results.style.display = 'none';
    };

    const renderResults = (query) => {
        const value = query.trim().toLowerCase();
        if (!value) {
            currentMatches = [];
            clearResults();
            return;
        }

        currentMatches = municipalities
            .filter(m => m.municipality_name.toLowerCase().includes(value))
            .slice(0, 8);

        if (!currentMatches.length) {
            clearResults();
            return;
        }

        results.innerHTML = currentMatches.map(m => `
            <button type="button" class="autocomplete-item" data-id="${m.municipality_id}" role="option">
                ${m.municipality_name}
            </button>
        `).join('');
        results.style.display = 'block';
    };

    const commitSelection = (municipality) => {
        if (!municipality) return;
        preferences.municipality_id = municipality.municipality_id;
        input.value = municipality.municipality_name;
        clearResults();
    };

    input.addEventListener('input', () => {
        preferences.municipality_id = null;
        renderResults(input.value);
    });

    input.addEventListener('focus', () => {
        renderResults(input.value);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        if (currentMatches.length === 1) {
            commitSelection(currentMatches[0]);
            return;
        }

        const exact = municipalities.find(
            m => m.municipality_name.toLowerCase() === input.value.trim().toLowerCase()
        );
        if (exact) {
            commitSelection(exact);
        } else {
            clearResults();
        }
    });

    input.addEventListener('blur', () => {
        const exact = municipalities.find(
            m => m.municipality_name.toLowerCase() === input.value.trim().toLowerCase()
        );
        if (exact) {
            preferences.municipality_id = exact.municipality_id;
        } else {
            preferences.municipality_id = null;
        }
        setTimeout(() => {
            const active = document.activeElement;
            if (active && active.closest('.location-autocomplete')) return;
            clearResults();
        }, 0);
    });

    results.addEventListener('click', (event) => {
        const item = event.target.closest('.autocomplete-item');
        if (!item) return;
        const id = parseInt(item.dataset.id);
        const selected = municipalities.find(m => m.municipality_id === id);
        commitSelection(selected);
    });

    if (!municipalityDocListenerAttached) {
        document.addEventListener('click', (event) => {
            const wrapper = event.target.closest('.location-autocomplete');
            if (wrapper) return;
            const activeResults = document.getElementById('municipalityResults');
            if (activeResults) {
                activeResults.innerHTML = '';
                activeResults.style.display = 'none';
            }
        });
        municipalityDocListenerAttached = true;
    }
}

function handleInstitutionChange(radio) {
    preferences.type_id = parseInt(radio.value);
}

function handleBudgetChange(radio) {
    preferences.budget_id = parseInt(radio.value);
}

// --------------------------------------------------------------------------
// VALIDATION & NAVIGATION
// --------------------------------------------------------------------------

function isStepCompleted(step) {
    switch (step) {
        case 1: return preferences.strand_id !== null;
        case 2: return preferences.program_ids.length > 0;
        case 3: return preferences.municipality_id !== null;
        case 4: return preferences.type_id !== null;
        case 5: return preferences.budget_id !== null;
        case 6: return false;
        default: return false;
    }
}

function getCompletedSteps() {
    let completed = 0;
    for (let i = 1; i <= 5; i++) {
        if (isStepCompleted(i)) completed++;
    }
    return completed;
}

function updateProgress() {
    const completed = getCompletedSteps();
    const total = 5; 
    const percentage = (completed / total) * 100;
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
        progressFill.setAttribute('aria-valuenow', percentage);
    }
    if (progressText) {
        progressText.textContent = `${completed}/6 completed`;
    }
}

function updateCategoryStates() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        const step = parseInt(item.getAttribute('data-step'));
        item.classList.remove('done', 'current', 'pending');
        
        if (step < currentStep && isStepCompleted(step)) {
            item.classList.add('done');
        } else if (step > currentStep && isStepCompleted(step)) {
            item.classList.add('done');
        } else if (step === currentStep) {
            item.classList.add('current');
        } else {
            item.classList.add('pending');
        }
    });
}

function goToNextStep() {
    if (currentStep < 5) {
        renderStep(currentStep + 1);
    } else if (currentStep === 5) {
        renderStep(6);
    } else if (currentStep === 6) {
        savePreferences();
    }
}

function goToPreviousStep() {
    if (currentStep > 1) {
        renderStep(currentStep - 1);
    }
}

function goToStep(step) {
    if (step >= 1 && step <= 6) {
        renderStep(step);
    }
}

async function savePreferences() {
    console.log('SAVING PREFERENCES (Raw):', preferences);

    const payload = {
        shsStrandId: preferences.strand_id,
        programIds: preferences.program_ids,
        municipalityId: preferences.municipality_id,
        institutionTypeId: preferences.type_id,
        budgetId: preferences.budget_id
    };

    try {
        const res = await fetch('/api/setup/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const contentType = res.headers.get('content-type');

        // 🔐 Safely parse response
        let data = null;
        if (contentType && contentType.includes('application/json')) {
            data = await res.json();
        }

        if (!res.ok) {
            throw new Error(
                data?.error ||
                `Save failed (HTTP ${res.status})`
            );
        }

        if (isSetupFlow()) {
            if (hasSwal()) {
                Swal.fire({
                    icon: 'success',
                    title: 'Setup Complete!',
                    text: 'Your preferences have been saved.',
                    confirmButtonColor: '#2441AC'
                }).then(() => {
                    window.location.href = '/dashboard';
                });
            } else {
                alert('Setup Complete!\nYour preferences have been saved.');
                window.location.href = '/dashboard';
            }
            return;
        }

        saveProfilePreferencesToStorage();

        Swal.fire({
            icon: 'success',
            title: 'Preferences Saved',
            text: 'Your preferences have been updated.',
            confirmButtonColor: '#2441AC'
        }).then(() => {
            updateProfilePreferencesUI();
            updateDashboardCardsFromSummary();
            closeModal();
        });

    } catch (err) {
        console.error('Save failed:', err);

        showAlert({
            icon: 'error',
            title: 'Save Failed',
            text: err.message || 'Unexpected server error.'
        });
    }
}

function skipPreferences() {
    if (!hasSwal()) {
        const confirmed = confirm('Skip Setup?\nYou can always set your preferences later in settings.');
        if (confirmed) window.location.href = '/dashboard';
        return;
    }

    Swal.fire({
        title: 'Skip Setup?',
        text: 'You can always set your preferences later in settings.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#2441AC',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, skip'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/dashboard';
        }
    });
}

function closeModal() {
    const modal = document.getElementById('preferencesModal');
    if (modal) modal.classList.add('hidden');
}

window.handleStrandChange = handleStrandChange;
window.handleProgramChange = handleProgramChange;
window.handleInstitutionChange = handleInstitutionChange;
window.handleBudgetChange = handleBudgetChange;
window.goToPreviousStep = goToPreviousStep;
window.goToNextStep = goToNextStep;
window.skipPreferences = skipPreferences;
window.closeModal = closeModal;

console.log('=== DALAN Preferences Modal Ready ===');
