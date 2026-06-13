# Module 7: Login Page Development

## Overview
This module covers the complete development of the Login page for ShopSense AI using React.js and Firebase Authentication.

---

## Features Built

- Email and password login
- New user registration (toggle between Login and Register)
- Firebase Authentication integration
- Error message display
- Loading state during authentication
- Auto-redirect to Dashboard after login
- Persistent login using Firebase onAuthStateChanged

---

## File Created
`src/pages/Login.jsx`

---

## Component Structure

```
Login Component
├── State Variables
│   ├── email
│   ├── password
│   ├── isRegister (toggle login/register)
│   ├── loading
│   └── error
├── handleSubmit function
│   ├── Validates empty fields
│   ├── Calls Firebase signIn or createUser
│   └── Calls onLogin() on success
└── JSX UI
    ├── Logo & Title
    ├── Error Alert Box
    ├── Email Input
    ├── Password Input
    ├── Submit Button
    └── Toggle Link
```

---

## Firebase Auth Methods Used

| Method | Purpose |
|--------|---------|
| signInWithEmailAndPassword | Login existing user |
| createUserWithEmailAndPassword | Register new user |
| onAuthStateChanged | Check if user is already logged in |
| signOut | Logout from app |

---

## Login Flow

```
User opens app
      ↓
onAuthStateChanged checks Firebase
      ↓
No user → show Login page
User exists → show Dashboard directly
      ↓
User enters email + password
      ↓
Click Login button
      ↓
Firebase verifies credentials
      ↓
Success → onLogin() called → Dashboard shown
Failure → error message shown in red box
```

---

## Registration Flow

```
User clicks "Register" link
      ↓
Form switches to Register mode
      ↓
User enters email + password
      ↓
Click Register button
      ↓
Firebase creates new account
      ↓
Auto login → Dashboard shown
```

---

## Error Handling

| Error | Message Shown |
|-------|--------------|
| Empty fields | "Please fill all fields!" |
| Wrong password | Firebase error message |
| Email not found | Firebase error message |
| Weak password | "Password must be 6+ characters" |

---

## Design Details

- Full screen dark background (slate-900)
- Centered white card (max-w-md)
- Sky blue login button
- Red error alert box
- Muted toggle link at bottom

---

## Status: Completed
