# 💰 Finora

<div align="center">

# Finora — Personal Finance & Earnings Tracker

Track your earnings, manage income records, and monitor your financial progress through a simple and intuitive dashboard.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

</div>

---

## 📖 Overview

**Finora** is a MERN stack application that helps users track their earnings and manage personal finances. Users can securely create an account, log in, add earnings, delete records, and view their financial data from a centralized dashboard.

---

## ✨ Features

### 🔐 User Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes

### 💵 Earnings Tracking

* Add earnings records
* Delete earnings records
* View earnings history

### 📊 Dashboard

* Earnings overview
* Financial tracking dashboard
* Clean and responsive interface

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Frontend

* React
* Vite
* Axios
* React Router

---

## 📂 Project Structure

```text
finora/
├── server.js
├── package.json
├── .env.example
├── middleware/
├── models/
├── routes/
└── frontend/
    ├── src/
    ├── package.json
    └── vite.config.js
```

---

## 📋 Prerequisites

Before running the project, make sure you have:

* Node.js (v18+ recommended)
* npm
* MongoDB

Verify installation:

```bash
node -v
npm -v
mongod --version
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/finora
JWT_SECRET=your_secret_key
```

| Variable   | Description                            |
| ---------- | -------------------------------------- |
| PORT       | Backend server port                    |
| MONGO_URL  | MongoDB connection string              |
| JWT_SECRET | Secret key used for JWT authentication |

---

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/Nullit13/finora.git
cd finora
```

### Install Backend Dependencies

```bash
npm install
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

---

## ▶️ Running the Application

### Start the Backend

From the project root:

```bash
npm start
```

or

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

### Start the Frontend

Open a second terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔄 Development Workflow

### Terminal 1

```bash
npm start
```

### Terminal 2

```bash
cd frontend
npm run dev
```

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:5000 |

---

## 🔒 Authentication Flow

1. User creates an account.
2. User logs in.
3. Server generates a JWT token.
4. Token is used for authenticated requests.
5. Protected routes verify the token before granting access.

---

## 📊 Dashboard

The dashboard allows users to:

* View earnings records
* Track income history
* Add new earnings
* Delete existing earnings
* Monitor financial progress

---

<div align="center">

Built by Nullit with 💜

</div>
