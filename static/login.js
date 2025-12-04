// Client-side validation and helpful UI for the login form
// Shows messages in the #flash-area and fills the error <span> elements

(function () {
  'use strict';

  const emailInput = document.getElementById('email-input');
  const passwordInput = document.getElementById('password-input');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const flashArea = document.getElementById('flash-area');
  const form = document.querySelector('.login-form');
  const submitBtn = form.querySelector('button[type="submit"]');

  function showFlash(message, category = 'info') {
    flashArea.hidden = false;
    flashArea.className = 'flash-messages ' + category;
    flashArea.textContent = message;
  }

  function clearFlash() {
    flashArea.hidden = true;
    flashArea.textContent = '';
    flashArea.className = 'flash-messages';
  }

  function setError(el, msg) {
    if (!el) return;
    el.textContent = msg;
    const input = document.getElementById(el.getAttribute('id').replace('-error', '-input'));
    if (input) input.classList.add('invalid');
  }

  function clearError(el) {
    if (!el) return;
    el.textContent = '';
    const input = document.getElementById(el.getAttribute('id').replace('-error', '-input'));
    if (input) input.classList.remove('invalid');
  }

  function validateEmail(value) {
    // simple RFC-ish check
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
  }

  function validate() {
    let ok = true;
    clearFlash();
    clearError(emailError);
    clearError(passwordError);

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email) {
      setError(emailError, 'Email is required');
      ok = false;
    } else if (!validateEmail(email)) {
      setError(emailError, 'Please enter a valid email address');
      ok = false;
    }

    if (!password) {
      setError(passwordError, 'Password is required');
      ok = false;
    } else if (password.length < 6) {
      setError(passwordError, 'Password must be at least 6 characters');
      ok = false;
    }

    return ok;
  }

  form.addEventListener('submit', function (e) {
    if (!validate()) {
      e.preventDefault();
      // focus first invalid field
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      showFlash('Please fix the errors in the form and try again.', 'error');
    } else {
      // Optionally show a small client-side message while the form is submitted
      showFlash('Submitting…', 'info');
      // If you want to prevent an actual network call for testing, uncomment next line
      // e.preventDefault();
      submitBtn.disabled = true;
    }
  });

  [emailInput, passwordInput].forEach((inp) => {
    inp.addEventListener('input', function () {
      const err = document.getElementById(this.id.replace('-input', '-error'));
      if (err) clearError(err);
      clearFlash();
    });
  });

  // expose helpers for debugging in console (optional)
  window.__loginHelpers = { validate, showFlash, clearFlash };
})();
