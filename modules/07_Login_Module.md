# Login Module — ShopSense AI

## Overview
This module covers the complete development of the Login functionality in ShopSense AI using React.js and Firebase Authentication.

---

## File
`src/pages/Login.jsx`

---

## Features

- Email and password based login
- Firebase Authentication integration
- Error message display for wrong credentials
- Loading state during authentication
- Auto-redirect to Dashboard after successful login
- Persistent login using Firebase onAuthStateChanged
- Toggle between Login and Register mode

---

## Firebase Methods Used

| Method | Purpose |
|--------|---------|
| signInWithEmailAndPassword | Login existing user |
| onAuthStateChanged | Check if user is already logged in |
| signOut | Logout from the app |

---

## Login Flow

```
User opens app
      ↓
onAuthStateChanged checks Firebase session
      ↓
No active session → Show Login page
Active session exists → Show Dashboard directly
      ↓
User enters email + password
      ↓
Clicks Login button
      ↓
Firebase verifies credentials
      ↓
Success → Dashboard shown
Failure → Error message displayed
```

---

## Component Code

```jsx
import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!email || !password) {
      setError('Please fill all fields!')
      return
    }
    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      onLogin()
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    // Login UI JSX
  )
}

export default Login
```

---

## Error Handling

| Error Scenario | Message Shown |
|----------------|--------------|
| Empty fields | "Please fill all fields!" |
| Wrong password | Firebase error message |
| Email not found | Firebase error message |
| Network error | Firebase error message |

---

## Design Details

- Full screen dark background (slate-900)
- Centered white card (max-width 28rem)
- Sky blue login button with hover effect
- Red error alert box
- Loading state: button shows "Please wait..."
