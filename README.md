# CivicEvents – City Events & Community Services Portal

CivicEvents is a web application designed to help people discover local events, stay informed about public announcements, and participate in community activities.

The platform provides separate features for regular users and administrators, making it easier to manage city events and share important information with the community.

## Project Features

- Browse and view upcoming community events.
- Register for events.
- View public announcements.
- Watch promotional videos and community campaigns.
- Receive notifications.
- Admin dashboard for managing events, announcements, users, and promotions.
- Responsive interface for desktop and mobile devices.

## Project Structure

The repository is organized into the following main folders:

- `frontend/` – Contains the frontend application, including HTML, CSS, JavaScript, pages, and other frontend resources.
- `backend/` – Contains the Node.js API, database configuration, and server-side functionality.
- `video-demo/` – Contains the project demonstration video.

## Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript
- Tailwind CSS

**Backend**
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
cd .\advanced-frontend-dev-summative-civic-event-project\
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

Make sure PostgreSQL is running and the database has been created.

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

You can also use Python's local server:

```bash
python -m http.server 3000
```

Then visit the same frontend address.

### 4. Connecting the Frontend to the Backend

The frontend communicates with the backend through the REST API.

The local API base URL is:

```text
http://localhost:4000/api
```

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

## Running the Application

For the complete application to work correctly:

1. Start PostgreSQL.
2. Start the backend server on port `4000`.
3. Start the frontend on port `3000`.
4. Open the frontend in your browser.

## Repository Information

This project was developed as part of the Advanced Frontend Development Summative Project.

The frontend implementation is maintained inside the `frontend/` directory.

All required project files should be committed and pushed to the forked GitHub repository.

---

**Project:** CivicEvents – City Events & Community Services Portal