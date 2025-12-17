// DALAN Register JavaScript
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
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const registerButton = document.querySelector('.login-button');

    // Validation (keep your existing logic)
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    // Loading state
if (registerButton) {
    registerButton.disabled = true;
    registerButton.textContent = 'Creating account...';
}

    try {
        const response = await fetch("http://127.0.0.1:5000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            showSuccess('Registration successful! Setting up your preferences...');

            setTimeout(() => {
                window.location.href = 'setup.html';
            }, 1500);
        } else {
            showError(data.error || 'Registration failed');
            registerButton.disabled = false;
            registerButton.textContent = 'Register';
        }

    } catch (error) {
        console.error(error);
        showError('Could not connect to the server');
        registerButton.disabled = false;
        registerButton.textContent = 'Register';
    }
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
console.log('=== DALAN Register Page ===');
console.log('Create your account to get started');
console.log('===========================');