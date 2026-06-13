# Module 2: UI Wireframe Design

## Overview
This module contains the blueprint layout of all 5 pages in ShopSense AI before actual coding began. Wireframes define the structure, components, and layout of each page.

---

## Page 1: Dashboard

```
+--------------------------------------------------+
|  NAVBAR: ShopSense AI  | Links | [Logout]        |
+--------------------------------------------------+
|  Welcome back!                                   |
|  Here is your shop summary                       |
|                                                  |
|  +----------+  +----------+  +----------+        |
|  | Revenue  |  | Udhaar   |  | Low Stock|        |
|  | Rs.XXXX  |  | Rs.XXXX  |  |  X Items |        |
|  +----------+  +----------+  +----------+        |
|                                                  |
|  Quick Actions:                                  |
|  [Add Stock] [Log Sale] [Add Udhaar] [Reports]   |
|                                                  |
|  Recent Sales Table                              |
|  | Product | Qty | Total | Date |                |
+--------------------------------------------------+
```

---

## Page 2: Inventory

```
+--------------------------------------------------+
|  NAVBAR                                          |
+--------------------------------------------------+
|  Inventory                                       |
|  Add and track your stock here                   |
|                                                  |
|  [ Voice Input Box — Click to Speak ]            |
|  You said: ___________                           |
|                                                  |
|  Add New Product                                 |
|  [Name] [Quantity] [Unit Dropdown] [Price]       |
|  [+ Add Product Button]                          |
|                                                  |
|  Stock List Table                                |
|  | Product | Qty | Price | Total | Status | Del |
|  | Sugar   | 10  | 45    | 450   | InStock| X  |
+--------------------------------------------------+
```

---

## Page 3: Sales

```
+--------------------------------------------------+
|  NAVBAR                                          |
+--------------------------------------------------+
|  Sales Log                                       |
|                                                  |
|  +----------------------------------+            |
|  | Total Revenue Today: Rs.XXXX    |            |
|  | X sales recorded                |            |
|  +----------------------------------+            |
|                                                  |
|  Record a Sale                                   |
|  [Product Name] [Quantity] [Unit] [Price]        |
|  [+ Record Sale Button]                          |
|                                                  |
|  Sales List Table                                |
|  | Product | Qty | Price | Total | Date | Del  |
+--------------------------------------------------+
```

---

## Page 4: Udhaar

```
+--------------------------------------------------+
|  NAVBAR                                          |
+--------------------------------------------------+
|  Udhaar Manager                                  |
|                                                  |
|  +----------------------------------+            |
|  | Total Unpaid Udhaar: Rs.XXXX    |            |
|  | X people owe you money           |            |
|  +----------------------------------+            |
|                                                  |
|  Add Udhaar Entry                                |
|  [Customer Name] [Item Taken] [Amount]           |
|  [+ Add Udhaar Button]                           |
|                                                  |
|  Udhaar List Table                               |
|  | Customer | Item | Amount | Date | Status | Actions |
+--------------------------------------------------+
```

---

## Page 5: Reports

```
+--------------------------------------------------+
|  NAVBAR                                          |
+--------------------------------------------------+
|  Reports                                         |
|  Your shop insights based on real data           |
|                                                  |
|  +----------+  +----------+  +----------+        |
|  | Revenue  |  | Udhaar   |  | Low Stock|        |
|  +----------+  +----------+  +----------+        |
|                                                  |
|  Sales Breakdown                                 |
|  Sugar    ████████████ Rs.450                    |
|  Rice     ███████████████ Rs.800                 |
|                                                  |
|  Low Stock Alert Box (if any)                    |
|                                                  |
|  AI Insight Box                                  |
|  "Your best seller is Rice. Consider..."         |
+--------------------------------------------------+
```

---

## Tools Used
- React.js for component-based UI
- Tailwind CSS for styling
- Figma-style ASCII wireframes for planning

---

## Status: Completed
