
/*
 * auth.js — Authentication & Role-Based Access Control (RBAC)
 *
 * This module manages:
 * - JWT token storage
 * - Logged-in user information
 * - Admin and normal-user role checks
 * - Protected page access
 * - Logout and session cleanup
 *
 * IMPORTANT:
 * Frontend role checks control the interface only.
 * The backend remains responsible for actual authorization
 * and protecting sensitive API operations.
 */

const Auth = {

    /*
     * ROLE-BASED ACCESS GUARD — Token Storage
     * Store the JWT for the current browser tab session.
     */

    setToken(token) {
        if (!token || typeof token !== 'string') {
            console.error('Invalid authentication token.');
            return;
        }

        sessionStorage.setItem('civic_token', token);
    },

    getToken() {
        return sessionStorage.getItem('civic_token');
    },


    /*
     * Store the authenticated user information.
     * Expected structure: { id, full_name, email, role }
     */

    setUser(user) {
        if (!user || typeof user !== 'object') {
            console.error('Invalid user information.');
            return;
        }

        sessionStorage.setItem('civic_user', JSON.stringify(user));
    },

    getUser() {
        const data = sessionStorage.getItem('civic_user');

        if (!data) {
            return null;
        }

        try {
            return JSON.parse(data);
        } catch (error) {
            console.error('Unable to read saved user information:', error);

            // Remove corrupted authentication information.
            this.clearSession();

            return null;
        }
    },


    /*
     * ROLE-BASED ACCESS GUARD — Role Verification
     * Only users whose saved role is "admin" receive admin UI access.
     */

    isAdmin() {
        const user = this.getUser();

        return user?.role === 'admin';
    },

    isLoggedIn() {
        return Boolean(this.getToken() && this.getUser());
    },


    /*
     * Clear authentication information.
     * Used during logout and when saved session data is invalid.
     */

    clearSession() {
        sessionStorage.removeItem('civic_token');
        sessionStorage.removeItem('civic_user');
    },


    /*
     * Logout
     * Clear the current session and return the user to login.
     */

    logout() {
        this.clearSession();

        if (window.location.pathname.includes('/pages/')) {
            window.location.replace('login.html');
        } else {
            window.location.replace('pages/login.html');
        }
    },


    /*
     * ROLE-BASED ACCESS GUARD — Authentication Guard
     * Place this check on every page that requires login.
     */

    requireAuth() {
        if (!this.isLoggedIn()) {

            if (window.location.pathname.includes('/pages/')) {
                window.location.replace('login.html');
            } else {
                window.location.replace('pages/login.html');
            }

            return false;
        }

        return true;
    },


    /*
     * ROLE-BASED ACCESS GUARD — Admin-Only Guard
     *
     * Admin pages and actions must check the user's role.
     * Normal users are redirected to the regular dashboard.
     *
     * Backend authorization is still required for real security.
     */

    requireAdmin() {

        if (!this.requireAuth()) {
            return false;
        }

        if (!this.isAdmin()) {

            if (window.location.pathname.includes('/pages/')) {
                window.location.replace('dashboard.html');
            } else {
                window.location.replace('pages/dashboard.html');
            }

            // Display a message if the Toast component is available.
            if (typeof Toast !== 'undefined' && typeof Toast.show === 'function') {
                Toast.show(
                    'Access denied. Admin privileges required.',
                    'error'
                );
            }

            return false;
        }

        return true;
    }

};
