# CivicEvents – City Events & Community Services Portal

CivicEvents is a web application designed to help people discover local events, stay informed about public announcements, and participate in community activities.

The platform provides separate features for regular users and administrators, making it easier to manage city events and share important information with the community.

## Project Features

- Browse and view upcoming community events.
- Register for events.
- View public announcements.
- Listen to audio announcements and access transcripts.
- Watch promotional videos and community campaigns with captions.
- Receive in-app notifications.
- View and manage user profiles.
- Submit event feedback.
- Admin dashboard for managing events, announcements, users, and promotions.
- Enable or disable user accounts.
- Responsive interface for desktop and mobile devices.

## Project Structure

The repository is organized into the following main folders:

- `frontend/` – Contains the frontend application, including HTML, CSS, JavaScript, pages, and other frontend resources.
- `backend/` – Contains the Node.js API, database configuration, and server-side functionality used for local development.

## Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript
- jQuery
- Tailwind CSS

**Backend and Database**
- Node.js
- Express.js
- PostgreSQL
- REST API

## Getting Started

Follow these steps to run the application locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Manzik1/advanced-frontend-dev-summative-civic-event-project.git
```

Move into the project directory:

```bash
cd advanced-frontend-dev-summative-civic-event-project
```

### 2. Set Up the Backend

Open a terminal and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory and add your database configuration:

```env
DB_USER=your_database_user
DB_PASS=your_database_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=civic-events-db
JWT_SECRET=your_secret_key
PORT=4000
```

Make sure PostgreSQL is running and the required database has been created and configured.

Start the backend server:

```bash
npm run dev
```

The backend API will run at:

`http://localhost:4000`

The API base URL used by the frontend is:

`http://localhost:4000/api`

### 3. Run the Frontend

Open a second terminal from the repository root.

Run:

```bash
npx serve . -p 3000
```

Open the following address in your browser:

`http://localhost:3000/frontend/`

Alternatively, you can use Python's local server:

```bash
python -m http.server 3000
```

Then visit the same frontend address.

### 4. Connecting the Frontend to the Backend

The frontend communicates with the backend through REST API requests.

The local API base URL is:

```text
http://localhost:4000/api
```

The frontend API configuration and API service files are located in:

- `frontend/js/config.js`
- `frontend/js/api.js`

Make sure the backend server is running before using features that require database access, authentication, or API requests.

For deployment, update the API base URL to match the deployed backend address.

## Environment Variables

The backend requires the following environment variables:

| Variable | Purpose |
|---|---|
| DB_USER | PostgreSQL username |
| DB_PASS | PostgreSQL password |
| DB_HOST | Database host |
| DB_PORT | PostgreSQL port |
| DB_NAME | Database name |
| JWT_SECRET | Secret used for authentication tokens |
| PORT | Backend server port |

**Important:** Do not upload your `.env` file or expose database passwords and secret keys on GitHub.

## Role-Based Access Control

CivicEvents supports two account roles:

**Normal Users**
- Access published events, announcements and promotional content.
- Register for events.
- View their registrations.
- Submit event feedback.
- View notifications and manage their profiles.

**Administrators**
- Access the administrator dashboard.
- Create, view, update and delete events.
- Manage announcements and promotional content.
- View and manage registered users.
- Enable or disable user accounts.

Role-based access guards are implemented in the frontend authentication and page protection logic. Administrator-only pages and actions are restricted to authenticated administrators, while normal users are provided with the features permitted by their role.

The backend remains responsible for enforcing actual API permissions.

## Code Documentation

The source code includes comments explaining authentication and role-based access control, including administrator-only page guards and restrictions on normal user access.

## Video Demonstration

The project walkthrough demonstrates:

- Normal user functionalities and actions.
- Administrator functionalities and actions.
- Backend API and PostgreSQL database setup.
- Communication between the frontend and backend.

**Watch the CivicEvents Project Demonstration Video:**

[Watch CivicEvents Demo Video on Google Drive](https://drive.google.com/file/d/1hVEp0HN1BJjh6iq1nj8AcYEr6dNBHEvY/view?usp=sharing)

## Running the Application

For the complete application to work correctly:

1. Start PostgreSQL.
2. Start the backend server on port `4000`.
3. Start the frontend on port `3000`.
4. Open the frontend in your browser.

## Repository Information

This project was developed as part of the Advanced Frontend Development Summative Project.

The frontend implementation is maintained inside the `frontend/` directory.

All required project files are committed and pushed to the student's public forked GitHub repository.

**Project:** CivicEvents – City Events & Community Services Portal

**GitHub Repository:**  
https://github.com/Manzik1/advanced-frontend-dev-summative-civic-event-project