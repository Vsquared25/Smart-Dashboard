# CampusPilot

CampusPilot is a full-stack student success platform that brings academic planning and career preparation into one dashboard.

It helps students manage courses, assignments, study plans, and internship applications with persistent data backed by an Express API, Prisma ORM, and SQLite.

## Features

- Create and manage courses with instructor and credit information
- Add, complete, filter, and delete assignments
- View assignment due dates in an interactive monthly calendar
- Generate personalized study plans with an AI-ready planner and a local fallback
- Save and delete generated study plans
- Track internship applications by company, role, location, date, and status
- View live dashboard metrics for active assignments, courses, study hours, and applications
- Open the notification panel to view active assignment reminders
- Use the profile menu to access settings and quickly toggle light/dark mode
- Customize light/dark mode, text size, and font family
- Persist display and reminder preferences in browser storage
- Persist courses, assignments, study plans, and applications in SQLite

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React

### Backend

- Node.js
- Express
- Prisma ORM
- SQLite
- OpenAI API integration for study-plan generation

## Architecture

```text
React + TypeScript frontend
        ↓ REST API
Express backend
        ↓ Prisma ORM
SQLite database
```

## Running Locally

### 1. Install frontend dependencies

From the project root:

```bash
npm install
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure environment variables

Create `server/.env`:

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="your_optional_openai_api_key"
```

`OPENAI_API_KEY` is optional. When AI generation is unavailable, CampusPilot uses a local study-plan fallback so the planner remains functional.

### 4. Set up the database

From the `server` folder:

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Start the backend

```bash
npm run dev
```

The API runs at:

```text
http://localhost:4000
```

### 6. Start the frontend

Open a second terminal in the project root:

```bash
npm run dev
```

Then open the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Future Improvements

- CarmenCanvas/LMS synchronization through an institution-approved OAuth or LTI integration
- Authentication and user-specific cloud data
- Completed-study-sessio
```