# Registration Module — ShopSense AI

## Overview
This module covers the complete development of the Registration functionality in ShopSense AI. Registration is built as a toggle inside the Login page for a simple and clean user experience.

---

## File
`src/pages/Login.jsx` (Registration is part of the Login component)

---

## Design Decision
Instead of a separate registration page, a toggle inside the Login page was implemented because:
- Simpler experience for rural shop owners
- Less navigation confusion on mobile devices
- One screen handles both login and registration
- Faster to use on low-end smartphones

---

## Features

- Email and password registration
- Firebase createUserWithEmailAndPassword integration
- Auto-login after successful registration
- Error handling for weak passwords and duplicate emails
- Loading state during registration process
- Toggle between Login and Register mode

---

## Firebase Method Used

| Method | Purpose |
|--------|---------|
| createUserWithEmailAndPassword | Create new user account |

---

## Registration Flow

```
User clicks "Register" link on Login page
      ↓
Form title changes to "Create Account"
Button text changes to "Register"
      ↓
User enters email + password
      ↓
Clicks Register button
      ↓
Firebase creates new account
      ↓
Auto login → Dashboard shown
```

---

## Component Code

```jsx
import { useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const [isRegister, setIsRegister] = useState(false)

async function handleSubmit() {
  if (!email || !password) {
    setError('Please fill all fields!')
    return
  }
  setLoading(true)
  try {
    if (isRegister) {
      await createUserWithEmailAndPassword(auth, email, password)
    } else {
      await signInWithEmailAndPassword(auth, email, password)
    }
    onLogin()
  } catch (err) {
    setError(err.message)
  }
  setLoading(false)
}

// Toggle button
<button onClick={() => {
  setIsRegister(!isRegister)
  setError('')
}}>
  {isRegister ? 'Login' : 'Register'}
</button>
```

---

## Validation Rules

| Field | Rule |
|-------|------|
| Email | Must be valid email format |
| Password | Minimum 6 characters (Firebase requirement) |
| Both fields | Cannot be empty |

---

## Error Handling

| Error Scenario | Message |
|----------------|---------|
| Empty fields | "Please fill all fields!" |
| Email already registered | Firebase: email already in use |
| Weak password | Firebase: password too weak |
| Invalid email format | Firebase: invalid email |

---

## Security

- Passwords are never stored in Firestore — only in Firebase Auth
- Firebase handles all password hashing and encryption
- onAuthStateChanged keeps user logged in across browser sessions
- signOut() clears the session completely
