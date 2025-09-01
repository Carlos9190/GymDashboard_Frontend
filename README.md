# GymDashboard Frontend

## Description

This is the frontend for the **GymDashboard** project, providing a responsive and user-friendly interface for managing gym routines, exercises, user accounts, and workout records. It integrates seamlessly with the backend API for authentication, data management, and real-time feedback.

---

## Technologies Used

- **React.js** – UI library for building interactive interfaces
- **TypeScript** – Static typing for JavaScript
- **Chakra UI** – Accessible component library for rapid UI development
- **Tailwind CSS** – Utility-first CSS framework for custom styling
- **React Hook Form** – Advanced form handling and validation
- **Zod** – Schema validation for forms and API responses
- **React Router DOM** – Client-side routing and navigation
- **Axios** – HTTP client for API requests
- **React Toastify** – Toast notifications for user feedback
- **React Query** – Data fetching, caching, and state management
- **Vite** – Fast development server and build tool

---

## Features

- **Authentication**: Register, login, password recovery, JWT session management
- **Profile Management**: Update profile info, change password
- **Routine Management**: Create, edit, delete routines; assign exercises
- **Exercise Management**: CRUD for exercises, image upload, assign to routines
- **Workout Records**: Add, edit, delete records for exercises; view progress
- **Responsive Design**: Mobile-first, adaptive layouts
- **Validation & Error Handling**: Form validation, custom error messages
- **Notifications**: Toasts for success, error, and info
- **API Integration**: Full communication with backend endpoints
- **Loading & Empty States**: User feedback for async actions
- **Pagination & Filtering**: For large lists of records and exercises

---

## Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Carlos9190/GymDashboard_Frontend.git
cd GymDashboard_Frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env.local` file in the project's root directory and define the following variable:

```env
VITE_API_URL=http://localhost:4000/api
```

### 4️⃣ Start the development server

```bash
npm run dev
```

---

## Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Make sure the backend server is running and accessible at the API URL you configured.

---

## API Reference

All frontend features communicate with the backend API. See the [Backend Repository](https://github.com/Carlos9190/GymDashboard_Backend) for endpoint documentation.

---

Developed by **[Carlos Ibarra](https://github.com/Carlos9190)** and **[Elkin Carreño](https://github.com/elkincarreno10)**.

- [Backend Repository](https://github.com/Carlos9190/GymDashboard_Backend)
