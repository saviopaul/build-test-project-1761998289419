# Test Project

This is a simple full-stack test project demonstrating a basic setup with:

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Setup Instructions](#setup-instructions)
    -   [Backend Setup](#backend-setup)
    -   [Frontend Setup](#frontend-setup)
3.  [Running the Application](#running-the-application)

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (LTS version, e.g., v18.x)
-   npm or yarn
-   PostgreSQL database server

## Setup Instructions

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or yarn install
    ```
3.  Create a `.env` file in the `backend` directory based on `.env.example`:
    ```dotenv
    DATABASE_URL="postgresql://user:password@localhost:5432/testdb?schema=public"
    PORT=5000
    ```
    *Make sure to replace `user`, `password`, and `testdb` with your actual PostgreSQL credentials and database name.*

4.  Run Prisma migrations to create the database schema:
    ```bash
    npx prisma migrate dev --name init
    ```
5.  Generate Prisma client:
    ```bash
    npx prisma generate
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or yarn install
    ```
3.  Create a `.env` file in the `frontend` directory based on `.env.example`:
    ```dotenv
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

## Running the Application

1.  **Start the Backend Server**
    From the `backend` directory:
    ```bash
    npm run dev
    # or yarn dev
    ```
    The backend server will run on `http://localhost:5000` (or the `PORT` specified in your `.env`).

2.  **Start the Frontend Development Server**
    From the `frontend` directory:
    ```bash
    npm run dev
    # or yarn dev
    ```
    The frontend application will open in your browser, typically at `http://localhost:5173`.

Now you can interact with the application. The frontend will fetch data from the backend.