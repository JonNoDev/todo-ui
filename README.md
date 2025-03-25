# 📝 Todo UI (Frontend)

This is the **React frontend** for the Todo app. It connects to a backend API (`todo-backend`) to manage user registration, authentication, and todo item CRUD functionality.

## 🚀 Features

- User authentication (Register / Login / Logout)
- Responsive design (mobile-optimized)
- Create, view, edit, and delete todos
- Filter todos by completion status
- Material UI interface
- Route-based modal confirmations

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/todo-ui.git
cd todo-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a .env file in the root of the project with the following:

```bash
REACT_APP_BACKEND_URL=http://localhost:8080
```

---

## 📦 Available Scripts

`npm start`
Runs the app in development mode at http://localhost:3000

`npm run build`
Builds the app for production to the `build/` folder.