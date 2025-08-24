# Backend - Lead Management System

This is a **Node.js + Express** backend that uses **JWT authentication with cookies** and **MongoDB** for data storage.  

##  Features
- User authentication with JWT stored in HTTP-only cookies  
- MongoDB for database storage  
- Environment variables for configuration  
- CORS enabled for frontend communication  
- Nodemon for development hot-reload  

---

## 📦 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (jsonwebtoken)**
- **Cookies (cookie-parser)**
- **Nodemon**

---

## ⚙️ Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env


MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=https://st.com

## Installation
Clone the repository

git clone https://github.com/avansingh085/Leads_Management.git
cd backend

Install dependencies
npm install

Run the server with Nodemon
npx nodemon






# Frontend - Lead Management System

This is the **Frontend** for the Lead Management System built using **React + Vite** and **Tailwind CSS**.  
It connects to the **Node.js + Express** backend with JWT authentication and cookies.

---

## 🚀 Features
- Built with **React (Vite)** for fast development  
- Styled with **Tailwind CSS**  
- Axios client configured with backend URL  
- Authentication flows (Login, Register, Logout)  
- Secure cookie-based authentication
- Leads edit delete update create pagination and filters login from server side
- Responsive UI  

---

## 📦 Tech Stack
- **React (Vite)**
- **Tailwind CSS**
- **Axios**
- **React Router DOM**

---

## ⚙️ Environment Variables

Create a `.env` file in the root of your frontend project with the following variable:

```env
VITE_BACKEND_URL=http://localhost:3000/api

## Installation
Clone the repository

git clone https://github.com/avansingh085/Leads_Management.git
cd frontend

Install dependencies
npm install

Run the server with Nodemon
npm run dev

