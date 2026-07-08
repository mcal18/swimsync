# 🏊 SwimSync

**SwimSync** is a modern swim training management platform built with **React** and **Firebase**. It helps swimmers organize workouts, monitor training progress, and eventually analyze performance over time through an intuitive, responsive interface inspired by competitive swimming.

---

## ✨ Features

### 👤 User Authentication
- Firebase Authentication
- Secure login and registration
- Persistent sessions
- Protected routes

### ⚙️ Profile Management
- Editable swimmer profile
- Team and coach information
- Primary stroke selection
- Profile completion indicator
- Member since information

### 🏋️ Workout Management
- Create, edit and delete workouts
- Log:
  - Workout title
  - Distance
  - Duration
  - Stroke focus
  - Session type
  - Main set
  - Workout date
- Responsive workout cards
- Glassmorphism interface
- Smooth modal interactions

### 📊 Workout Statistics
Automatically generated dashboard including:

- Total workouts
- Total distance
- Total training time
- Average workout distance

### 📱 Responsive Design
Optimized for:

- Desktop
- Laptop
- Tablet
- Mobile

using a centralized responsive stylesheet.

---

## 🚧 Currently In Development

The following modules are planned:

- 🔍 Workout search
- 🎯 Workout filters
- 📈 Performance analytics
- 🏆 Goal tracking
- 📅 Training calendar
- 📊 Charts and visualizations
- 🥇 Personal Records
- Swim pace calculators

---

# 🛠 Tech Stack

### Frontend

- React
- React Router
- React Icons
- CSS3

### Backend

- Firebase Authentication
- Cloud Firestore

### Tools

- Git
- GitHub
- Vite

---

# 📂 Project Structure

```
src/
│
├── assets/
├── components/
│   ├── WorkoutCard.jsx
│   ├── WorkoutModal.jsx
│   ├── WorkoutStats.jsx
│   ├── Sidebar.jsx
│   └── ...
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Workouts.jsx
│   ├── Settings.jsx
│   └── ...
│
├── services/
│   └── workouts.js
│
├── context/
│
├── config/
│
└── styles/
    ├── workouts.css
    ├── workoutmodal.css
    ├── workoutstats.css
    ├── responsive.css
    └── ...
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/swimsync.git
```

## Install dependencies

```bash
npm install
```

## Create a Firebase project

Create a Firebase project and enable:

- Authentication
- Firestore Database

Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Run locally

```bash
npm run dev
```

---

# 📸 Screenshots

> Screenshots will be added as development progresses.

---

# 🎨 Design Philosophy

SwimSync follows a modern glassmorphism design language featuring:

- Ocean-inspired color palette
- Frosted glass components
- Smooth animations
- Clean typography
- Consistent spacing
- Accessible layouts

The interface is designed to feel lightweight and focused, allowing athletes to concentrate on their training rather than navigating complex menus.

---

# 🎯 Roadmap

## Phase 1 ✔
- Authentication
- Profile page
- Workout CRUD
- Workout cards
- Statistics dashboard

## Phase 2 🚧
- Search workouts
- Filters
- Sorting
- Empty states
- Better loading states

## Phase 3
- Performance tracking
- Charts
- Best times
- Training trends

## Phase 4
- Goals
- Calendar
- Notifications
- Personal records

---

# 🤝 Contributing

Contributions, suggestions, and feedback are always welcome.

Feel free to open an issue or submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Maria Cecília**

GitHub: https://github.com/YOUR_USERNAME
