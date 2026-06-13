# UI Screens — ShopSense AI

## Overview
This document describes all the actual UI screens built and implemented in ShopSense AI. Each screen is fully functional and connected to Firebase Firestore.

---

## Screen 1: Login Page

### Description
The first screen users see when opening the app. Allows shop owners to sign in or create a new account.

### Components
| Component | Description |
|-----------|-------------|
| Logo & Title | ShopSense AI branding at the top center |
| Email Input | Text field for entering email address |
| Password Input | Password field with hidden characters |
| Login Button | Primary sky blue action button |
| Register Toggle | Link to switch between login and register |
| Error Alert | Red box showing error messages |

### Design
- Background: Dark navy (slate-900)
- Card: Dark slate (slate-800) with border
- Button: Sky blue (sky-500)

---

## Screen 2: Dashboard

### Description
Main home screen showing shop summary with real-time data from Firebase.

### Components
| Component | Description |
|-----------|-------------|
| Welcome Header | Greeting message for the owner |
| Revenue Card | Total sales in sky blue |
| Udhaar Card | Total unpaid credit in orange |
| Low Stock Card | Count of low stock items in red |
| Quick Action Buttons | Add Stock, Log Sale, Add Udhaar, View Report |
| Recent Sales Table | Last 5 sales with product, quantity, total, date |

---

## Screen 3: Inventory Page

### Description
Manage all product stock — add new products and view current stock levels.

### Components
| Component | Description |
|-----------|-------------|
| Voice Input Box | Click to speak in Tamil or Hindi |
| Add Product Form | Name, Quantity, Unit dropdown, Price fields |
| Add Product Button | Sky blue submit button |
| Stock List Table | All products with status badges |
| In Stock Badge | Green badge for sufficient stock |
| Low Stock Badge | Red badge for items with quantity 5 or less |
| Delete Button | Remove product from inventory |

---

## Screen 4: Sales Page

### Description
Record every sale made and track total daily revenue.

### Components
| Component | Description |
|-----------|-------------|
| Revenue Card | Total revenue in emerald green |
| Record Sale Form | Product, Quantity, Unit, Price fields |
| Record Sale Button | Green submit button |
| Sales List Table | All sales with total and date |
| Delete Button | Remove a sale entry |

---

## Screen 5: Udhaar Page

### Description
Track credit given to customers and manage payments.

### Components
| Component | Description |
|-----------|-------------|
| Unpaid Total Card | Total unpaid amount in orange |
| Add Udhaar Form | Customer name, Item, Amount fields |
| Add Udhaar Button | Orange submit button |
| Udhaar List Table | All credit entries with status |
| Mark Paid Button | Changes status from Unpaid to Paid |
| Paid Badge | Green badge for paid entries |
| Unpaid Badge | Red badge for unpaid entries |
| Delete Button | Remove an udhaar entry |

---

## Screen 6: Reports Page

### Description
Visual insights and AI-powered analysis of shop performance.

### Components
| Component | Description |
|-----------|-------------|
| Revenue Summary Card | Total revenue from all sales |
| Udhaar Summary Card | Total unpaid credit amount |
| Low Stock Summary Card | Count of low stock items |
| Sales Breakdown | Progress bar chart per product |
| Low Stock Alert | Red alert box listing low stock items |
| AI Insight Box | Gemini AI generated business advice |

---

## Tools Used
- React.js with useState and useEffect
- Firebase Firestore for real-time data
- Tailwind CSS for styling
- Firebase Authentication for login/logout
