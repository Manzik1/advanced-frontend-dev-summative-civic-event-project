/*
 * ui.js — Shared UI Utilities (Toast, Navbar, Skeleton Loaders)
 */

/* ---- Toast Notification System ---- */
const Toast = {
    show(message, type = 'info', duration = 4000) {
        const colors = {
            success: 'bg-[#5C3A21]',
            error: 'bg-red-600',
            info: 'bg-[#7B4B28]',
            warning: 'bg-[#D4A373] text-stone-900'
        };
        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ',
            warning: '⚠'
        };
        const id = 'toast-' + Date.now();
        const html = `
            <div id="${id}" class="fixed top-4 right-4 z-50 flex items-center gap-2 px-5 py-3 rounded-lg shadow-lg text-white ${colors[type] || colors.info} transform translate-x-full transition-transform duration-300" role="alert">
                <span class="text-lg font-bold">${icons[type] || icons.info}</span>
                <span>${message}</span>
            </div>`;
        $('body').append(html);
        // Animate in
        setTimeout(() => $(`#${id}`).removeClass('translate-x-full'), 50);
        // Auto-dismiss
        setTimeout(() => {
            $(`#${id}`).addClass('translate-x-full');
            setTimeout(() => $(`#${id}`).remove(), 300);
        }, duration);
    }
};

/* ---- Skeleton Loader ---- */
function showSkeleton(container, count = 3) {
    let html = '';
    for (let i = 0; i < count; i++) {
        html += `
            <div class="animate-pulse bg-white rounded-xl shadow p-6 space-y-3">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                <div class="h-3 bg-gray-200 rounded w-full"></div>
            </div>`;
    }
    $(container).html(html);
}

/* ---- Password Strength Meter ---- */
function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;
    const levels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    return { score, label: levels[score - 1] || 'Too Short', color: colors[score - 1] || 'bg-gray-300', percent: (score / 5) * 100 };
}

/* ---- Date Formatting ---- */
function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
}

function formatDateTime(dateStr) {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

/*
 * ======================================================================
 * ROLE-BASED ACCESS GUARD — Navigation Bar Rendering
 * ======================================================================
 * This function dynamically builds the navigation bar based on the
 * logged-in user's role.
 *
 * - Admin-only links (Dashboard, Admin Panel, Manage Users) are ONLY
 *   rendered when Auth.isAdmin() returns true.
 * - Normal users see: Events, Announcements, Promos, My Registrations,
 *   Profile, and Notifications.
 * - The admin nav links are wrapped in a role check so that normal users
 *   never see admin navigation options in the UI.
 * ======================================================================
 */
function renderNavbar() {
    const user = Auth.getUser();
    const isAdmin = Auth.isAdmin();

    const navbar = `
    <nav class="bg-gradient-to-r from-[#4A2E18] via-[#5C3A21] to-[#7B4B28] shadow-lg sticky top-0 z-40 border-b border-[#D4A373]/30" role="navigation" aria-label="Main navigation">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <a href="dashboard.html" class="flex items-center gap-2 text-white font-bold text-xl hover:text-[#F5EBE0] transition" aria-label="CivicEvents Home">
                    <span class="text-2xl">🏛️</span>
                    <span class="hidden sm:inline">CivicEvents+</span>
                </a>

                <!-- Desktop Nav Links -->
                <div class="hidden md:flex items-center gap-1">
                    <a href="dashboard.html" class="nav-link px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 text-sm font-medium transition">Dashboard</a>
                    <a href="events.html" class="nav-link px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 text-sm font-medium transition">Events</a>
                    <a href="announcements.html" class="nav-link px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 text-sm font-medium transition">Announcements</a>
                    <a href="promos.html" class="nav-link px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 text-sm font-medium transition">Promos</a>
                    <a href="my-registrations.html" class="nav-link px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 text-sm font-medium transition">My Events</a>

                    ${/* ROLE-BASED ACCESS GUARD — Admin-only nav links.
                         These links are ONLY rendered if the user has the "admin" role.
                         Normal users will never see these navigation options. */
                    isAdmin ? `
                    <a href="admin-users.html" class="nav-link px-3 py-2 rounded-lg text-[#F3E9DC] hover:text-white hover:bg-white/10 text-sm font-bold transition">👤 Users</a>
                    ` : ''}
                </div>

                <!-- Right Side: Notifications + Profile -->
                <div class="flex items-center gap-3">
                    <!-- Notification Bell -->
                    <a href="notifications.html" class="relative text-white hover:text-[#D4A373] transition" aria-label="Notifications">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        <span id="notification-badge" class="hidden absolute -top-1 -right-1 bg-[#D4A373] text-[#2E1A0C] text-xs font-extrabold rounded-full w-5 h-5 flex items-center justify-center shadow">0</span>
                    </a>

                    <!-- Profile Dropdown -->
                    <div class="relative" id="profile-dropdown">
                        <button id="profile-btn" class="flex items-center gap-2 text-white hover:text-[#D4A373] transition text-sm" aria-expanded="false" aria-haspopup="true">
                            <div class="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-sm">
                                ${user ? user.full_name.charAt(0).toUpperCase() : '?'}
                            </div>
                            <span class="hidden sm:inline">${user ? user.full_name : 'Guest'}</span>
                            ${isAdmin ? '<span class="text-xs bg-[#D4A373] text-[#2E1A0C] px-1.5 py-0.5 rounded font-extrabold shadow-sm">ADMIN</span>' : ''}
                        </button>
                        <div id="profile-menu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-stone-200">
                            <a href="profile.html" class="block px-4 py-2 text-sm text-[#4A2E18] hover:bg-[#F5EBE0] font-medium">My Profile</a>
                            <a href="my-registrations.html" class="block px-4 py-2 text-sm text-[#4A2E18] hover:bg-[#F5EBE0] font-medium">My Registrations</a>
                            <hr class="my-1 border-stone-200">
                            <button id="logout-btn" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Sign Out</button>
                        </div>
                    </div>

                    <!-- Mobile Menu Toggle -->
                    <button id="mobile-menu-btn" class="md:hidden text-white" aria-label="Open menu" aria-expanded="false">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Nav Menu -->
            <div id="mobile-menu" class="hidden md:hidden pb-4 space-y-1">
                <a href="dashboard.html" class="block px-3 py-2 rounded text-white/90 hover:text-white hover:bg-white/10 text-sm">Dashboard</a>
                <a href="events.html" class="block px-3 py-2 rounded text-white/90 hover:text-white hover:bg-white/10 text-sm">Events</a>
                <a href="announcements.html" class="block px-3 py-2 rounded text-white/90 hover:text-white hover:bg-white/10 text-sm">Announcements</a>
                <a href="promos.html" class="block px-3 py-2 rounded text-white/90 hover:text-white hover:bg-white/10 text-sm">Promos</a>
                <a href="my-registrations.html" class="block px-3 py-2 rounded text-white/90 hover:text-white hover:bg-white/10 text-sm">My Events</a>

                ${/* ROLE-BASED ACCESS GUARD — Admin-only mobile nav links */
                isAdmin ? `
                <a href="admin-users.html" class="block px-3 py-2 rounded text-[#F3E9DC] hover:text-white hover:bg-white/10 text-sm font-bold">👤 Manage Users</a>
                ` : ''}
            </div>
        </div>
    </nav>`;

    $('#navbar-container').html(navbar);

    // Profile dropdown toggle
    $('#profile-btn').on('click', function (e) {
        e.stopPropagation();
        $('#profile-menu').toggleClass('hidden');
    });
    $(document).on('click', function () {
        $('#profile-menu').addClass('hidden');
    });

    // Logout handler
    $('#logout-btn').on('click', function () {
        Auth.logout();
    });

    // Mobile menu toggle
    $('#mobile-menu-btn').on('click', function () {
        $('#mobile-menu').toggleClass('hidden');
    });

    // Load notification count
    loadNotificationCount();
}

/* Fetch notification count and update badge */
async function loadNotificationCount() {
    try {
        const res = await Api.get('/notifications');
        if (res && res.data) {
            const count = res.data.length;
            if (count > 0) {
                $('#notification-badge').text(count > 99 ? '99+' : count).removeClass('hidden');
            }
        }
    } catch (e) {
        // Silently fail — badge simply won't show
    }
}

/* ---- Footer ---- */
function renderFooter() {
    const footer = `
    <footer class="bg-[#2E1A0C] text-[#E6CCB2] mt-auto border-t border-[#4A2E18]" role="contentinfo">
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-white font-bold text-lg mb-3">🏛️ CivicEvents+</h3>
                    <p class="text-sm text-[#D4A373]">Your gateway to city events, announcements, and community engagement.</p>
                </div>
                <div>
                    <h4 class="text-white font-semibold mb-3">Quick Links</h4>
                    <ul class="space-y-1 text-sm">
                        <li><a href="events.html" class="hover:text-white transition">Events</a></li>
                        <li><a href="announcements.html" class="hover:text-white transition">Announcements</a></li>
                        <li><a href="promos.html" class="hover:text-white transition">Promos</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-semibold mb-3">Contact & Help</h4>
                    <p class="text-sm">Email: support@civicevents.com</p>
                    <p class="text-sm">Phone: +1 (555) 123-4567</p>
                    <p class="text-sm mt-2">Need help? Visit our <a href="#" class="text-[#D4A373] hover:text-white underline">Help Center</a></p>
                </div>
            </div>
            <div class="border-t border-[#4A2E18] mt-6 pt-4 text-center text-xs text-[#8C7364]">
                &copy; ${new Date().getFullYear()} CivicEvents+. All rights reserved.
            </div>
        </div>
    </footer>`;
    $('#footer-container').html(footer);
}
