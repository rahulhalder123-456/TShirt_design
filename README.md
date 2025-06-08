# 👕 TShirt Design Web App

A modern full-stack web application for customizing 3D T-shirts using AI image prompts, built with **React**, **Three.js**, **Tailwind CSS**, and **Node.js/Express**.

---

## 🌟 Features

- 🌀 Real-time 3D rendering of T-shirts
- 🎨 Customize colors, logos, and textures
- 📤 Upload your own images
- 🤖 AI-powered image generation from text prompts
- 🔁 Persistent design state across sessions

---

## 🧠 Tech Stack

### Frontend
- React
- Vite
- Three.js (via React Three Fiber)
- Tailwind CSS
- Framer Motion (animations)
- Valtio (global state management)

### Backend
- Node.js
- Express
- OpenAI API (for image generation)
- Middleware for CORS, JSON parsing, and file handling

---

## 🔧 Getting Started

### 📦 Prerequisites

- Node.js (v16+)
- npm or yarn

---

### 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/TShirt_design.git
cd TShirt_design

# Install frontend dependencies
npm install

# Start the frontend
npm run dev


# In a separate terminal:

# Navigate to the server folder
cd server

# Install backend dependencies
npm install

# Start the backend server
node index.js 
    or 
npm start
