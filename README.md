# 🍲 RecipeBook App

A full-stack RecipeBook application built with **React, Node.js, Express, and MongoDB**.

## 🌐 Live Demo
Frontend: https://recipebook-frontend-x9ew.onrender.com  
Backend API: https://recipebook-new.onrender.com
(API endpoints start from /recipes and /auth)


## 🛠️ Tech Stack
- React
- Node.js
- Express
- MongoDB
- JWT Authentication
- Render (Deployment)

## ✨ Features
- User authentication (Signup / Login)
- Add, edit, and delete recipes
- View all recipes
- Secure routes with JWT

 ### 🔗 API Endpoints
- GET /recipes
- POST /auth/login
- POST /auth/register

 ### 🔐 Authentication

POST /auth/register – Register a new user

POST /auth/login – Login and get JWT token

 ## 🚀 Getting Started
Prerequisites

Node.js (v16+ recommended)

MongoDB (local or Atlas)

npm or yarn

 ## Installation

Clone the repository

git clone <repository-url>
cd recipebook


 ## Install dependencies for both frontend and backend

cd backend
npm install
cd ../frontend
npm install

 ### Configure environment variables (example .env in backend):

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000


 ### Start the servers

# Backend
cd backend
npm run dev
# Frontend
cd frontend
npm start

 ### 📝 Usage

Sign up or log in to your account.

Add new recipes with ingredients and instructions.

Edit or delete your recipes.

Browse recipes from other users.

 ### ⚡ Future Improvements

Recipe search & filters

User profiles & favorites

Image uploads for recipes
