// User Account JavaScript
// TODO: Connect to database in the future
// Currently using static mock data

// Mock user data - this will be replaced with database calls
const mockUserData = {
    user: {
        userId: 'user-001',
        firstName: 'Kath',
        lastName: 'Bilog',
        fullName: 'Kathleen Shane C. Bilog',
        email: 'kathleenbilog@example.com',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
    },
    preferences: {
        program: 'Nursing',
        location: 'Pangasinan',
        schoolType: 'Public',
        shsStrand: 'STEM'
    },
    bookmarks: [
        { programId: 'prog-001', programName: 'BS Nursing', universityName: 'PSU Lingayen' },
        { programId: 'prog-002', programName: 'BS Civil Engineering', universityName: 'UCU' },
        { programId: 'prog-003', programName: 'BS Computer Science', universityName: 'UPang' },
        { programId: 'prog-004', programName: 'BS Accountancy', universityName: 'PSU Bayambang' },
        { programId: 'prog-005', programName: 'BS Psychology', universityName: 'UPang' }
    ],
    history: [
        { programId: 'prog-001', programName: 'BS Nursing', universityName: 'PSU Lingayen', programType: 'nursing', viewedAt: '2024-01-15' },
        { programId: 'prog-002', programName: 'BS Civil Engineering', universityName: 'UCU', programType: 'engineering', viewedAt: '2024-01-14' },
        { programId: 'prog-006', programName: 'BS Nursing', universityName: 'St. Louis University', programType: 'nursing', viewedAt: '2024-01-13' }
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    loadUserData();
    
    // Setup event listeners
    setupEventListeners();
});

// Load user data and update UI
// TODO: Replace with actual database fetch
function loadUserData() {
    console.log('Loading user data...');
    
    // Simulate loading data (in the future, this will be an API call)
    const userData = mockUserData;
    
    // Update UI with loaded data
    updateUI(userData);
}

// Update all UI elements with user data
function updateUI(data) {
    const { user, preferences, bookmarks, history } = data;
    
    // Update welcome message
    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) {
        welcomeTitle.textContent = `Welcome back, ${user.firstName}!`;
    }
    
    // Update header profile
    const profileName = document.querySelector('.profile-name');
    if (profileName) {
        profileName.textContent = user.firstName;
    }
    
    const profileImgs = document.querySelectorAll('.profile-img');
    profileImgs.forEach(img => {
        img.src = user.profileImage;
        img.alt = `${user.firstName}'s profile`;
    });
    
    // Update dashboard cards
    updateDashboardCards(bookmarks, preferences, history);
    
    // Update right sidebar
    updateRightSidebar(user, preferences, history);
}

// Update dashboard cards
function updateDashboardCards(bookmarks, preferences, history) {
    const cards = document.querySelectorAll('.dashboard-card');
    
    // Saved Programs Card
    const savedCard = cards[0];
    if (savedCard) {
        const content = savedCard.querySelector('.card-content');
        if (content) {
            const count = bookmarks.length;
            content.innerHTML = `You've bookmarked <strong>${count}</strong> program${count !== 1 ? 's' : ''} this week.`;
        }
    }
    
    // Preferred Location Card
    const locationCard = cards[1];
    if (locationCard) {
        const content = locationCard.querySelector('.card-content');
        if (content && preferences.location) {
            content.textContent = `Mostly exploring universities in ${preferences.location}.`;
        }
    }
    
    // Study Strand Card
    const strandCard = cards[2];
    if (strandCard) {
        const content = strandCard.querySelector('.card-content');
        if (content) {
            content.innerHTML = `Your SHS Strand: <strong>${preferences.shsStrand}</strong>`;
        }
    }
    
    // Recently Viewed Card
    const recentCard = cards[3];
    if (recentCard) {
        const content = recentCard.querySelector('.card-content');
        if (content && history.length > 0) {
            // Count by program type
            const typeCounts = {};
            history.forEach(item => {
                typeCounts[item.programType] = (typeCounts[item.programType] || 0) + 1;
            });
            
            const descriptions = Object.entries(typeCounts).map(([type, count]) => {
                return `${count} ${type} ${count !== 1 ? 'programs' : 'program'}`;
            }).join(' and ');
            
            content.textContent = descriptions.charAt(0).toUpperCase() + descriptions.slice(1) + '.';
        }
    }
}

// Update right sidebar
function updateRightSidebar(user, preferences, history) {
    // Update profile image
    const profileImg = document.querySelector('.user-profile-img');
    if (profileImg) {
        profileImg.src = user.profileImage;
        profileImg.alt = user.fullName;
    }
    
    // Update user name
    const fullName = document.querySelector('.user-fullname');
    if (fullName) {
        fullName.textContent = user.fullName;
    }
    
    // Update email
    const email = document.querySelector('.user-email');
    if (email) {
        email.textContent = user.email;
    }
    
    // Update preferences
    const preferenceItems = document.querySelectorAll('.preference-item');
    if (preferenceItems.length >= 3) {
        // Program
        const programValue = preferenceItems[0].querySelector('.preference-value');
        if (programValue) {
            programValue.textContent = preferences.program;
        }
        
        // Location
        const locationValue = preferenceItems[1].querySelector('.preference-value');
        if (locationValue) {
            locationValue.textContent = preferences.location;
        }
        
        // School Type
        const schoolTypeValue = preferenceItems[2].querySelector('.preference-value');
        if (schoolTypeValue) {
            schoolTypeValue.textContent = preferences.schoolType;
        }
    }
    
    // Update history
    const historyItems = document.querySelectorAll('.history-item');
    if (history.length > 0) {
        // Last Viewed
        if (historyItems[0]) {
            const historyValue = historyItems[0].querySelector('.history-value');
            if (historyValue) {
                historyValue.textContent = `${history[0].programName} - ${history[0].universityName}`;
            }
        }
        
        // Previous
        if (historyItems[1] && history.length > 1) {
            const historyValue = historyItems[1].querySelector('.history-value');
            if (historyValue) {
                historyValue.textContent = `${history[1].programName} - ${history[1].universityName}`;
            }
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    const navItems = document.querySelectorAll('.nav-item');
    
    // Navigation item click handlers
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            handleNavigation(page);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    console.log('Searching for:', searchTerm);
                    // TODO: Navigate to search results page
                    window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }
    
    // Edit Profile button
    const editProfileBtn = document.querySelector('.btn-edit-profile');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', handleEditProfile);
    }
    
    // Profile dropdown button
    const profileButton = document.querySelector('.profile-button');
    if (profileButton) {
        profileButton.addEventListener('click', function() {
            console.log('Profile menu clicked');
            // TODO: Show dropdown menu
        });
    }
    
    // Notification buttons
    const notificationButtons = document.querySelectorAll('.icon-button');
    notificationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ariaLabel = this.getAttribute('aria-label');
            console.log(`${ariaLabel} clicked`);
            // TODO: Show notifications/messages panel
        });
    });
}

// Handle navigation
function handleNavigation(page) {
    switch(page) {
        case 'recommended':
            window.location.href = 'index.html';
            break;
        case 'universities':
            window.location.href = 'index.html';
            break;
        case 'bookmarks':
            console.log('Navigate to Bookmarks');
            // TODO: Create bookmarks page
            break;
        case 'news':
            console.log('Navigate to News');
            // TODO: Create news page
            break;
        case 'settings':
            // Already on settings page
            console.log('Already on Settings page');
            break;
        case 'support':
            console.log('Navigate to Support');
            // TODO: Create support page
            break;
        case 'logout':
            if (confirm('Are you sure you want to log out?')) {
                console.log('Logging out...');
                // TODO: Handle logout and clear session
                window.location.href = 'index.html';
            }
            break;
    }
}

// Handle edit profile
function handleEditProfile() {
    // TODO: Replace with proper edit profile modal/form
    const firstName = prompt('Enter first name:', mockUserData.user.firstName);
    if (!firstName) return;
    
    const lastName = prompt('Enter last name:', mockUserData.user.lastName);
    if (!lastName) return;
    
    const email = prompt('Enter email:', mockUserData.user.email);
    if (!email) return;
    
    // Update mock data (in the future, this will save to database)
    mockUserData.user.firstName = firstName;
    mockUserData.user.lastName = lastName;
    mockUserData.user.fullName = `${firstName} ${lastName}`;
    mockUserData.user.email = email;
    
    // TODO: Save to database
    console.log('Profile updated (mock):', mockUserData.user);
    
    alert('Profile updated successfully!');
    
    // Reload UI with updated data
    loadUserData();
}

// Utility functions for future database integration
// These functions will be called from other pages (homescreen, program profile, etc.)

// TODO: Connect to database
function addBookmark(programId, programName, universityName) {
    // Currently adds to mock data
    // In the future, this will save to database
    const bookmark = {
        programId,
        programName,
        universityName,
        bookmarkedAt: new Date().toISOString()
    };
    
    // Check if already bookmarked
    const exists = mockUserData.bookmarks.some(b => b.programId === programId);
    if (!exists) {
        mockUserData.bookmarks.push(bookmark);
        console.log('Bookmark added (mock):', bookmark);
        return true;
    }
    
    console.log('Already bookmarked');
    return false;
}

// TODO: Connect to database
function removeBookmark(programId) {
    // Currently removes from mock data
    // In the future, this will delete from database
    const index = mockUserData.bookmarks.findIndex(b => b.programId === programId);
    if (index !== -1) {
        mockUserData.bookmarks.splice(index, 1);
        console.log('Bookmark removed (mock):', programId);
        return true;
    }
    return false;
}

// TODO: Connect to database
function addToHistory(programId, programName, universityName, programType) {
    // Currently adds to mock data
    // In the future, this will save to database
    const historyItem = {
        programId,
        programName,
        universityName,
        programType,
        viewedAt: new Date().toISOString()
    };
    
    // Remove duplicate if exists
    mockUserData.history = mockUserData.history.filter(h => h.programId !== programId);
    
    // Add to beginning (most recent first)
    mockUserData.history.unshift(historyItem);
    
    // Keep only last 50 items
    mockUserData.history = mockUserData.history.slice(0, 50);
    
    console.log('Added to history (mock):', historyItem);
    return true;
}

// TODO: Connect to database
function updatePreferences(program, location, schoolType, shsStrand) {
    // Currently updates mock data
    // In the future, this will save to database
    if (program) mockUserData.preferences.program = program;
    if (location) mockUserData.preferences.location = location;
    if (schoolType) mockUserData.preferences.schoolType = schoolType;
    if (shsStrand) mockUserData.preferences.shsStrand = shsStrand;
    
    console.log('Preferences updated (mock):', mockUserData.preferences);
    return true;
}

// Export functions for use in other pages
window.dalanUserAccount = {
    addBookmark,
    removeBookmark,
    addToHistory,
    updatePreferences,
    getUserData: () => mockUserData
};

console.log('User Account page initialized');
