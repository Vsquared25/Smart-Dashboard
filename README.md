# CampusPilot

CampusPilot is a full-stack student success platform for organizing coursework, managing internship applications, and creating personalized study plans.

It combines academic planning and career preparation in one dashboard, with persistent data powered by an Express API, Prisma ORM, and SQLite.

## Features

- Manage courses with instructor and credit information
- Add, complete, filter, and delete assignments
- View assignment due dates on an interactive monthly calendar
- Generate study plans with an AI-ready planner and local fallback
- Save and delete generated study plans
- Track internship applications by company, role, location, date, and status
- View live dashboard metrics for courses, active assignments, planned study hours, and applications
- Persist courses, assignments, study plans, and applications with SQLite

## Tech Stack

**Frontend**

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React

**Backend**

- Node.js
- Express
- Prisma ORM
- SQLite
- OpenAI API integration for study-plan generation

## Running Locally

### 1. Install frontend dependencies

```bash
npm install

## Future Improvements

- CarmenCanvas/LMS synchronization through an institution-approved OAuth or LTI integration
- Authentication and user-specific data
- Completed-study-session tracking
- Google Calendar synchronization