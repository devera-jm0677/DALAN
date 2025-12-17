// DALAN Register JavaScript
console.log('Checkpoint 1: register.js file loaded');

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    const registerForm = document.getElementById('registerForm');
    
    // Handle register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            console.log('Checkpoint 2: Form submission triggered.');
            e.preventDefault(); // PREVENT NORMAL FORM SUBMISSION
            handleRegister(e);
        });
    } else {
        console.error('ERROR: Register form not found!');
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
    // This check is important to prevent the function from running twice
    if (e.handled) {
        return;
    }
    e.handled = true;

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

    const payload = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
    };

    console.log('Checkpoint 3: Before fetch to /api/register with payload:', JSON.stringify(payload));

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        console.log('Checkpoint 4: After fetch from /api/register. Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok && data.success) {
            console.log('Registration success branch taken.');
            showSuccess('Registration successful! Setting up your preferences...');

            setTimeout(() => {
                window.location.href = '/setup';
            }, 1500);
        } else {
            console.log('Registration failed branch taken. Server error message:', data.error);
            showError(data.error || 'Registration failed');
            registerButton.disabled = false;
            registerButton.textContent = 'Register';
        }

    } catch (error) {
        console.error('Fetch failed with error:', error);
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
