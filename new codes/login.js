// DALAN Login JavaScript
// TODO: Connect to database in the future
// Currently using mock authentication

// Mock user database - this will be replaced with actual database
const mockUsers = [
    {
        email: 'kathleenbilog@example.com',
        password: 'password123', // In real app, this would be hashed
        userId: 'demo-user-001',
        firstName: 'Kath',
        lastName: 'Bilog'
    },
    {
        email: 'test@dalan.com',
        password: 'test123',
        userId: 'demo-user-002',
        firstName: 'Test',
        lastName: 'User'
    }
];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkExistingSession();
});

// Setup event listeners
function setupEventListeners() {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Handle forgot password click
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', handleForgotPassword);
    }

    // Add enter key support for inputs
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                loginForm.dispatchEvent(new Event('submit'));
            }
        });
    });
}

// Check if user is already logged in
function checkExistingSession() {
    // TODO: Replace with actual session check from database/auth service
    const currentUser = localStorage.getItem('dalanCurrentUser');
    
    if (currentUser) {
        console.log('User already logged in, redirecting...');
        // Uncomment to auto-redirect logged-in users
        // window.location.href = 'index.html';
    }
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.login-button');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Basic validation
    if (!email || !password) {
        showError('Please enter both email and password');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Show loading state
    loginButton.classList.add('loading');
    loginButton.disabled = true;
    
    // Simulate API call delay (remove in production)
    await delay(800);
    
    // TODO: Replace with actual database authentication
    const user = authenticateUser(email, password);
    
    if (user) {
        // Login successful
        console.log('Login successful:', user);
        
        // Store user session
        // TODO: Use proper session management with tokens
        localStorage.setItem('dalanCurrentUser', JSON.stringify({
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }));
        
        showSuccess('Login successful! Redirecting...');
        
        // Redirect to homepage after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        // Login failed
        loginButton.classList.remove('loading');
        loginButton.disabled = false;
        showError('Invalid email or password. Please try again.');
    }
}

// Mock authentication function
// TODO: Replace with actual database query
function authenticateUser(email, password) {
    const user = mockUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
    );
    
    return user || null;
}

// Handle forgot password
function handleForgotPassword(e) {
    e.preventDefault();
    
    // TODO: Implement actual password reset flow
    const email = prompt('Enter your email address for password reset:');
    
    if (email && isValidEmail(email)) {
        // TODO: Send password reset email
        alert(`Password reset instructions have been sent to ${email}\n\n(This is a mock message - implement actual email sending)`);
        console.log('Password reset requested for:', email);
    } else if (email) {
        alert('Please enter a valid email address');
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message) {
    // Remove existing messages
    removeMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message show';
    errorDiv.textContent = message;
    
    const form = document.getElementById('loginForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorDiv.classList.remove('show');
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

// Show success message
function showSuccess(message) {
    // Remove existing messages
    removeMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.textContent = message;
    
    const form = document.getElementById('loginForm');
    form.insertBefore(successDiv, form.firstChild);
}

// Remove all messages
function removeMessages() {
    const messages = document.querySelectorAll('.error-message, .success-message');
    messages.forEach(msg => msg.remove());
}

// Utility delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Logout function (can be called from other pages)
function logout() {
    // TODO: Clear session from database/auth service
    localStorage.removeItem('dalanCurrentUser');
    console.log('User logged out');
    window.location.href = 'login.html';
}

// Get current logged-in user
function getCurrentUser() {
    const userJson = localStorage.getItem('dalanCurrentUser');
    return userJson ? JSON.parse(userJson) : null;
}

// Export functions for use in other pages
window.dalanAuth = {
    logout,
    getCurrentUser,
    isLoggedIn: () => !!getCurrentUser()
};

// For testing purposes - log available mock users
console.log('=== DALAN Login Page ===');
console.log('Available test accounts:');
mockUsers.forEach(user => {
    console.log(`Email: ${user.email} | Password: ${user.password}`);
});
console.log('=======================');
