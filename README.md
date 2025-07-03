# MERN To-Do List

A simple and modern To-Do List application built with the MERN stack (MongoDB, Express, React, Node.js) and styled using Material UI.

## Features

- Add, edit, and delete tasks
- Set task status (Completed, In Process, Not Started, Skipped)
- Set and edit task creation date with a date picker
- Responsive and clean Material UI design
- Modular React components (`TaskList`, `TaskForm`, `TaskItem`)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB running locally or accessible remotely

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5555/` by default.

2. **Start the frontend React app:**
   ```bash
   cd ../frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000/` by default.

### Usage

- Use the form to add a new task.
- Click "Edit" on a task to update its details.
- Click "Delete" to remove a task.
- Status and date fields are fully editable.

## Folder Structure

```
backend/        # Express + MongoDB backend
frontend/       # React + Material UI frontend
```

## Customization

- You can change the font family or theme by editing the Material UI theme in `frontend/src/App.js` or your CSS.
- To use a different database or deploy, update the connection string and environment variables as needed.

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Note:**  
This project is not hosted on Netlify or any public server. To use it, run both backend and frontend locally as described above.
