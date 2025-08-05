document.addEventListener('DOMContentLoaded', () => {

    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    let currentUser = null;

    const appContainer = document.getElementById('app-container');
    const mainNav = document.getElementById('main-nav');

    const routes = {
        '#landing': 'landing.html',
        '#auth': 'auth.html',
        '#dashboard': 'dashboard.html',
        '#gigs': 'gigs.html',
        '#profile': 'profile.html',
        '#skill-hub': 'skill-hub.html',
        '#business': 'business.html',
        '#rights': 'rights.html'
    };

    const observeSections = () => {
        const sections = document.querySelectorAll('.fade-in-section');
        if (!sections.length) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    };

    const loadView = async (viewName) => {
        appContainer.innerHTML = '<div class="loader"></div>';
        try {
            const response = await fetch(`view/${viewName}`);
            if (!response.ok) throw new Error('View not found');
            const html = await response.text();
            appContainer.innerHTML = html;
            observeSections(); // Animate sections on new view load
        } catch (error) {
            console.error('Error loading view:', error);
            appContainer.innerHTML = `<div class="container"><p class="error-message">Error: Could not load the page. Please try again later.</p></div>`;
        }
    };

    const router = () => {
        let path = window.location.hash;

        if (path === '' || path === '#') {
            path = currentUser ? '#dashboard' : '#landing';
            history.replaceState(null, '', path);
        }

        if (currentUser && (path === '#landing' || path === '#auth')) {
            window.location.hash = '#dashboard';
            return;
        }

        const protectedRoutes = ['#dashboard', '#profile', '#skill-hub', '#business'];
        if (!currentUser && protectedRoutes.includes(path)) {
            window.location.hash = '#auth';
            return;
        }

        const viewFile = routes[path] || '404.html';
        loadView(viewFile);
    };

    auth.onAuthStateChanged(user => {
        currentUser = user;
        updateNav();
        router();
    });

    const updateNav = () => {
        if (currentUser) {
            mainNav.innerHTML = `
                <a href="#dashboard">Dashboard</a>
                <a href="#gigs">Find Gigs</a>
                <a href="#profile">My Profile</a>
                <a href="#" id="logout-btn">Logout</a>
            `;
        } else {
            mainNav.innerHTML = `
                <a href="#gigs">Browse Gigs</a>
                <a href="#auth" class="button-style">Login / Sign Up</a>
            `;
        }
    };

    const showError = (input, message) => {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.input-error');
        input.classList.add('invalid');
        errorDiv.textContent = message;
    };

    const clearError = (input) => {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.input-error');
        input.classList.remove('invalid');
        errorDiv.textContent = '';
    };

    const clearAllErrors = (form) => {
        if (!form) return;
        form.querySelectorAll('.invalid').forEach(input => clearError(input));
        const generalError = form.querySelector('.error-message');
        if (generalError) {
            generalError.textContent = '';
            generalError.classList.add('hidden');
        }
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    document.body.addEventListener('click', async (e) => {
        if (e.target.id === 'logout-btn') {
            e.preventDefault();
            try {
                await auth.signOut();
                console.log('User signed out');
                window.location.hash = '#auth';
            } catch (error) {
                console.error('Sign out error', error);
                alert('Failed to sign out.');
            }
        }

        if (e.target.matches('.auth-toggle button')) {
            e.preventDefault();
            const loginView = document.getElementById('login-view');
            const signupView = document.getElementById('signup-view');
            if (loginView && signupView) {
                loginView.classList.toggle('hidden');
                signupView.classList.toggle('hidden');
                clearAllErrors(loginView.querySelector('form'));
                clearAllErrors(signupView.querySelector('form'));
            }
        }

        if (e.target.matches('.toggle-password')) {
            const input = e.target.closest('.password-group').querySelector('input');
            if (input) {
                input.type = input.type === 'password' ? 'text' : 'password';
                e.target.textContent = input.type === 'password' ? '👁️' : '🙈';
            }
        }
    });

    document.body.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;

        clearAllErrors(form);
        const generalErrorDiv = form.querySelector('.error-message');

        if (form.id === 'signup-form') {
            let isValid = true;
            const name = form.name;
            const email = form.email;
            const password = form.password;
            const confirmPassword = form.confirmPassword;
            const role = form.role;

            if (name.value.trim() === '') { showError(name, 'Full Name is required.'); isValid = false; } else { clearError(name); }
            if (email.value.trim() === '') { showError(email, 'Email is required.'); isValid = false; } else if (!validateEmail(email.value)) { showError(email, 'Please enter a valid email address.'); isValid = false; } else { clearError(email); }
            if (password.value.length < 6) { showError(password, 'Password must be at least 6 characters long.'); isValid = false; } else { clearError(password); }
            if (confirmPassword.value !== password.value) { showError(confirmPassword, 'Passwords do not match.'); isValid = false; } else if (confirmPassword.value.trim() === '') { showError(confirmPassword, 'Please confirm your password.'); isValid = false; } else { clearError(confirmPassword); }
            if (role.value === '') { showError(role, 'Please select a role.'); isValid = false; } else { clearError(role); }

            if (!isValid) return;

            try {
                const userCredential = await auth.createUserWithEmailAndPassword(email.value, password.value);
                await db.collection('users').doc(userCredential.user.uid).set({
                    name: name.value,
                    email: email.value,
                    role: role.value,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                console.log('User created and profile saved');
            } catch (error) {
                console.error('Sign up error', error);
                if (generalErrorDiv) {
                    generalErrorDiv.textContent = error.message;
                    generalErrorDiv.classList.remove('hidden');
                }
            }
        }

        if (form.id === 'login-form') {
            let isValid = true;
            const email = form.email;
            const password = form.password;

            if (email.value.trim() === '') { showError(email, 'Email is required.'); isValid = false; } else if (!validateEmail(email.value)) { showError(email, 'Please enter a valid email address.'); isValid = false; } else { clearError(email); }
            if (password.value.trim() === '') { showError(password, 'Password is required.'); isValid = false; } else { clearError(password); }

            if (!isValid) return;

            try {
                await auth.signInWithEmailAndPassword(email.value, password.value);
                console.log('User signed in');
            } catch (error) {
                console.error('Sign in error', error);
                if (generalErrorDiv) {
                    generalErrorDiv.textContent = error.message;
                    generalErrorDiv.classList.remove('hidden');
                }
            }
        }
    });

    window.addEventListener('hashchange', router);
});