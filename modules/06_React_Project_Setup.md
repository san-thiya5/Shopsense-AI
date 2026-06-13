# React Project Setup — ShopSense AI

## Overview
This document covers the complete setup of the React frontend development environment for ShopSense AI from scratch on Windows using VS Code.

---

## System Requirements

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | v24.14.0 | JavaScript runtime |
| npm | v11.9.0 | Package manager |
| VS Code | Latest | Code editor |
| Chrome Browser | Latest | Development + Voice API |
| Git | Latest | Version control |

---

## Project Creation

### Step 1: Create Project with Vite
```bash
mkdir shopsense-ai
cd shopsense-ai
npm create vite@latest . -- --template react
npm install
npm run dev
```

App runs at: `http://localhost:5173`

---

### Step 2: Install Tailwind CSS
```bash
npm install tailwindcss @tailwindcss/vite
```

**vite.config.js:**
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**src/index.css:**
```css
@import "tailwindcss";
```

---

### Step 3: Install React Router DOM
```bash
npm install react-router-dom
```

---

### Step 4: Install Firebase
```bash
npm install firebase
```

---

### Step 5: Environment Variables
**.env file:**
```
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Folder Structure

```
shopsense-ai/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Inventory.jsx
│   │   ├── Sales.jsx
│   │   ├── Udhaar.jsx
│   │   ├── Reports.jsx
│   │   └── Login.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── VoiceInput.jsx
│   ├── firebase.js
│   ├── gemini.js
│   ├── App.jsx
│   └── index.css
├── .env
├── vite.config.js
├── package.json
└── README.md
```

---

## Dependencies

| Package | Purpose |
|---------|---------|
| react | UI Framework |
| react-dom | DOM rendering |
| react-router-dom | Page routing |
| firebase | Database and Auth |
| tailwindcss | CSS styling |
| @tailwindcss/vite | Tailwind Vite plugin |
| vite | Build tool |

---

## Firebase Configuration

**src/firebase.js:**
```js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
```

---

## Firebase Setup Steps

1. Created project at console.firebase.google.com
2. Selected Spark Plan (free — no cost)
3. Enabled Firestore Database (Mumbai region — asia-south1)
4. Enabled Email/Password Authentication
5. Registered web app and copied firebaseConfig values to .env
