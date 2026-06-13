# Module 8: Registration Page Development

## Overview
This module covers the development of the Registration feature in ShopSense AI. The registration is built inside the Login page as a toggle — keeping the experience simple and clean for rural shop owners.

---

## Design Decision
Instead of a separate registration page, we built a **toggle inside the Login page** because:
- Simpler experience for rural users
- Less navigation confusion
- One screen handles both login and registration
- Faster to use on mobile phones

---

## Features Built

- Toggle between Login and Register mode
- Email and password registration
- Firebase createUserWithEmailAndPassword integration
- Auto-login after successful registration
- Error handling for weak passwords and duplicate emails
- Loading state during registration

---

## Registration UI

```
+----------------------------------+
|       ShopSense AI               |
|   Smart Business Assistant       |
|                                  |
|   Create Account                 |
|                                  |
|   Email                          |
|   [_________________________]    |
|                                  |
|   Password                       |
|   [_________________________]    |
|                                  |
|   [       REGISTER        ]      |
|                                  |
|   Already have an account? Login |
+----------------------------------+
```

---

## State Management

```jsx
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [isRegister, setIsRegister] = useState(false)
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
```

Toggle between Login and Register:
```jsx
<button onClick={() => {
  setIsRegister(!isRegister)
  setError('')
}}>
  {isRegister ? 'Login' : 'Register'}
</button>
```

---

## Registration Function

```jsx
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
```

---

## Validation Rules

| Field | Rule |
|-------|------|
| Email | Must be valid email format |
| Password | Minimum 6 characters (Firebase requirement) |
| Both fields | Cannot be empty |

---

## Error Cases Handled

| Scenario | Error Message |
|----------|--------------|
| Empty email or password | "Please fill all fields!" |
| Email already registered | Firebase: email already in use |
| Weak password (less than 6 chars) | Firebase: password too weak |
| Invalid email format | Firebase: invalid email |

---

## Firebase Console — Auth Users

After registration, the user appears in:
Firebase Console → Authentication → Users tab

Fields stored by Firebase:
- User UID (auto-generated)
- Email address
- Creation date
- Last sign-in date

---

## Security Notes

- Passwords are never stored in Firestore — only in Firebase Auth
- Firebase handles all password hashing and security
- onAuthStateChanged keeps user logged in across sessions
- signOut() clears the session completely

---

## Status: Completed
