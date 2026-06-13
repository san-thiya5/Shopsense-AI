# Module 6: Frontend Environment Setup

## Overview
This module documents the complete setup of the frontend development environment for ShopSense AI from scratch.

---

## System Requirements

| Tool | Version Used | Purpose |
|------|-------------|---------|
| Node.js | v24.14.0 | JavaScript runtime |
| npm | v11.9.0 | Package manager |
| VS Code | Latest | Code editor |
| Chrome Browser | Latest | Development + Voice API testing |
| Git | Latest | Version control |

---

## Step-by-Step Setup

### Step 1: Create Project with Vite
```bash
mkdir shopsense-ai
cd shopsense-ai
npm create vite@latest . -- --template react
npm install
npm run dev
```

### Step 2: Install Tailwind CSS
```bash
npm install tailwindcss @tailwindcss/vite
```

Updated vite.config.js:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Added to index.css:
```css
@import "tailwindcss";
```

### Step 3: Install React Router DOM
```bash
npm install react-router-dom
```

### Step 4: Install Firebase
```bash
npm install firebase
```

### Step 5: Create Environment Variables
Created .env file:
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

## Folder Structure Created

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

## Dependencies Installed

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.0.0 | UI Framework |
| react-dom | ^18.0.0 | DOM rendering |
| react-router-dom | ^6.0.0 | Page routing |
| firebase | ^10.0.0 | Database & Auth |
| tailwindcss | ^4.0.0 | CSS styling |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite plugin |
| vite | ^5.0.0 | Build tool |

---

## Firebase Setup

1. Created project at console.firebase.google.com
2. Selected Spark Plan (free)
3. Enabled Firestore Database (Mumbai region — asia-south1)
4. Enabled Email/Password Authentication
5. Registered web app and copied firebaseConfig

---

## Development Server

```bash
npm run dev
# Runs at http://localhost:5173
```

---

## Status: Completed
