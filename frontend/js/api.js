
/*
 * api.js — Centralized API Helper
 *
 * All frontend requests to the backend go through this module.
 *
 * Responsibilities:
 * - Attach JWT authentication tokens.
 * - Support JSON and FormData requests.
 * - Process successful and unsuccessful responses.
 * - Handle expired sessions and authorization errors.
 *
 * Backend middleware remains responsible for actual security.
 */

const Api = {

    /*
     * CENTRALIZED REQUEST HANDLER
     *
     * Sends requests to the backend and processes the response.
     */

    async request(endpoint, options = {}) {

        const url = `${API_BASE}${endpoint}`;
        const token = Auth.getToken();

        // Create fresh headers for every request.
        const headers = new Headers(options.headers || {});

        /*
         * ROLE-BASED ACCESS GUARD — Authorization Header Injection
         * Attach the JWT token when the user has an active session.
         */

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        /*
         * Detect file uploads.
         * The browser automatically sets the multipart boundary
         * when sending FormData, so do not set its content type manually.
         */

        const isFormData = options.body instanceof FormData;

        if (
            options.body !== undefined &&
            !isFormData &&
            !headers.has('Content-Type')
        ) {
            headers.set('Content-Type', 'application/json');
        }

        try {

            const res = await fetch(url, {
                ...options,
                headers
            });

            /*
             * Read the response as text first.
             * This supports JSON responses, plain-text responses,
             * and successful requests with an empty response body.
             */

            const responseText = await res.text();

            let data = null;

            if (responseText) {
                try {
                    data = JSON.parse(responseText);
                } catch (parseError) {
                    data = { message: responseText };
                }
            }

            /*
             * ROLE-BASED ACCESS GUARD — Authentication Failure
             *
             * HTTP 401 means the token is missing, expired,
             * or invalid. Clear the session and return to login.
             */

            if (res.status === 401) {
                Auth.logout();
                return null;
            }

            /*
             * ROLE-BASED ACCESS GUARD — Permission Failure
             *
             * HTTP 403 means the user is authenticated but
             * is not permitted to perform the requested action.
             * Do not log the user out for this response.
             */

            if (res.status === 403) {
                throw {
                    status: 403,
                    message: data?.message || 'You do not have permission to perform this action.'
                };
            }

            // Handle other unsuccessful HTTP responses.
            if (!res.ok) {
                throw {
                    status: res.status,
                    message: data?.message || 'The request could not be completed.'
                };
            }

            return data;

        } catch (err) {

            // Preserve errors generated from HTTP responses.
            if (err.status !== undefined) {
                throw err;
            }

            // Handle network errors and unexpected request failures.
            console.error('API request error:', err);

            throw {
                status: 0,
                message: 'Network error. Please check your connection and try again.'
            };
        }
    },


    /*
     * GET — Retrieve information from the backend.
     */

    get(endpoint) {
        return this.request(endpoint, {
            method: 'GET'
        });
    },


    /*
     * POST — Create a new resource or submit information.
     * Supports JSON and FormData uploads.
     */

    post(endpoint, body) {

        const isFormData = body instanceof FormData;

        return this.request(endpoint, {
            method: 'POST',
            body: isFormData ? body : JSON.stringify(body)
        });
    },


    /*
     * PUT — Update an existing resource.
     * Supports JSON and FormData uploads.
     */

    put(endpoint, body) {

        const isFormData = body instanceof FormData;

        return this.request(endpoint, {
            method: 'PUT',
            body: isFormData ? body : JSON.stringify(body)
        });
    },


    /*
     * PATCH — Partially update an existing resource.
     */

    patch(endpoint, body) {

        return this.request(endpoint, {
            method: 'PATCH',
            body: body === undefined ? undefined : JSON.stringify(body)
        });
    },


    /*
     * DELETE — Remove a resource.
     */

    delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }

};
