# 🛠️ Fixora – Smart Local Handyman and Repair Service Finder

> **A modern web platform that connects users with verified local service providers for home repairs and maintenance.**  
> Built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**.

---

## 🌐 Live Demo

| Component | URL |
|------------|-----|
| 🖥️ **Frontend (React)** | [https://fixora-frontend-zeta.vercel.app/](https://fixora-frontend-zeta.vercel.app/) |
| ⚙️ **Backend (API)** | [https://fixora-backend-rqej.onrender.com/](https://fixora-backend-rqej.onrender.com/) |
| 🗄️ **Database (MongoDB Atlas)** | [https://cloud.mongodb.com/v2/690a2fb38c220f45881b8199#/clusters](https://cloud.mongodb.com/v2/690a2fb38c220f45881b8199#/clusters) |

---

## 🚀 Overview

Finding reliable electricians, plumbers, and repair professionals is often a challenge — especially in small towns or residential areas.  
Many people rely on **unverified contacts** or **word-of-mouth**, which leads to:

- ❌ Inconsistent service quality  
- 💸 Overcharging or hidden fees  
- ⚠️ Safety and reliability issues  

**Fixora** provides a **centralized digital platform** that ensures:  
✅ Verified professionals  
✅ Transparent pricing  
✅ Secure bookings and reviews  

---

## 🧩 Table of Contents

- [System Architecture](#-system-architecture)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [API Overview](#-api-overview)
- [Data Flow](#-data-flow)
- [Local Setup Guide](#️-local-setup-guide)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🏗️ System Architecture

### **Architecture Overview**


### **Stack Overview**

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, React Router, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Token) |
| **AI Integration** | OpenAI API (for smart issue detection & cost estimation) |
| **Hosting** | Vercel (Frontend), Render (Backend), MongoDB Atlas (Database) |

---

## ✨ Key Features

| Category | Description |
|-----------|--------------|
| 🧑‍💼 **Authentication & Authorization** | Secure JWT-based login/signup for users, providers, and admins |
| 🔍 **Service Listings & Search** | Browse electricians, plumbers, and cleaners by location and category |
| 🌟 **Verified Reviews & Ratings** | Only verified users can review after completing a job |
| 💰 **Transparent Pricing** | Estimated service costs before booking to prevent overcharging |
| 🧰 **Provider Dashboard** | Manage bookings, availability, and track earnings |
| 📊 **User Dashboard** | Manage bookings, view history, and download invoices |
| 💬 **Community Help Forum** | Ask repair-related questions and get expert or peer help |
| 🌐 **Cross-Platform Hosting** | Fully deployed and accessible on desktop & mobile browsers |

---

## 🧠 Tech Stack

### **Frontend**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

### **Database**
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### **Authentication & APIs**
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### **Deployment**
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-2F2F2F?style=for-the-badge&logo=render&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 🔗 API Overview

| Endpoint | Method | Description | Access |
|-----------|---------|-------------|--------|
| `/api/auth/signup` | POST | Register a new user (Customer or Provider) | Public |
| `/api/auth/login` | POST | Authenticate user & return JWT | Public |
| `/api/services` | GET | Retrieve all available service categories | Authenticated |
| `/api/providers` | GET | Get nearby verified service providers | Authenticated |
| `/api/bookings` | POST | Create a new service booking | Authenticated |
| `/api/bookings/:id` | PUT | Update booking status (Accepted/Completed/Cancelled) | Provider only |
| `/api/reviews` | POST | Add a review and rating for a completed service | Authenticated |

---

## 🔄 Data Flow

The application flow works as follows:

1. 🧍 **User Action:**  
   The user browses available services or searches for specific categories (e.g., electricians, plumbers).  

2. 🌐 **API Call (Frontend → Backend):**  
   The React frontend sends requests via Axios/Fetch to the Node.js + Express API.  

3. 🧠 **Backend Processing:**  
   The Express API handles logic such as authentication, CRUD operations, and input validation.  

4. 🗄️ **Database Layer (MongoDB Atlas):**  
   Data is securely stored and retrieved via Mongoose models — including user profiles, services, bookings, and reviews.  

5. 🔁 **Response Cycle:**  
   The backend returns JSON responses, which are displayed dynamically on the frontend UI.  

6. ⭐ **Post-Service Feedback:**  
   After the provider completes a service, the user leaves a verified review and rating to maintain quality and trust.

---

## ⚙️ Local Setup Guide

Follow these steps to run **Fixora** on your local machine 👇

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/vs-code06/fixora.git
cd fixora





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
