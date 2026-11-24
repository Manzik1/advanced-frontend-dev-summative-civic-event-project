# CivicEvents Frontend

This folder contains the frontend application for CivicEvents, a city events and community services portal.

The application allows users to explore community events, register for activities, read public announcements, view promotional content, and receive notifications. Administrators can also manage the platform through the admin dashboard.

## Main Features

- User registration and login.
- Browse and view community events.
- Register for available events.
- View public announcements.
- Watch promotional videos and campaigns.
- Access user notifications.
- Admin dashboard for managing events, users, announcements, and promotions.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Tailwind CSS

## Running the Frontend Locally

### Requirements

- Node.js installed.
- A modern web browser.
- The CivicEvents backend running for API-dependent features.

### Steps

1. Open a terminal in the main project directory.
2. Run the frontend using a local development server:

```bash
npx serve frontend -p 3000
```

3. Open your browser and visit:

```text
http://localhost:3000
```

Alternatively, you can use Python:

```bash
python -m http.server 3000
```

When using Python, run the command from the main project directory and visit:

```text
http://localhost:3000/frontend/
```

## Backend Connection

The frontend communicates with the backend through REST API endpoints.

For local development, the API base URL is:

```text
http://localhost:4000/api
```

Make sure the backend server is running before testing features that require server communication.

If the backend is hosted elsewhere, update the API base URL in the frontend configuration to the appropriate address.

## Project Files

The `frontend` directory contains the application's user interface, page files, stylesheets, JavaScript functionality, and other resources required by the application.

## Notes

- Keep the frontend and backend servers running while testing the complete application.
- Do not include private credentials or secret keys in frontend files.
- Ensure that all frontend changes are committed and pushed to GitHub.

**Project:** CivicEvents – City Events & Community Services Portal