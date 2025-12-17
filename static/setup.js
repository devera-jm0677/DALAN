// DALAN Preferences Modal JavaScript
// Aligned with dalandb.sql and app.py

console.log('=== PREFERENCES MODAL JS LOADING ===');

// Global Data Arrays
let SHS_STRANDS = [];
let PROGRAMS = [];
let INSTITUTION_TYPES = [];
let BUDGET_RANGES = [];
let districts = [];
let municipalities = [];

// Global State
let currentStep = 1;
let preferences = {
    strand_id: null,
    program_ids: [],
    district_id: null,
    municipality_id: null,
    type_id: null,
    budget_id: null
};

async function loadPreferenceData() {
    try {
        console.log('Attempting to fetch API data...');
        const responses = await Promise.all([
            fetch('/api/shs_strands'),
            fetch('/api/programs'),
            fetch('/api/institution_type'),
            fetch('/api/budget_ranges'),
            fetch('/api/districts'),
            fetch('/api/municipalities')
        ]);

        for (const res of responses) {
            if (!res.ok) throw new Error(`API Endpoint ${res.url} returned ${res.status}`);
        }

        SHS_STRANDS = await responses[0].json();
        PROGRAMS = await responses[1].json();
        INSTITUTION_TYPES = await responses[2].json();
        BUDGET_RANGES = await responses[3].json();
        districts = await responses[4].json();
        municipalities = await responses[5].json();

        console.log('API Data loaded successfully');
        renderStep(1);

    } catch (error) {
        console.error('API Fetch failed, using MOCK DATA. Reason:', error.message);
        Swal.fire({
            icon: 'error',
            title: 'Failed to Load Data',
            text: 'Could not load preference options from the server. Please try again later.',
            confirmButtonColor: '#2441AC'
        });
    }
}

// Initialize Modal
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('preferencesModal')) {
        setupEventListeners();
        loadPreferenceData();
    } else {
        console.error('CRITICAL: preferencesModal element not found!');
    }
});

function setupEventListeners() {
    const closeButton = document.getElementById('closeButton');
    if (closeButton) closeButton.addEventListener('click', closeModal);

    const skipButton = document.getElementById('skipButton');
    if (skipButton) skipButton.addEventListener('click', skipPreferences);

    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');

    if (backButton) backButton.addEventListener('click', goToPreviousStep);
    if (nextButton) nextButton.addEventListener('click', goToNextStep);

    // Sidebar Navigation
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const step = parseInt(this.getAttribute('data-step'));
            if (step < currentStep || isStepCompleted(step)) {
                goToStep(step);
            } else if (step === currentStep) {
                goToStep(step);
            }
        });
    });
}

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
                nextButton.textContent = 'Get Started';
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

    const districtOptions = districts.map(d => `
        <option value="${d.district_id}" ${preferences.district_id === d.district_id ? 'selected' : ''}>
            ${d.district_name}
        </option>
    `).join('');

    let municipalityOptions = '<option value="">Select city / municipality</option>';
    let muniDisabled = 'disabled';
    
    if (preferences.district_id) {
        const filtered = municipalities.filter(m => m.district_id === preferences.district_id);
        municipalityOptions += filtered.map(m => `
            <option value="${m.municipality_id}" ${preferences.municipality_id === m.municipality_id ? 'selected' : ''}>
                ${m.municipality_name}
            </option>
        `).join('');
        muniDisabled = '';
    }

    const html = `
        <div class="form-field">
            <label class="form-label">Province</label>
            <input type="text" class="form-input" value="Pangasinan" disabled>
        </div>

        <div class="form-field">
            <label for="district" class="form-label">District</label>
            <select id="district" class="form-select" onchange="handleDistrictChange(this)">
                <option value="">Select district</option>
                ${districtOptions}
            </select>
        </div>

        <div class="form-field">
            <label for="municipality" class="form-label">City / Municipality</label>
            <select id="municipality" class="form-select" onchange="handleMunicipalityChange(this)" ${muniDisabled}>
                ${municipalityOptions}
            </select>
        </div>
    `;

    bodyEl.innerHTML = html;
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

    const getStrandName = () => {
        const s = SHS_STRANDS.find(i => i.strand_id === preferences.strand_id);
        return s ? s.strand_name : 'Not set';
    };
    
    const getProgramNames = () => {
        if (!preferences.program_ids.length) return 'Not set';
        return PROGRAMS
            .filter(p => preferences.program_ids.includes(p.interest_program_id))
            .map(p => p.program_name)
            .join(', ');
    };

    const getLocationName = () => {
        const m = municipalities.find(i => i.municipality_id === preferences.municipality_id);
        return m ? m.municipality_name : 'Not set';
    };

    const getTypeName = () => {
        const t = INSTITUTION_TYPES.find(i => i.type_id === preferences.type_id);
        return t ? t.type_name : 'Not set';
    };

    const getBudgetName = () => {
        const b = BUDGET_RANGES.find(i => i.budget_id === preferences.budget_id);
        return b ? b.label : 'Not set';
    };

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
                    <span class="summary-value">${getStrandName()}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Target Programs:</span>
                    <span class="summary-value">${getProgramNames()}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Location:</span>
                    <span class="summary-value">${getLocationName()}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Institution Type:</span>
                    <span class="summary-value">${getTypeName()}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Budget:</span>
                    <span class="summary-value">${getBudgetName()}</span>
                </div>
            </div>
            
            <p class="completion-note">You can always update these preferences in your account settings.</p>
        </div>
    `;

    bodyEl.innerHTML = html;
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

function handleDistrictChange(select) {
    const districtId = parseInt(select.value);
    preferences.district_id = districtId;
    preferences.municipality_id = null; // Reset child
    populateMunicipalities(districtId);
}

function handleMunicipalityChange(select) {
    preferences.municipality_id = parseInt(select.value);
}

function populateMunicipalities(districtId) {
    const municipalitySelect = document.getElementById('municipality');
    if (!municipalitySelect) return;

    municipalitySelect.innerHTML = '<option value="">Select city / municipality</option>';
    
    if (districtId) {
        const filtered = municipalities.filter(m => m.district_id === districtId);
        
        filtered.forEach(m => {
            const option = document.createElement('option');
            option.value = m.municipality_id;
            option.textContent = m.municipality_name;
            municipalitySelect.appendChild(option);
        });
        municipalitySelect.disabled = false;
    } else {
        municipalitySelect.disabled = true;
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

    console.log('SAVING PAYLOAD (Formatted):', payload);

    try {
        const res = await fetch('/api/user/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
             Swal.fire({
                icon: 'success',
                title: 'Setup Complete!',
                text: 'Your preferences have been saved.',
                confirmButtonColor: '#2441AC'
            }).then(() => {
                window.location.href = '/dashboard';
            });
        } else {
            const errorData = await res.json();
            throw new Error(errorData.error || `Server returned ${res.status}`);
        }
    } catch (err) {
        console.error('Save failed:', err);
        Swal.fire({
            icon: 'error',
            title: 'Save Failed',
            text: err.message || 'Could not save your preferences. Please try again.',
            confirmButtonColor: '#2441AC'
        });
    }
}

function skipPreferences() {
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
window.handleDistrictChange = handleDistrictChange;
window.handleMunicipalityChange = handleMunicipalityChange;
window.handleInstitutionChange = handleInstitutionChange;
window.handleBudgetChange = handleBudgetChange;

console.log('=== DALAN Preferences Modal Ready ===');
