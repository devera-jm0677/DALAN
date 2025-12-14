// DALAN Preferences Modal JavaScript
// TODO: Connect to database in the future
// Currently using localStorage

console.log('=== PREFERENCES MODAL JS LOADING ===');

// Pangasinan Districts and Municipalities Data
const PANGASINAN_DATA = {
    province: 'Pangasinan',
    districts: {
        '1st District': [
            'Alaminos', 'Bani', 'Bolinao', 'Anda', 'Burgos', 'Dasol', 'Infanta', 'Mabini'
        ],
        '2nd District': [
            'Agno', 'Aguilar', 'Bugallon', 'Burgos', 'Dasol', 'Infanta', 'Labrador', 'Mabini', 
            'Mangatarem', 'Salasa', 'Sual'
        ],
        '3rd District': [
            'Alcala', 'Bautista', 'Bayambang', 'Santa Maria', 'Urbiztondo', 'Basista', 'Malasiqui'
        ],
        '4th District': [
            'Binalonan', 'Lingayen', 'Bugallon', 'Labrador', 'Sual', 'Alaminos', 'Mabini', 
            'Bani', 'Agno', 'Anda', 'Bolinao', 'Burgos', 'Dasol', 'Infanta'
        ],
        '5th District': [
            'Manaoag', 'Pozorrubio', 'San Carlos', 'San Fabian', 'San Jacinto', 'Sison', 
            'Sta. Barbara', 'Sto. Tomas', 'Tayug', 'Umingan'
        ],
        '6th District': [
            'Dagupan City', 'Calasiao', 'Mangaldan', 'Mapandan', 'San Jacinto', 'Sta. Barbara', 
            'Binmaley', 'Lingayen', 'San Fabian'
        ]
    }
};

// SHS Strands
const SHS_STRANDS = [
    'STEM (Science, Technology, Engineering, and Mathematics)',
    'ABM (Accountancy, Business, and Management)',
    'HUMSS (Humanities and Social Sciences)',
    'GAS (General Academic Strand)',
    'TVL - Home Economics',
    'TVL - Agri-Fishery Arts',
    'TVL - Industrial Arts',
    'TVL - ICT (Information and Communications Technology)',
    'Sports Track',
    'Arts and Design Track'
];

// Available Programs
const PROGRAMS = [
    'BS Nursing',
    'BS Civil Engineering',
    'BS Computer Science',
    'BS Accountancy',
    'BS Psychology',
    'BS Business Administration',
    'BS Information Technology',
    'BS Architecture',
    'BS Education',
    'BS Criminology',
    'BS Medical Technology',
    'BS Pharmacy',
    'BS Marine Engineering',
    'BS Electrical Engineering',
    'BS Mechanical Engineering'
];

// Institution Types
const INSTITUTION_TYPES = [
    'Public',
    'Private',
    'Vocational',
    'Any'
];

// Budget Ranges
const BUDGET_RANGES = [
    'Below ₱10,000',
    '₱10,000 – ₱20,000',
    '₱20,000 – ₱30,000',
    'Above ₱30,000'
];

// Global State
let currentStep = 1;
let preferences = {
    shsStrand: '',
    programs: [],
    location: {
        province: 'Pangasinan',
        district: '',
        municipality: ''
    },
    institutionType: '',
    budget: ''
};

// Initialize Modal
document.addEventListener('DOMContentLoaded', function() {
    // Check if modal exists before initializing
    if (document.getElementById('preferencesModal')) {
        initializeModal();
        setupEventListeners();
    }
});

// Initialize modal state
function initializeModal() {
    renderStep(1); // Render the first step on load
    updateProgress();
    updateCategoryStates();
}

// Setup Event Listeners
function setupEventListeners() {
    // Close button
    const closeButton = document.getElementById('closeButton');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Skip button
    const skipButton = document.getElementById('skipButton');
    if (skipButton) {
        skipButton.addEventListener('click', skipPreferences);
    }

    // Navigation buttons
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');

    if (backButton) {
        backButton.addEventListener('click', goToPreviousStep);
    }

    if (nextButton) {
        nextButton.addEventListener('click', goToNextStep);
    }

    // Category navigation items
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const step = parseInt(this.getAttribute('data-step'));
            // Only allow navigation to completed or current steps
            if (step < currentStep || isStepCompleted(step)) {
                goToStep(step);
            } else if (step === currentStep) {
                goToStep(step);
            }
        });
    });

    // Close on overlay click (outside modal)
    const overlay = document.getElementById('preferencesModal');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                Swal.fire({
                    title: 'Close Setup?',
                    text: 'Your progress will not be saved.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#2441AC',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Yes, close',
                    cancelButtonText: 'Continue setup'
                }).then((result) => {
                    if (result.isConfirmed) {
                        closeModal();
                    }
                });
            }
        });
    }

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('preferencesModal');
            if (modal && !modal.classList.contains('hidden')) {
                Swal.fire({
                    title: 'Close Setup?',
                    text: 'Your progress will not be saved.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#2441AC',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Yes, close',
                    cancelButtonText: 'Continue setup'
                }).then((result) => {
                    if (result.isConfirmed) {
                        closeModal();
                    }
                });
            }
        }
    });
}

// Render step content
function renderStep(step) {
    currentStep = step;
    
    const contentBody = document.getElementById('contentBody');
    const contentTitle = document.getElementById('contentTitle');
    const contentSubtitle = document.getElementById('contentSubtitle');
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');
    const helpLink = document.getElementById('helpLink');

    if (!contentBody || !contentTitle || !contentSubtitle) {
        console.error('Content elements not found');
        return;
    }

    // Update back button state
    if (backButton) {
        backButton.disabled = (step === 1);
    }

    // Update next button text
    if (nextButton) {
        if (step === 6) {
            nextButton.textContent = 'Get Started';
            nextButton.innerHTML = 'Get Started';
        } else {
            nextButton.innerHTML = `Next <svg width="12" height="24" viewBox="0 0 12 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.343 12L10.414 19.071L9 20.485L1.222 12.707C1.03453 12.5195 0.929214 12.2652 0.929214 12C0.929214 11.7348 1.03453 11.4805 1.222 11.293L9 3.515L10.414 4.929L3.343 12Z" fill="white"/></svg>`;
        }
    }

    // Update header and content based on step
    // Order: SHS Strand, Target Programs, Location, Institution Type, Budget, Completion
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
}

// Render SHS Strand Step
function renderSHSStrandStep(titleEl, subtitleEl, bodyEl) {
    titleEl.textContent = 'SHS Strand';
    subtitleEl.textContent = 'What is your Senior High School strand?';

    let html = '<div class="radio-options">';
    SHS_STRANDS.forEach((strand, index) => {
        const isChecked = preferences.shsStrand === strand ? 'checked' : '';
        html += `
            <div>
                <input 
                    type="radio" 
                    id="strand-${index}" 
                    class="radio-option" 
                    name="strand" 
                    value="${strand}" 
                    ${isChecked}
                    onchange="handleStrandChange(this)">
                <label for="strand-${index}" class="radio-label">${strand}</label>
            </div>
        `;
    });
    html += '</div>';

    bodyEl.innerHTML = html;
}

// Render Programs Step
function renderProgramsStep(titleEl, subtitleEl, bodyEl) {
    titleEl.textContent = 'Target Programs';
    subtitleEl.textContent = 'What programs are you interested in?';

    let html = '<div class="programs-list">';
    PROGRAMS.forEach((program, index) => {
        const isChecked = preferences.programs.includes(program) ? 'checked' : '';
        html += `
            <div>
                <input 
                    type="checkbox" 
                    id="program-${index}" 
                    class="program-checkbox" 
                    value="${program}" 
                    ${isChecked}
                    onchange="handleProgramChange(this)">
                <label for="program-${index}" class="program-label">${program}</label>
            </div>
        `;
    });
    html += '</div>';

    bodyEl.innerHTML = html;
}

// Render Location Step
function renderLocationStep(titleEl, subtitleEl, bodyEl) {
    titleEl.textContent = 'Location';
    subtitleEl.textContent = 'Where do you want to study?';

    const html = `
        <div class="form-field">
            <label for="province" class="form-label">Province</label>
            <input 
                type="text" 
                id="province" 
                class="form-input" 
                value="${PANGASINAN_DATA.province}" 
                disabled>
        </div>

        <div class="form-field">
            <label for="district" class="form-label">District</label>
            <select 
                id="district" 
                class="form-select" 
                onchange="handleDistrictChange(this)">
                <option value="">Select district</option>
                ${Object.keys(PANGASINAN_DATA.districts).map(district => `
                    <option value="${district}" ${preferences.location.district === district ? 'selected' : ''}>
                        ${district}
                    </option>
                `).join('')}
            </select>
        </div>

        <div class="form-field">
            <label for="municipality" class="form-label">City/Municipality</label>
            <select 
                id="municipality" 
                class="form-select" 
                onchange="handleMunicipalityChange(this)"
                ${!preferences.location.district ? 'disabled' : ''}>
                <option value="">Select city/municipality</option>
            </select>
        </div>
    `;

    bodyEl.innerHTML = html;

    // If district is already selected, populate municipalities
    if (preferences.location.district) {
        populateMunicipalities(preferences.location.district);
    }
}

// Render Institution Type Step
function renderInstitutionStep(titleEl, subtitleEl, bodyEl) {
    titleEl.textContent = 'Institution Type';
    subtitleEl.textContent = 'What type of institution do you prefer?';

    let html = '<div class="radio-options">';
    INSTITUTION_TYPES.forEach((type, index) => {
        const isChecked = preferences.institutionType === type ? 'checked' : '';
        html += `
            <div>
                <input 
                    type="radio" 
                    id="institution-${index}" 
                    class="radio-option" 
                    name="institution" 
                    value="${type}" 
                    ${isChecked}
                    onchange="handleInstitutionChange(this)">
                <label for="institution-${index}" class="radio-label">${type}</label>
            </div>
        `;
    });
    html += '</div>';

    bodyEl.innerHTML = html;
}

// Render Budget Step
function renderBudgetStep(titleEl, subtitleEl, bodyEl) {
    titleEl.textContent = 'Budget';
    subtitleEl.textContent = 'What is your budget range per semester? (Optional)';

    let html = '<div class="radio-options">';
    BUDGET_RANGES.forEach((range, index) => {
        const isChecked = preferences.budget === range ? 'checked' : '';
        html += `
            <div>
                <input 
                    type="radio" 
                    id="budget-${index}" 
                    class="radio-option" 
                    name="budget" 
                    value="${range}" 
                    ${isChecked}
                    onchange="handleBudgetChange(this)">
                <label for="budget-${index}" class="radio-label">${range}</label>
            </div>
        `;
    });
    html += '</div>';

    bodyEl.innerHTML = html;
}

// Render Completion Step
function renderCompletionStep(titleEl, subtitleEl, bodyEl) {
    titleEl.textContent = '100% Setup Complete!';
    subtitleEl.textContent = 'You\'re all set to explore programs and universities';

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
                    <span class="summary-value">${preferences.shsStrand || 'Not set'}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Target Programs:</span>
                    <span class="summary-value">${preferences.programs.length > 0 ? preferences.programs.join(', ') : 'Not set'}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Location:</span>
                    <span class="summary-value">${preferences.location.municipality || preferences.location.district || 'Not set'}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Institution Type:</span>
                    <span class="summary-value">${preferences.institutionType || 'Not set'}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Budget:</span>
                    <span class="summary-value">${preferences.budget || 'Not set'}</span>
                </div>
            </div>
            
            <p class="completion-note">You can always update these preferences in your account settings.</p>
        </div>
    `;

    bodyEl.innerHTML = html;
}

// Handle SHS Strand change
function handleStrandChange(radio) {
    preferences.shsStrand = radio.value;
    console.log('SHS Strand selected:', radio.value);
}

// Handle program selection change
function handleProgramChange(checkbox) {
    const program = checkbox.value;
    
    if (checkbox.checked) {
        if (!preferences.programs.includes(program)) {
            preferences.programs.push(program);
        }
    } else {
        preferences.programs = preferences.programs.filter(p => p !== program);
    }
    
    console.log('Programs selected:', preferences.programs);
}

// Handle district change
function handleDistrictChange(select) {
    const district = select.value;
    preferences.location.district = district;
    preferences.location.municipality = ''; // Reset municipality
    
    populateMunicipalities(district);
    
    console.log('District selected:', district);
}

// Handle municipality change
function handleMunicipalityChange(select) {
    preferences.location.municipality = select.value;
    
    console.log('Municipality selected:', select.value);
}

// Populate municipalities based on district
function populateMunicipalities(district) {
    const municipalitySelect = document.getElementById('municipality');
    if (!municipalitySelect) return;

    // Clear current options
    municipalitySelect.innerHTML = '<option value="">Select city/municipality</option>';
    
    if (district && PANGASINAN_DATA.districts[district]) {
        const municipalities = PANGASINAN_DATA.districts[district];
        
        municipalities.forEach(municipality => {
            const option = document.createElement('option');
            option.value = municipality;
            option.textContent = municipality;
            if (preferences.location.municipality === municipality) {
                option.selected = true;
            }
            municipalitySelect.appendChild(option);
        });
        
        municipalitySelect.disabled = false;
    } else {
        municipalitySelect.disabled = true;
    }
}

// Handle institution type change
function handleInstitutionChange(radio) {
    preferences.institutionType = radio.value;
    
    console.log('Institution type selected:', radio.value);
}

// Handle budget change
function handleBudgetChange(radio) {
    preferences.budget = radio.value;
    
    console.log('Budget selected:', radio.value);
}

// Check if a step is completed
function isStepCompleted(step) {
    switch (step) {
        case 1: // SHS Strand
            return preferences.shsStrand !== '';
        case 2: // Target Programs
            return preferences.programs.length > 0;
        case 3: // Location
            return preferences.location.district && preferences.location.municipality;
        case 4: // Institution Type
            return preferences.institutionType !== '';
        case 5: // Budget (optional, but only completed if user selects something)
            return preferences.budget !== '';
        case 6: // Completion (never shows as completed in sidebar)
            return false;
        default:
            return false;
    }
}

// Calculate total completed steps (excluding completion page)
function getCompletedSteps() {
    let completed = 0;
    for (let i = 1; i <= 5; i++) {
        if (isStepCompleted(i)) {
            completed++;
        }
    }
    return completed;
}

// Update progress bar and text (Bootstrap version)
function updateProgress() {
    const completed = getCompletedSteps();
    const total = 5; // Excluding completion page
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

// Update category item states
function updateCategoryStates() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        const step = parseInt(item.getAttribute('data-step'));
        
        // Remove all state classes
        item.classList.remove('done', 'current', 'pending');
        
        // Add appropriate class
        if (step > currentStep && isStepCompleted(step)) {
            item.classList.add('done');
        } else if (step < currentStep && isStepCompleted(step)) {
            item.classList.add('done');
        } else if (step === currentStep) {
            item.classList.add('current');
        } else {
            item.classList.add('pending');
        }
    });
}

// Navigation functions
function goToNextStep() {
    if (currentStep < 5) {
        renderStep(currentStep + 1);
    } else if (currentStep === 5) {
        // Move to completion page
        renderStep(6);
    } else if (currentStep === 6) {
        // Save and redirect
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

// Save preferences
function savePreferences() {
    // TODO: Save to database
    
    // Currently save to localStorage
    const currentUser = localStorage.getItem('dalanCurrentUser');
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        const userId = user.userId;
        
        // Get existing user data
        let userData = localStorage.getItem(`dalanUserData_${userId}`);
        if (userData) {
            userData = JSON.parse(userData);
        } else {
            // Initialize if doesn't exist
            userData = {
                user: user,
                preferences: {},
                bookmarks: [],
                history: []
            };
        }
        
        // Update preferences
        userData.preferences = {
            shsStrand: preferences.shsStrand || 'Not set',
            program: preferences.programs.length > 0 ? preferences.programs[0] : 'Not set',
            programs: preferences.programs,
            location: preferences.location.municipality || preferences.location.district || 'Not set',
            schoolType: preferences.institutionType || 'Not set',
            budget: preferences.budget || 'Not set'
        };
        
        // Save back to localStorage
        localStorage.setItem(`dalanUserData_${userId}`, JSON.stringify(userData));
        
        console.log('Preferences saved:', userData.preferences);
        
        // Close modal and redirect
        closeModal();
        window.location.href = 'index.html';
    } else {
        console.error('No user logged in');
        Swal.fire({
            icon: 'error',
            title: 'Not Logged In',
            text: 'Please log in first to save your preferences.',
            confirmButtonColor: '#2441AC',
            confirmButtonText: 'Go to Login'
        }).then(() => {
            window.location.href = 'login.html';
        });
    }
}

// Skip preferences
function skipPreferences() {
    Swal.fire({
        title: 'Skip Setup?',
        text: 'You can always set your preferences later in your account settings.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#2441AC',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, skip',
        cancelButtonText: 'Continue setup'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('User skipped preferences setup');
            closeModal();
            window.location.href = 'index.html';
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.getElementById('preferencesModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Show modal (called from external pages)
function showPreferencesModal() {
    const modal = document.getElementById('preferencesModal');
    if (modal) {
        modal.classList.remove('hidden');
        // Reset to first step
        currentStep = 1;
        renderStep(1);
    } else {
        console.error('Preferences modal not found in DOM');
    }
}

// Export functions
window.dalanPreferences = {
    show: showPreferencesModal,
    close: closeModal
};

// Make functions available globally for inline event handlers
window.handleStrandChange = handleStrandChange;
window.handleProgramChange = handleProgramChange;
window.handleDistrictChange = handleDistrictChange;
window.handleMunicipalityChange = handleMunicipalityChange;
window.handleInstitutionChange = handleInstitutionChange;
window.handleBudgetChange = handleBudgetChange;

console.log('=== DALAN Preferences Modal ===');
console.log('Ready to collect user preferences');
console.log('Total steps: 6 (including completion)');
console.log('window.dalanPreferences available:', !!window.dalanPreferences);
console.log('Modal element exists:', !!document.getElementById('preferencesModal'));
console.log('===============================');