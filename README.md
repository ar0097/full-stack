# 📌 Student Job Tracker

A full-stack job application tracking tool built with **Next.js**, **Tailwind CSS**, **TypeScript**, **Node.js**, and **MongoDB**. This project helps students keep track of all their job applications, from the initial submission to final decisions.

---

## 🌐 Live Demo

👉 **[Visit the App](https://job-tracker-ui-puce.vercel.app)**

---

## ✨ Features

- Add new job applications with company, role, date, status, and optional link.
- Update the status of any job application (Applied, Interview, Offer, Rejected).
- Delete job entries when not needed.
- Filter jobs based on their current status.
- Clean and responsive UI using Tailwind CSS.
- Fully integrated backend with MongoDB for persistent data storage.
- RESTful API design.
- Deployed frontend on Vercel, backend on Render.

---

## 🛠️ Tech Stack

**Frontend:**

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Hooks (useState, useEffect)

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose

**Deployment:**

- Frontend: Vercel
- Backend: Render

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-job-tracker.git
cd student-job-tracker
npm install
Create a .env.local file in the root directory and add your backend API URL:
NEXT_PUBLIC_API_URL=https://full-stack-6kry.onrender.com/api/jobs
Start the Development Server
npm run dev

```

# Backend Overview

## Backend is built using Express.js and MongoDB and provides the following routes:

```bash
GET /api/jobs - Fetch all jobs (with optional ?status= filter)

POST /api/jobs - Add a new job

PUT /api/jobs/:id - Update job status

DELETE /api/jobs/:id - Delete a job

You can deploy the backend using Render and plug the API URL into the .env.local file.
```
