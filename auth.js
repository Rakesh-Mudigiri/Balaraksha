// ============================================
// BALARAKSHA - AUTHENTICATION MODULE
// Multi-stakeholder login and session management
// ============================================

const Auth = {
    // Current user session
    session: null,

    // Initialize Auth Module
    init() {
        this.loadSession();
        this.setupEventListeners();
        this.updateUI();
    },

    // Load session from localStorage
    loadSession() {
        const savedSession = localStorage.getItem('balaraksha_session');
        if (savedSession) {
            try {
                this.session = JSON.parse(savedSession);
                // Check if session is expired (24 hours)
                if (this.session && this.session.expiresAt < Date.now()) {
                    this.logout();
                }
            } catch (e) {
                console.error('Failed to load session:', e);
                this.session = null;
            }
        }
    },

    // Save session to localStorage
    saveSession() {
        if (this.session) {
            localStorage.setItem('balaraksha_session', JSON.stringify(this.session));
        } else {
            localStorage.removeItem('balaraksha_session');
        }
    },

    // Setup Event Listeners
    setupEventListeners() {
        // Login form tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // OTP form submission
        const otpForm = document.getElementById('otpForm');
        if (otpForm) {
            otpForm.addEventListener('submit', (e) => this.handleOTPVerify(e));
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Send OTP button
        const sendOtpBtn = document.getElementById('sendOtpBtn');
        if (sendOtpBtn) {
            sendOtpBtn.addEventListener('click', () => this.sendOTP());
        }

        // OTP input auto-focus
        document.querySelectorAll('.otp-input').forEach((input, index, inputs) => {
            input.addEventListener('input', (e) => {
                if (e.target.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });
    },

    // Switch Login Tab
    switchTab(tabName) {
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        document.querySelectorAll('.auth-form-section').forEach(section => {
            section.classList.toggle('active', section.id === `${tabName}Section`);
        });
    },

    // Handle Login
    async handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');

        const role = document.querySelector('.auth-tab.active')?.dataset.tab || 'citizen';
        const identifier = form.querySelector('input[name="identifier"]')?.value;
        const password = form.querySelector('input[name="password"]')?.value;

        if (!identifier) {
            this.showError('Please enter your phone number or email');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Logging in...';

        try {
            // Simulate API call
            await this.simulateDelay(1500);

            // Demo login - accept any credentials
            const user = this.createDemoUser(role, identifier);
            this.loginUser(user);

            // Redirect based on role
            this.redirectToDashboard(role);
        } catch (error) {
            this.showError(error.message || 'Login failed. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Login';
        }
    },

    // Send OTP
    async sendOTP() {
        const phoneInput = document.getElementById('phoneNumber');
        const phone = phoneInput?.value;

        if (!phone || phone.length < 10) {
            this.showError('Please enter a valid 10-digit phone number');
            return;
        }

        const btn = document.getElementById('sendOtpBtn');
        btn.disabled = true;
        btn.textContent = 'Sending...';

        try {
            await this.simulateDelay(1000);

            // Show OTP section
            document.getElementById('otpSection').classList.add('active');
            document.getElementById('phoneSection').style.display = 'none';

            // Start countdown
            this.startOTPCountdown(30);

            this.showSuccess('OTP sent successfully to +91 ' + phone);
        } catch (error) {
            this.showError('Failed to send OTP. Please try again.');
        } finally {
            btn.disabled = false;
            btn.textContent = 'Send OTP';
        }
    },

    // OTP Countdown Timer
    startOTPCountdown(seconds) {
        const timerEl = document.getElementById('otpTimer');
        const resendBtn = document.getElementById('resendOtpBtn');

        if (resendBtn) resendBtn.disabled = true;

        const interval = setInterval(() => {
            seconds--;
            if (timerEl) timerEl.textContent = `Resend OTP in ${seconds}s`;

            if (seconds <= 0) {
                clearInterval(interval);
                if (timerEl) timerEl.textContent = '';
                if (resendBtn) resendBtn.disabled = false;
            }
        }, 1000);
    },

    // Handle OTP Verification
    async handleOTPVerify(e) {
        e.preventDefault();

        const otpInputs = document.querySelectorAll('.otp-input');
        const otp = Array.from(otpInputs).map(i => i.value).join('');

        if (otp.length !== 6) {
            this.showError('Please enter the complete 6-digit OTP');
            return;
        }

        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Verifying...';

        try {
            await this.simulateDelay(1000);

            // For demo, accept any 6-digit OTP
            const phone = document.getElementById('phoneNumber')?.value;
            const user = this.createDemoUser('citizen', phone);
            this.loginUser(user);

            this.showSuccess('Phone verified successfully!');
            await this.simulateDelay(500);

            // Redirect to citizen dashboard
            window.location.href = 'dashboard-citizen.html';
        } catch (error) {
            this.showError('Invalid OTP. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Verify OTP';
        }
    },

    // Handle Registration
    async handleRegister(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;

        try {
            await this.simulateDelay(1500);

            // Create user and login
            const user = {
                id: 'USR' + Date.now(),
                name: data.name,
                phone: data.phone,
                email: data.email,
                role: data.role || 'citizen',
                verified: false,
                createdAt: new Date().toISOString()
            };

            this.loginUser(user);
            this.showSuccess('Registration successful!');

            await this.simulateDelay(500);
            this.redirectToDashboard(user.role);
        } catch (error) {
            this.showError('Registration failed. Please try again.');
        } finally {
            submitBtn.disabled = false;
        }
    },

    // Create Demo User
    createDemoUser(role, identifier) {
        const roleNames = {
            citizen: 'Demo Citizen',
            shelter: 'Shelter Admin',
            government: 'DCPU Officer',
            volunteer: 'Volunteer'
        };

        return {
            id: 'USR' + Date.now(),
            name: roleNames[role] || 'User',
            phone: identifier,
            email: `${role}@demo.balaraksha.in`,
            role: role,
            verified: true,
            avatar: this.getRoleAvatar(role),
            permissions: this.getRolePermissions(role),
            createdAt: new Date().toISOString()
        };
    },

    // Get Role Avatar
    getRoleAvatar(role) {
        const avatars = {
            citizen: '👤',
            shelter: '🏠',
            government: '🏛️',
            volunteer: '🤝',
            police: '👮',
            healthcare: '🏥'
        };
        return avatars[role] || '👤';
    },

    // Get Role Permissions
    getRolePermissions(role) {
        const permissions = {
            citizen: ['report_case', 'track_case', 'find_shelter'],
            volunteer: ['report_case', 'track_case', 'accept_tasks', 'view_assignments'],
            shelter: ['manage_children', 'manage_capacity', 'view_cases', 'update_records'],
            government: ['view_all_cases', 'manage_cases', 'generate_reports', 'admin_access'],
            police: ['view_cases', 'update_investigation', 'file_report'],
            healthcare: ['view_medical', 'update_medical', 'health_reports']
        };
        return permissions[role] || [];
    },

    // Login User
    loginUser(user) {
        this.session = {
            user: user,
            token: 'demo_token_' + Date.now(),
            expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
            loginAt: Date.now()
        };
        this.saveSession();
        this.updateUI();
    },

    // Logout
    logout() {
        this.session = null;
        this.saveSession();
        this.updateUI();
        window.location.href = 'index.html';
    },

    // Redirect to Dashboard
    redirectToDashboard(role) {
        const dashboards = {
            citizen: 'dashboard-citizen.html',
            shelter: 'dashboard-shelter.html',
            government: 'dashboard-government.html',
            volunteer: 'dashboard-volunteer.html'
        };
        window.location.href = dashboards[role] || 'dashboard-citizen.html';
    },

    // Update UI based on auth state
    updateUI() {
        const isLoggedIn = this.isAuthenticated();

        // Update header if exists
        document.querySelectorAll('.auth-required').forEach(el => {
            el.style.display = isLoggedIn ? 'block' : 'none';
        });

        document.querySelectorAll('.guest-only').forEach(el => {
            el.style.display = isLoggedIn ? 'none' : 'block';
        });

        if (isLoggedIn && this.session?.user) {
            document.querySelectorAll('.user-name').forEach(el => {
                el.textContent = this.session.user.name;
            });
            document.querySelectorAll('.user-avatar').forEach(el => {
                el.textContent = this.session.user.avatar;
            });
        }
    },

    // Check if authenticated
    isAuthenticated() {
        return !!(this.session && this.session.expiresAt > Date.now());
    },

    // Get current user
    getCurrentUser() {
        return this.session?.user || null;
    },

    // Check permission
    hasPermission(permission) {
        const user = this.getCurrentUser();
        return user?.permissions?.includes(permission) || false;
    },

    // Require authentication (for protected pages)
    requireAuth(allowedRoles = []) {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
            return false;
        }

        if (allowedRoles.length > 0) {
            const user = this.getCurrentUser();
            if (!allowedRoles.includes(user?.role)) {
                window.location.href = 'index.html';
                return false;
            }
        }

        return true;
    },

    // Show Error Message
    showError(message) {
        const errorDiv = document.getElementById('authError');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 5000);
        } else if (window.App) {
            window.App.showToast(message, 'error');
        } else {
            alert(message);
        }
    },

    // Show Success Message
    showSuccess(message) {
        const successDiv = document.getElementById('authSuccess');
        if (successDiv) {
            successDiv.textContent = message;
            successDiv.style.display = 'block';
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 3000);
        } else if (window.App) {
            window.App.showToast(message, 'success');
        }
    },

    // Simulate network delay
    simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});

// Export for use in other modules
window.Auth = Auth;
