# ShopSense AI

**AI-Powered Business Assistant for Rural Small Shop Owners in India**

---

## Project Title

**ShopSense AI** — A free, multilingual, voice-first AI business management web application for rural kirana shop owners in India.

---

## Problem Statement

Over 60 million small kirana shops in rural India still manage their entire business using pen and paper. These shop owners face the following challenges every day:

- Stock details are written in notebooks with no digital backup
- Udhaar (credit given to customers) is tracked manually in diaries and losses often go unnoticed
- No visibility into daily profits, losses, or best-selling products
- Existing solutions like Tally and Vyapar are complex, expensive, and available only in English
- Most rural shop owners are not comfortable with English-based apps
- No automated reminders for customers who owe money

These problems lead to financial losses, poor inventory decisions, and missed revenue for millions of small business owners across India.

---

## Project Objectives

1. Digitize inventory management for rural shops with zero learning curve and no technical knowledge required
2. Enable voice input in Tamil and Hindi so any shop owner can use the app just by speaking naturally
3. Track udhaar (credit) digitally and send automated WhatsApp reminders to customers who owe money
4. Generate AI-powered weekly business insights on best-selling products, low stock alerts, and profit trends
5. Build a completely free, mobile-friendly web app that works on any Android smartphone with Chrome browser
6. Support multiple languages — Tamil, Hindi, and English — to make the app accessible to all

---

## Module List

| Module | Description |
|--------|-------------|
| Dashboard | Overview of total revenue, unpaid udhaar, low stock count, and recent sales activity |
| Inventory Manager | Add, view, update, and delete products with stock quantity, unit, and price |
| Sales Log | Record every sale made, auto-calculate totals, and track daily revenue |
| Udhaar Manager | Track credit given to customers, mark payments as paid, monitor unpaid balances |
| Reports | Visual sales breakdown, low stock alerts, and AI-generated business insights |
| Voice Input | Speak in Tamil or Hindi — Web Speech API captures and Gemini AI parses the command |
| Gemini AI Integration | Understands voice commands and extracts structured data like product, quantity, and action |
| Firebase Integration | Real-time database for persistent storage of inventory, sales, and udhaar data |

---

## Table List

| Collection | Fields | Description |
|------------|--------|-------------|
| inventory | name, quantity, unit, price | Stores all product stock details |
| sales | product, quantity, unit, price, total, date, time | Records every sale transaction |
| udhaar | customer, item, amount, date, status | Tracks credit entries per customer |

---

## Expected Outcome

1. A fully functional web application accessible on any smartphone with Chrome browser
2. Real-time inventory tracking — shop owners can add, update, and monitor stock levels instantly
3. Automated sales logging — every sale is recorded and total revenue is calculated automatically
4. Digital udhaar management — customers who owe money are tracked clearly with paid and unpaid status
5. Voice-enabled shop management — owners can speak in Tamil or Hindi to add stock or log sales hands-free
6. AI-powered weekly insights — the app highlights best-selling products, low stock items, and pending udhaar
7. Free and accessible — zero cost, no complex setup, works on low-end Android phones
8. Reduced financial losses by digitizing udhaar and providing clear profit visibility
9. Empowered rural entrepreneurs — giving 60 million small shop owners access to the same tools that large businesses use

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Tailwind CSS, Vite |
| Database | Firebase Firestore |
| AI / NLP | Google Gemini API |
| Voice Input | Web Speech API |
| Routing | React Router DOM |
| Deployment | Vercel |

---
