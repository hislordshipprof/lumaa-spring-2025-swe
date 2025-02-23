# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

---

## Overview

Create a “Task Management” application with **React + TypeScript** (frontend), **Node.js** (or **Nest.js**) (backend), and **PostgreSQL** (database). The application should:

1. **Register** (sign up) and **Log in** (sign in) users.
2. After logging in, allow users to:
   - **View a list of tasks**.
   - **Create a new task**.
   - **Update an existing task** (e.g., mark complete, edit).
   - **Delete a task**.


## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (v14 or higher)
-frontend: React + TypeScript
### Database Setup
1. Create a PostgreSQL database for the project
2. Note down your database credentials (username, password, database name)

### Server Setup (NestJS Backend)
1. Navigate to the server directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```bash
    JWT_SECRET=mysecretkey12345
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=?
    DB_NAME=?
   ```
   Replace DB_PASSWORD, DB_NAME with your actual PostgreSQL credentials.

4. Run database migrations:


5. Start the server in development mode:
   ```bash
   npm run start:dev
   ```
   The server will run on http://localhost:3000

### Client Setup (React Frontend)
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The client will run on http://localhost:3001

### Testing the Application
1. Open your browser and navigate to http://localhost:3001
2. Register a new user account
3. Log in with your credentials
4. You can now create, read, update, and delete tasks

### API Endpoints
The server exposes the following endpoints:
- POST /auth/register - Register a new user
- POST /auth/login - Login user
- GET /tasks - Get all tasks
- POST /tasks - Create a new task
- PATCH /tasks/:id - Update a task
- DELETE /tasks/:id - Delete a task