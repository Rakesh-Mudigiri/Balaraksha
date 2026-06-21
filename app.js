// ============================================
// BALARAKSHA - MAIN APPLICATION MODULE
// Core functionality and initialization
// ============================================

const App = {
    // Application State
    state: {
        user: null,
        isAuthenticated: false,
        currentPage: 'home',
        theme: 'light',
        notifications: []
    },

    // Initialize Application
    init() {
        this.loadState();
        this.setupEventListeners();
        this.initializeComponents();
        this.animateCounters();
        this.loadShelterCards();

        // Initialize i18n
        if (window.i18n) {
            window.i18n.init();
        }

        console.log('🏠 Balaraksha Platform Initialized');
    },

    // Load saved state from localStorage
    loadState() {
        const savedState = localStorage.getItem('balaraksha_state');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                this.state = { ...this.state, ...parsed };
            } catch (e) {
                console.error('Failed to parse saved state:', e);
            }
        }
    },

    // Save state to localStorage
    saveState() {
        localStorage.setItem('balaraksha_state', JSON.stringify(this.state));
    },

    // Setup Event Listeners
    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });

            // Close mobile menu on link click
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                });
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        }

        // Shelter search
        const shelterSearch = document.getElementById('shelterSearch');
        if (shelterSearch) {
            shelterSearch.addEventListener('input', (e) => this.filterShelters(e.target.value));
        }

        // Capacity filter
        const capacityFilter = document.getElementById('capacityFilter');
        if (capacityFilter) {
            capacityFilter.addEventListener('change', (e) => this.filterByCapacity(e.target.value));
        }
    },

    // Initialize UI Components
    initializeComponents() {
        // Initialize tooltips, modals, etc.
        this.createToastContainer();
    },

    // Handle Header Scroll
    handleScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        }
    },

    // Animate Counter Numbers
    animateCounters() {
        const counters = document.querySelectorAll('.counter');

        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * easeOut);

                counter.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        };

        // Use Intersection Observer for triggering animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    },

    // Load Shelter Cards
    loadShelterCards() {
        const container = document.getElementById('shelterCards');
        if (!container || !window.appData) return;

        const shelters = window.appData.shelters;

        container.innerHTML = shelters.map(shelter => this.createShelterCard(shelter)).join('');
    },

    // Create Shelter Card HTML
    createShelterCard(shelter) {
        const availableBeds = shelter.capacity - shelter.currentOccupancy;
        const occupancyPercent = (shelter.currentOccupancy / shelter.capacity) * 100;

        let capacityClass = 'capacity-high';
        let capacityText = 'High Availability';

        if (occupancyPercent > 80) {
            capacityClass = 'capacity-low';
            capacityText = 'Limited';
        } else if (occupancyPercent > 50) {
            capacityClass = 'capacity-medium';
            capacityText = 'Medium';
        }

        return `
            <div class="shelter-card" data-shelter-id="${shelter.id}">
                <div class="shelter-card-header">
                    <span class="shelter-name">${shelter.name}</span>
                    <span class="shelter-capacity ${capacityClass}">${capacityText}</span>
                </div>
                <div class="shelter-district">📍 ${shelter.district}</div>
                <div class="shelter-stats">
                    <span>🛏️ ${availableBeds} beds available</span>
                    <span>⭐ ${shelter.rating}</span>
                </div>
            </div>
        `;
    },

    // Filter Shelters by Search
    filterShelters(query) {
        if (!window.appData) return;

        const q = query.toLowerCase().trim();
        const container = document.getElementById('shelterCards');

        if (!container) return;

        const filtered = window.appData.shelters.filter(s =>
            s.name.toLowerCase().includes(q) ||
            s.district.toLowerCase().includes(q)
        );

        container.innerHTML = filtered.map(s => this.createShelterCard(s)).join('');
    },

    // Filter by Capacity
    filterByCapacity(value) {
        if (!window.appData) return;

        const container = document.getElementById('shelterCards');
        if (!container) return;

        let filtered = window.appData.shelters;

        if (value !== 'all') {
            filtered = window.appData.shelters.filter(s => {
                const occupancyPercent = (s.currentOccupancy / s.capacity) * 100;

                if (value === 'high') return occupancyPercent <= 50;
                if (value === 'medium') return occupancyPercent > 50 && occupancyPercent <= 80;
                if (value === 'low') return occupancyPercent > 80;
                return true;
            });
        }

        container.innerHTML = filtered.map(s => this.createShelterCard(s)).join('');
    },

    // Handle Contact Form Submit
    handleContactSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        // Simulate form submission
        this.showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
    },

    // Toast Notification System
    createToastContainer() {
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    },

    showToast(message, type = 'success') {
        const container = document.querySelector('.toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠';
        toast.innerHTML = `
            <span style="font-size: 18px;">${icon}</span>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    },

    // Navigation
    navigateTo(page) {
        this.state.currentPage = page;
        this.saveState();
        // Handle page navigation
    },

    // Get User Location
    async getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                },
                (error) => {
                    reject(error);
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        });
    },

    // Calculate Distance (Haversine formula)
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    },

    toRad(deg) {
        return deg * (Math.PI / 180);
    },

    // Find Nearest Shelters
    findNearestShelters(latitude, longitude, limit = 5) {
        if (!window.appData) return [];

        return window.appData.shelters
            .map(shelter => ({
                ...shelter,
                distance: this.calculateDistance(
                    latitude, longitude,
                    shelter.latitude, shelter.longitude
                )
            }))
            .filter(s => (s.capacity - s.currentOccupancy) > 0) // Has available beds
            .sort((a, b) => a.distance - b.distance)
            .slice(0, limit);
    },

    // Format Date
    formatDate(dateString, format = 'medium') {
        const date = new Date(dateString);
        const options = {
            short: { day: 'numeric', month: 'short' },
            medium: { day: 'numeric', month: 'short', year: 'numeric' },
            long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
            time: { hour: '2-digit', minute: '2-digit' },
            full: { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
        };
        return date.toLocaleDateString('en-IN', options[format] || options.medium);
    },

    // Format Time Ago
    timeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 }
        ];

        for (const interval of intervals) {
            const count = Math.floor(seconds / interval.seconds);
            if (count >= 1) {
                return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
            }
        }

        return 'Just now';
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for use in other modules
window.App = App;
