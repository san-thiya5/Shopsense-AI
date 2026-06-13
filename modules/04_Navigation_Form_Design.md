# Module 4: Navigation & Form Design

## Overview
This module covers the Navbar component and all form designs across the ShopSense AI application.

---

## Navigation Bar (Navbar)

### Purpose
- Provide consistent navigation across all pages
- Allow shop owner to switch between modules easily
- Include a logout button for security

### Components
| Component | Description |
|-----------|-------------|
| Logo | ShopSense AI branding on the left |
| Nav Links | Dashboard, Inventory, Sales, Udhaar, Reports |
| Logout Button | Red button to sign out of the app |

### Code Structure
```jsx
<nav>
  <h1>ShopSense AI</h1>
  <div>
    <Link to="/">Dashboard</Link>
    <Link to="/inventory">Inventory</Link>
    <Link to="/sales">Sales</Link>
    <Link to="/udhaar">Udhaar</Link>
    <Link to="/reports">Reports</Link>
    <button onClick={onLogout}>Logout</button>
  </div>
</nav>
```

### Design Details
- Background: Dark slate (slate-800)
- Links: White text with sky blue hover effect
- Logout: Red button (red-500)
- Routing: React Router DOM Links

---

## Form Designs

### Form 1: Add Product (Inventory Page)
| Field | Type | Validation |
|-------|------|------------|
| Product Name | Text Input | Required |
| Quantity | Number Input | Required, positive number |
| Unit | Dropdown Select | kg, litre, piece, packet, box |
| Price per unit | Number Input | Required, positive number |
| Add Product Button | Submit Button | Triggers Firebase addDoc |

---

### Form 2: Record Sale (Sales Page)
| Field | Type | Validation |
|-------|------|------------|
| Product Name | Text Input | Required |
| Quantity Sold | Number Input | Required |
| Unit | Dropdown Select | kg, litre, piece, packet, box |
| Price per unit | Number Input | Required |
| Record Sale Button | Submit Button | Triggers Firebase addDoc |

Auto-calculation: Total = Quantity x Price

---

### Form 3: Add Udhaar (Udhaar Page)
| Field | Type | Validation |
|-------|------|------------|
| Customer Name | Text Input | Required |
| Item Taken | Text Input | Required |
| Amount | Number Input | Required |
| Add Udhaar Button | Submit Button | Triggers Firebase addDoc |

Default status: Unpaid on creation

---

### Form 4: Login Form (Login Page)
| Field | Type | Validation |
|-------|------|------------|
| Email | Email Input | Required, valid email format |
| Password | Password Input | Required, minimum 6 characters |
| Login/Register Button | Submit Button | Firebase Auth |

---

## Common Form Design Principles
- All inputs: Dark background (slate-700), white text
- Focus state: Sky blue ring (focus:ring-2 focus:ring-sky-400)
- Buttons: Colored, bold, with hover and disabled states
- Loading state: Button text changes to "Saving..." during Firebase calls
- Error handling: Alert popup for empty fields

---

## Tools Used
- React.js useState for form state management
- React Router DOM for navigation links
- Firebase Firestore addDoc for form submissions
- Tailwind CSS for styling

---

## Status: Completed
