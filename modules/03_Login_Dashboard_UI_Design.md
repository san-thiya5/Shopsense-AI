# Module 3: Login & Dashboard UI Design

## Overview
This module covers the design and development of the Login page and Dashboard screen — the two most important screens users interact with first.

---

## Login Page

### Purpose
- Allow registered shop owners to securely sign in
- Allow new users to create an account
- Redirect to Dashboard after successful login

### UI Components
| Component | Description |
|-----------|-------------|
| Logo & Title | ShopSense AI branding at the top |
| Email Input | Text field for email address |
| Password Input | Password field with hidden characters |
| Login Button | Primary action button (sky blue) |
| Register Toggle | Switch between Login and Register mode |
| Error Message | Red alert box for wrong credentials |

### Design Details
- Background: Dark navy (slate-900)
- Card: Dark card (slate-800) with border
- Button: Sky blue (sky-500) with hover effect
- Font: Bold white for headings, muted for labels

### Firebase Auth Flow
```
User enters email + password
        ↓
Firebase signInWithEmailAndPassword()
        ↓
Success → redirect to Dashboard
Failure → show error message
```

---

## Dashboard Screen

### Purpose
- Give shop owner a quick overview of their business
- Show key stats at a glance
- Provide quick navigation to all features

### UI Components
| Component | Description |
|-----------|-------------|
| Welcome Header | "Welcome back!" greeting |
| Revenue Card | Total sales revenue (sky blue) |
| Udhaar Card | Total unpaid credit (orange) |
| Low Stock Card | Count of low stock items (red) |
| Quick Action Buttons | Add Stock, Log Sale, Add Udhaar, View Report |
| Recent Sales Table | Last 5 sales from Firebase |

### Data Flow
```
Dashboard loads
        ↓
Fetches from Firebase:
- sales collection → total revenue
- udhaar collection → unpaid total
- inventory collection → low stock count
        ↓
Displays real-time data on screen
```

### Design Details
- Layout: Responsive grid (3 columns on desktop, 1 on mobile)
- Cards: Dark background with colored borders
- Buttons: Color coded (blue, green, orange, purple)
- Table: Alternating row colors for readability

---

## Tools Used
- React.js with useState and useEffect hooks
- Firebase Authentication (Email/Password)
- Firebase Firestore for data fetching
- Tailwind CSS for styling
- React Router DOM for navigation

---

## Status: Completed
