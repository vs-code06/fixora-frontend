# 🛠️ Fixora – Smart Local Handyman and Repair Service Finder

> **A modern web platform that connects users with verified local service providers for home repairs and maintenance.**  
> Built with React.js, Node.js, Express, and PostgreSQL.

---

## 🚀 Overview

Finding reliable electricians, plumbers, and repair professionals is often a challenge — especially in small towns or residential areas.  
Many people rely on **unverified contacts** or **word-of-mouth**, which leads to:

- ❌ Inconsistent service quality  
- 💸 Overcharging or hidden fees  
- ⚠️ Safety and reliability issues  

**Fixora** provides a **centralized digital solution** that ensures:
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
| **Database** | PostgreSQL |
| **Authentication** | JWT (JSON Web Token) |
| **AI Integration** | OpenAI API (for smart issue detection & cost estimation) |
| **Hosting** | Vercel (Frontend), Render (Backend), Heroku Postgres (Database) |

---

## ✨ Key Features

| Category | Description |
|-----------|--------------|
| 🧑‍💼 **Authentication & Authorization** | Secure JWT-based login/signup for Users, Providers, and Admins |
| 🔍 **Service Listings & Search** | Browse electricians, plumbers, and cleaners by location and category |
| 🌟 **Verified Reviews & Ratings** | Only verified users can rate providers after completed jobs |
| 💰 **Transparent Pricing** | Estimated service costs before booking prevent overcharging |
| 🧰 **Provider Dashboard** | Manage bookings, update availability, and track earnings |
| 📊 **User Dashboard** | Manage bookings, view history, and download invoices |
| 💬 **Community Help Forum** | Post repair questions & get advice from experts or peers |
| 🌐 **Cross-Platform Hosting** | Deployed web app accessible via desktop and mobile |

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
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### **Authentication & APIs**
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

### **Deployment**
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-2F2F2F?style=for-the-badge&logo=render&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

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
---

## 🌍 Deployment

| Component | Platform |
|------------|-----------|
| **Frontend** | [Vercel]([https://vercel.com](https://fixora-frontend-zeta.vercel.app/)) |
| **Backend** | [Render](https://fixora-backend-rqej.onrender.com/) |
| **Database** | [Mongodb Atlas](https://cloud.mongodb.com/v2/690a2fb38c220f45881b8199#/clusters) |

---

## 🔮 Future Enhancements

- 📱 Mobile App using React Native  
- 💬 Real-time Chat between Users and Providers  
- 💳 Integrated Payment Gateway  
- 🧠 AI-powered service recommendations  
- 📈 Admin Analytics Dashboard  

---

## 👨‍💻 Contributors

| Name | Role | Contact |
|------|------|----------|
| **Vipul Sharma** | Full Stack Developer | [GitHub](https://github.com/) • [LinkedIn](https://linkedin.com/) |

---

## 📄 License

This project is licensed under the **MIT License** – feel free to use and modify for learning or development purposes.

---

## ⭐ Support

If you found **Fixora** helpful or inspiring, please give it a ⭐ on GitHub — it really helps the project grow!




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
