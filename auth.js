/* ==========================================
   AUTHENTICATION VALIDATION (Login & Signup)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Login Form Validation
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const loginMsg = document.getElementById('loginMsg');

            let isValid = true;
            emailError.style.display = 'none';
            passwordError.style.display = 'none';

            if (!email) {
                emailError.textContent = 'Email cannot be empty.';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                emailError.textContent = 'Please enter a valid email format.';
                emailError.style.display = 'block';
                isValid = false;
            }

            if (!password) {
                passwordError.textContent = 'Password cannot be empty.';
                passwordError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                loginMsg.textContent = 'Login successful! Redirecting to store...';
                loginMsg.className = 'form-message success';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }

    // Signup Form Validation
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const termsCheckbox = document.getElementById('termsCheckbox').checked;

            const nameError = document.getElementById('nameError');
            const signupEmailError = document.getElementById('signupEmailError');
            const signupPasswordError = document.getElementById('signupPasswordError');
            const confirmError = document.getElementById('confirmError');
            const termsError = document.getElementById('termsError');
            const signupMsg = document.getElementById('signupMsg');

            let isValid = true;
            [nameError, signupEmailError, signupPasswordError, confirmError, termsError].forEach(el => el.style.display = 'none');

            if (!name) {
                nameError.textContent = 'Full name is required.';
                nameError.style.display = 'block';
                isValid = false;
            }

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                signupEmailError.textContent = 'Valid email address is required.';
                signupEmailError.style.display = 'block';
                isValid = false;
            }

            if (!password || password.length < 6) {
                signupPasswordError.textContent = 'Password must be at least 6 characters.';
                signupPasswordError.style.display = 'block';
                isValid = false;
            }

            if (password !== confirmPassword) {
                confirmError.textContent = 'Passwords do not match.';
                confirmError.style.display = 'block';
                isValid = false;
            }

            if (!termsCheckbox) {
                termsError.textContent = 'You must agree to the Terms & Conditions.';
                termsError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                signupMsg.textContent = 'Account created successfully! Redirecting to login...';
                signupMsg.className = 'form-message success';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }
        });
    }
});