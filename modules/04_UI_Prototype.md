# UI Prototype — ShopSense AI

## Overview
This document describes the complete user flow and screen-to-screen navigation prototype of ShopSense AI.

---

## User Flow Diagram

```
App Opens
    ↓
Check Firebase Auth
    ↓
+------------------+        +------------------+
| User Not Logged  |        | User Already     |
| In               |        | Logged In        |
+------------------+        +------------------+
    ↓                               ↓
Login Page                     Dashboard
    ↓
Enter Email + Password
    ↓
+------------------+        +------------------+
| Login Success    |        | Login Failed     |
+------------------+        +------------------+
    ↓                               ↓
Dashboard                    Show Error Message
                                    ↓
                              Try Again
```

---

## Navigation Flow

```
Dashboard
    ├── Click "Add Stock"     → Inventory Page
    ├── Click "Log Sale"      → Sales Page
    ├── Click "Add Udhaar"    → Udhaar Page
    ├── Click "View Report"   → Reports Page
    └── Click "Logout"        → Login Page

Navbar (available on all pages)
    ├── Dashboard Link        → Dashboard Page
    ├── Inventory Link        → Inventory Page
    ├── Sales Link            → Sales Page
    ├── Udhaar Link           → Udhaar Page
    ├── Reports Link          → Reports Page
    └── Logout Button         → Login Page
```

---

## Screen Interactions

### Login Page Interactions
| Action | Result |
|--------|--------|
| Enter email + password → Click Login | Validates credentials via Firebase |
| Wrong credentials | Red error message appears |
| Correct credentials | Redirects to Dashboard |
| Click Register link | Form switches to Register mode |
| Fill form → Click Register | Creates new account → goes to Dashboard |

---

### Dashboard Interactions
| Action | Result |
|--------|--------|
| Page loads | Fetches real-time data from Firebase |
| Click Add Stock | Navigates to Inventory page |
| Click Log Sale | Navigates to Sales page |
| Click Add Udhaar | Navigates to Udhaar page |
| Click View Report | Navigates to Reports page |

---

### Inventory Page Interactions
| Action | Result |
|--------|--------|
| Click Start Speaking | Microphone opens — voice captured |
| Speak in Tamil/Hindi | Text appears in You said box |
| Fill form → Click Add Product | Product saved to Firebase |
| Product quantity <= 5 | Red Low Stock badge appears |
| Click Delete | Product removed from Firebase |

---

### Sales Page Interactions
| Action | Result |
|--------|--------|
| Fill form → Click Record Sale | Sale saved to Firebase |
| Sale recorded | Total revenue card updates |
| Click Delete | Sale removed from Firebase |

---

### Udhaar Page Interactions
| Action | Result |
|--------|--------|
| Fill form → Click Add Udhaar | Entry saved to Firebase with Unpaid status |
| Click Mark Paid | Status changes to Paid in Firebase |
| Mark Paid clicked | Unpaid total card reduces |
| Click Delete | Entry removed from Firebase |

---

### Reports Page Interactions
| Action | Result |
|--------|--------|
| Page loads | Fetches all data from Firebase |
| Sales data exists | Progress bars show per product |
| Low stock items exist | Red alert section appears |
| AI insight box | Shows best seller and suggestions |

---

## Tools Used
- React Router DOM for screen navigation
- Firebase Firestore for data persistence
- Firebase Authentication for login state
- Web Speech API for voice interaction
- Gemini AI for intelligent insights
