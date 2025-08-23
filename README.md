# TradeBuddy (⚠️ In Development)

## 📌 Overview

**TradeBuddy** is a **full-stack stock trading platform simulator** designed for **educational purposes**.  
It mimics the **UI, workflows, and trading features** inspired by apps like **Zerodha**, but **does not perform real trading or financial transactions**.

The goal is to **learn and explore**:

- How trading platforms structure frontend & backend
- How to manage UI state, routing, and user interactions
- How to build secure backend APIs with authentication & data handling

---

## 🌐 Live Demo

🚀 **Deployed Version:** [https://trade-buddy-six.vercel.app/]  
⚠️ Note: Some features (like Finnhub API integration) may show temporary errors due to **rate-limits** or **API key restrictions** on free tier.

---

## 🚀 Technology Stack

### 🔹 Backend

- **Node.js**, **Express.js**
- **MongoDB (Mongoose)**
- **JWT Authentication** + **Passport.js**
- **bcryptjs**, **dotenv**, **axios**, **cors**
- **nodemon** (for development)

### 🔹 Dashboard

- **React.js**
- **React Router DOM**
- **Chart.js** (stock data visualization)
- **MUI (Material UI)** + **Bootstrap** + **Emotion** (styling)
- **React Icons**

### 🔹 Frontend

- **React.js (with Vite)**
- **React Router DOM**
- **Axios**
- **ESLint**

---

## 📂 Folder Structure

TradeBuddy/
├── backend/ # Node.js + Express + MongoDB backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── server.js
├── dashboard/ # React-based dashboard (charts & visualization)
│ └── src/
├── frontend/ # Main React app (UI & routing)
│ └── src/
└── README.md

---

## ⚙️ Installation

### 🔑 Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- [MongoDB](https://www.mongodb.com/) (local or cloud)
- [Finnhub API Key](https://finnhub.io/) (free tier available)

---

### 🔹 Backend Setup

```bash
# Clone repo
git clone https://github.com/yourusername/TradeBuddy.git
cd TradeBuddy/backend

# Install dependencies
npm install

# Create .env file
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FINNHUB_API_KEY=your_finnhub_api_key
PORT=5000

# (Optional) Seed test data
npm run seed

# Start backend server
nodemon app.js

👉 Backend will run on: http://localhost:8080

🔹 Dashboard Setup
cd ../dashboard
npm install
npm run dev


👉 Dashboard available at: http://localhost:5174

🔹 Frontend Setup
cd ../frontend
npm install
npm run dev


👉 Frontend available at: http://localhost:5173

💻 Usage

Open http://localhost:5173
 → UI access

Backend APIs → http://localhost:8080/api

Features:

Authentication (JWT + Passport) → Planned

Portfolio & Orders Management → Planned

Dashboard charts (with Chart.js) → In Progress

Real-time stock data (Finnhub API) → Under Testing


📊 Features Roadmap

 Hero Section UI

 Basic Routing (React Router)

 Dashboard with Stock Charts

 JWT Authentication (Login/Register)

 Portfolio Management (Orders, Positions)

 REST APIs Integration (Backend ↔ Frontend)

 Real-time Market Data (via Finnhub API)

 🖼️ Demo (Work in Progress)

Screenshots & Live Demo will be added soon.

Example Screenshot:

🛠️ Error Handling & Troubleshooting

Check .env → correct MONGODB_URI, JWT_SECRET, FINNHUB_API_KEY

Run npm run seed if DB is empty

Backend auto-reloads via nodemon

Common issues:

API endpoint mismatch → check frontend Axios requests

Finnhub free tier → max 60 requests/minute (use caching/throttling)

Missing environment variables → check logs

🤝 Contribution & Feedback

Currently under solo development

Suggestions, ideas & contributions are welcome!

Open an issue or create a pull request on GitHub.

📜 License

This project is licensed under the MIT License.
See the LICENSE
 file for details.

👨‍💻 Author

Bablu Kumar

📧 Email: bk596572@gmail.com

🔗 LinkedIn: https://www.linkedin.com/in/bablukup/

🐙 GitHub: https://github.com/bablukup/TradeBuddy

🗓️ Last Updated

August 2025
```

