// DALAN Register JavaScript
// TODO: Connect to database in the future
// Currently using localStorage as mock database

console.log('=== REGISTER.JS LOADING ===');

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Setting up register form');
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    const registerForm = document.getElementById('registerForm');
    const registerButton = document.querySelector('.login-button');
    
    console.log('Register form element:', registerForm);
    console.log('Register button element:', registerButton);

    // Handle register form submission
    if (registerForm) {
        console.log('Attaching submit listener to form');
        registerForm.addEventListener('submit', function(e) {
            console.log('Form submit event fired');
            e.preventDefault(); // PREVENT NORMAL FORM SUBMISSION
            e.stopPropagation();
            handleRegister(e);
            return false; // Extra insurance
        });
    } else {
        console.error('ERROR: Register form not found!');
    }
    
    // Also add click handler to button as backup
    if (registerButton) {
        registerButton.addEventListener('click', function(e) {
            console.log('Button click event fired');
            e.preventDefault();
            e.stopPropagation();
            
            // Validate form
            const form = document.getElementById('registerForm');
            if (form && form.checkValidity()) {
                handleRegister(e);
            } else if (form) {
                form.reportValidity();
            }
            return false;
        });
    }

    // Add real-time password matching validation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value && passwordInput.value !== this.value) {
                this.setCustomValidity('Passwords do not match');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (confirmPasswordInput.value && this.value !== confirmPasswordInput.value) {
                confirmPasswordInput.setCustomValidity('Passwords do not match');
            } else {
                confirmPasswordInput.setCustomValidity('');
            }
        });
    }
}

// Handle register form submission
async function handleRegister(e) {
    console.log('handleRegister called');
    
    // Prevent default again (just to be sure)
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const registerButton = document.querySelector('.login-button');
    
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    console.log('Form data:', { firstName, lastName, email });
    
    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return false;
    }
    
    // Show loading state
    if (registerButton) {
        registerButton.classList.add('loading');
        registerButton.disabled = true;
        registerButton.textContent = 'Creating account...';
    }
    
    // Simulate API call delay (remove in production)
    await delay(800);
    
    // TODO: Replace with actual database registration
    const registrationResult = registerUser(firstName, lastName, email, password);
    
    if (registrationResult.success) {
        // Registration successful
        console.log('Registration successful:', registrationResult.user);
        
        // Store user session
        // TODO: Use proper session management with tokens
        localStorage.setItem('dalanCurrentUser', JSON.stringify({
            userId: registrationResult.user.userId,
            email: registrationResult.user.email,
            firstName: registrationResult.user.firstName,
            lastName: registrationResult.user.lastName
        }));
        
        showSuccess('Registration successful! Setting up your preferences...');
        
        // Redirect to setup page after short delay
        setTimeout(() => {
            window.location.href = 'setup.html';
        }, 2000);
    } else {
        // Registration failed
        if (registerButton) {
            registerButton.classList.remove('loading');
            registerButton.disabled = false;
            registerButton.textContent = 'Register';
        }
        showError(registrationResult.message);
    }
    
    return false; // Extra insurance against form submission
}

// Mock registration function
// TODO: Replace with actual database insert
function registerUser(firstName, lastName, email, password) {
    // Get existing mock users from localStorage
    let mockUsers = [];
    try {
        const existingUsers = localStorage.getItem('dalanMockUsers');
        if (existingUsers) {
            mockUsers = JSON.parse(existingUsers);
        }
    } catch (e) {
        console.error('Error reading mock users:', e);
    }
    
    // Check if email already exists
    const emailExists = mockUsers.some(user => 
        user.email.toLowerCase() === email.toLowerCase()
    );
    
    if (emailExists) {
        return {
            success: false,
            message: 'An account with this email already exists'
        };
    }
    
    // Create new user
    const newUser = {
        userId: generateUserId(),
        firstName,
        lastName,
        email,
        password, // TODO: Hash password in real implementation
        createdAt: new Date().toISOString()
    };
    
    // Add to mock database
    mockUsers.push(newUser);
    localStorage.setItem('dalanMockUsers', JSON.stringify(mockUsers));
    
    // Also initialize user preferences and data
    initializeUserData(newUser.userId, firstName, lastName, email);
    
    return {
        success: true,
        user: newUser
    };
}

// Initialize user data in localStorage
// TODO: Replace with database initialization
function initializeUserData(userId, firstName, lastName, email) {
    // This will be used by the user account page
    const userData = {
        user: {
            userId,
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
            email,
            profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
        },
        preferences: {
            shsStrand: 'Not set',
            program: 'Not set',
            location: 'Not set',
            schoolType: 'Not set',
            budget: 'Not set'
        },
        bookmarks: [],
        history: []
    };
    
    localStorage.setItem(`dalanUserData_${userId}`, JSON.stringify(userData));
    console.log('User data initialized for:', userId);
}

// Generate unique user ID
function generateUserId() {
    return 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        confirmButtonColor: '#2441AC'
    });
}

// Show success message
function showSuccess(message) {
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: message,
        confirmButtonColor: '#2441AC',
        showConfirmButton: false,
        timer: 2000
    });
}

// Utility delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('=== DALAN Register Page ===');
console.log('Create your account to get started');
console.log('===========================');