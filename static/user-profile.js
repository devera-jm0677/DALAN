// User Account JavaScript
// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // fetchUserProfile();
    setupProfileEventListeners();
    applySavedPreferencesFromStorage();
});

// async function fetchUserProfile() {
//     try {
//         const res = await fetch('/api/user/profile');

//         if (!res.ok) {
//             if (res.status === 401) {
//                 window.location.href = '/login';
//                 return;
//             }
//             throw new Error('Failed to fetch user profile');
//         }

//         const data = await res.json();
//         updateUI(data);

//     } catch (err) {
//         console.error(err);
//         alert('Unable to load profile data.');
//     }
// }

// Update all UI elements with user data
function updateUI(data) {
    if (!data.user) {
        console.error('Invalid profile payload:', data);
        alert('Profile data is incomplete.');
        return;
    }

    const { user, profile, interests, bookmark_count, recent_bookmarks } = data;

    document.querySelector('.welcome-title').textContent =
        `Welcome back, ${user.first_name}!`;

    document.querySelector('.profile-name').textContent =
        user.first_name;

    document.querySelectorAll('.profile-img').forEach(img => {
        img.src = user.profile_picture_url || '/static/img/profile-placeholder.jpeg';
    });

    updateDashboardCards(bookmark_count, profile);
    updateRightSidebar(user, profile, interests, recent_bookmarks);
}

// Update dashboard cards
function updateDashboardCards(bookmarkCount, profile) {
    const cards = document.querySelectorAll('.dashboard-card');

    // Saved Programs
    cards[0].querySelector('.card-content').innerHTML =
        `You've bookmarked <strong>${bookmarkCount}</strong> program${bookmarkCount !== 1 ? 's' : ''}.`;

    // Preferred Location
    cards[1].querySelector('.card-content').textContent =
        profile?.municipality
            ? `${profile.municipality}, Pangasinan`
            : 'No preferred location set.';

    // SHS Strand
    cards[2].querySelector('.card-content').innerHTML =
        profile?.strand_name
            ? `Your SHS Strand: <strong>${profile.strand_name}</strong>`
            : 'SHS Strand not set.';

    // Recently Viewed (placeholder)
    cards[3].querySelector('.card-content').textContent =
        'Recently viewed programs will appear here.';
}

// Update right sidebar
function updateRightSidebar(user, profile, interests, recentBookmarks) {
    document.querySelector('.user-profile-img').src =
        user.profile_picture_url || '/static/img/default-avatar.png';

    document.querySelector('.user-fullname').textContent =
        `${user.first_name} ${user.last_name}`;

    document.querySelector('.user-email').textContent = user.email;

    const prefItems = document.querySelectorAll('.preference-item');

    // Program Interest
    prefItems[0].querySelector('.preference-value').textContent =
        interests.length ? interests[0].program_name : 'Not set';

    // Location
    prefItems[1].querySelector('.preference-value').textContent =
        profile?.municipality || 'Not set';

    // School Type
    prefItems[2].querySelector('.preference-value').textContent =
        profile?.institution_type || 'Not set';

    // History (using bookmarks for now)
    const historyItems = document.querySelectorAll('.history-item');

    if (recentBookmarks.length > 0 && historyItems[0]) {
        historyItems[0].querySelector('.history-value').textContent =
            `${recentBookmarks[0].program_name} - ${recentBookmarks[0].university_name}`;
    }

    if (recentBookmarks.length > 1 && historyItems[1]) {
        historyItems[1].querySelector('.history-value').textContent =
            `${recentBookmarks[1].program_name} - ${recentBookmarks[1].university_name}`;
    }
}

function applySavedPreferencesFromStorage() {
    try {
        const stored = localStorage.getItem('dalanProfilePreferences');
        if (!stored) return;

        const data = JSON.parse(stored);
        if (!data) return;

        const prefItems = document.querySelectorAll('.preference-item');
        if (prefItems.length < 3) return;

        if (data.programNames) {
            prefItems[0].querySelector('.preference-value').textContent = data.programNames;
        }
        if (data.locationName) {
            prefItems[1].querySelector('.preference-value').textContent = data.locationName;
        }
        if (data.typeName) {
            prefItems[2].querySelector('.preference-value').textContent = data.typeName;
        }

        const cards = document.querySelectorAll('.dashboard-card');
        if (cards.length > 1) {
            const locationText = data.locationName && data.locationName !== 'Not set'
                ? `${data.locationName}, Pangasinan`
                : 'No preferred location set.';
            cards[1].querySelector('.card-content').textContent = locationText;
        }
        if (cards.length > 2) {
            const strandText = data.strandName && data.strandName !== 'Not set'
                ? `Your SHS Strand: ${data.strandName}`
                : 'SHS Strand not set.';
            cards[2].querySelector('.card-content').textContent = strandText;
        }
    } catch (err) {
        console.error('Failed to apply saved preferences:', err);
    }
}


// Setup event listeners
function setupProfileEventListeners() {
  // Edit Profile save
  document
    .getElementById('saveProfileBtn')
    ?.addEventListener('click', saveProfileChanges);

  // Edit Preferences
    // Inside setupEventListeners() in user-profile.js
    // document.getElementById('editPreferencesBtn')?.addEventListener('click', async () => {
    //     try {
    //         const res = await fetch('/api/setup/profile');
    //         if (!res.ok) throw new Error('Failed to fetch existing preferences');
            
    //         const data = await res.json();
    //         // Pass the existing data to prefill the modal
    //         openPreferencesModal(data);
    //     } catch (err) {
    //         console.error(err);
    //         // If fetch fails, still open the modal (will show empty/mock data)
    //         openPreferencesModal();
    //     }
    // });

    // user-profile.js
    document.getElementById('editPreferencesBtn')?.addEventListener('click', () => {
        openPreferencesModal();
    });


  // Profile picture preview
  document
    .getElementById('profilePicture')
    ?.addEventListener('change', previewProfileImage);
}

// editPreferencesBtn.addEventListener('click', async () => {
//     const res = await fetch('/api/setup/profile');
//     const data = await res.json();
//     window.openSetupModal(data);
// });


// TODO: Connect to database
// function removeBookmark(programId) {
//     // Currently removes from mock data
//     // In the future, this will delete from database
//     const index = mockUserData.bookmarks.findIndex(b => b.programId === programId);
//     if (index !== -1) {
//         mockUserData.bookmarks.splice(index, 1);
//         console.log('Bookmark removed (mock):', programId);
//         return true;
//     }
//     return false;
// }

// TODO: Connect to database
// function addToHistory(programId, programName, universityName, programType) {
//     // Currently adds to mock data
//     // In the future, this will save to database
//     const historyItem = {
//         programId,
//         programName,
//         universityName,
//         programType,
//         viewedAt: new Date().toISOString()
//     };
    
//     // Remove duplicate if exists
//     mockUserData.history = mockUserData.history.filter(h => h.programId !== programId);
    
//     // Add to beginning (most recent first)
//     mockUserData.history.unshift(historyItem);
    
//     // Keep only last 50 items
//     mockUserData.history = mockUserData.history.slice(0, 50);
    
//     console.log('Added to history (mock):', historyItem);
//     return true;
// }

// TODO: Connect to database
// function updatePreferences(program, location, schoolType, shsStrand) {
//     // Currently updates mock data
//     // In the future, this will save to database
//     if (program) mockUserData.preferences.program = program;
//     if (location) mockUserData.preferences.location = location;
//     if (schoolType) mockUserData.preferences.schoolType = schoolType;
//     if (shsStrand) mockUserData.preferences.shsStrand = shsStrand;
    
//     console.log('Preferences updated (mock):', mockUserData.preferences);
//     return true;
// }

console.log('User Account page initialized');

// document.addEventListener('DOMContentLoaded', () => {
//   setupEventListeners();
// });

// function setupEventListeners() {
//   document
//     .getElementById('saveProfileBtn')
//     ?.addEventListener('click', saveProfileChanges);

//   document
//     .getElementById('editPreferencesBtn')
//     ?.addEventListener('click', openPreferencesModal);

//   document
//     .getElementById('profilePicture')
//     ?.addEventListener('change', previewProfileImage);
// }

function previewProfileImage(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById('profilePreview').src = reader.result;
  };
  reader.readAsDataURL(file);
}

async function saveProfileChanges() {
  const formData = new FormData();

  formData.append('firstName', document.getElementById('firstName').value);
  formData.append('lastName', document.getElementById('lastName').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('password', document.getElementById('password').value);

  const imageInput = document.getElementById('profilePicture');
  if (imageInput.files.length > 0) {
    formData.append('profilePicture', imageInput.files[0]);
  }

  const res = await fetch('/api/user/account', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || 'Failed to update profile');
    return;
  }

  const firstName = document.getElementById('firstName')?.value?.trim();
  const previewSrc = document.getElementById('profilePreview')?.src;
  const profileImageUrl =
    data?.profile_picture_url ||
    data?.profile_image_url ||
    data?.profileImageUrl ||
    previewSrc;

  const userEmail = document.body?.dataset?.userEmail?.toLowerCase() || '';
  const storageKey = userEmail ? `dalanUserProfile:${userEmail}` : 'dalanUserProfile';

  localStorage.setItem(
    storageKey,
    JSON.stringify({
      firstName,
      profileImageUrl,
      userEmail
    })
  );

  location.reload();
}

// function openPreferencesModal() {
//   fetch('/api/setup/profile')
//     .then(res => res.json())
//     .then(data => {
//       showSetupModal(data);
//     })
//     .catch(err => {
//       console.error(err);
//       alert('Unable to load preferences');
//     });
// }

// function showSetupModal(prefillData) {
//   const modalEl = document.getElementById('setupModal');
//   if (!modalEl) {
//     console.error('setupModal not found in DOM');
//     return;
//   }

//   populateSetupForm(prefillData);

//   const modal = bootstrap.Modal.getOrCreateInstance(modalEl, {
//     backdrop: 'static',
//     keyboard: true
//   });

//   modal.show();
// }
