# Ember Grill — Food Ordering Website

A full-stack MERN (MongoDB, Express, React, Node.js) food ordering web application for a fast food and grilled food restaurant based in England. Features a modern dark-themed UI with golden yellow accents, fully responsive design, and a complete admin management panel.

---

## Developer

**Shehr Bano**  
Namal University

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Admin Panel Access](#admin-panel-access)
- [API Endpoints](#api-endpoints)
- [Color Palette](#color-palette)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

### Customer Side
- **Home Page** — Hero banner, featured menu items, feature highlights, and CTA sections
- **Menu Page** — Browse all products with category filtering (Burgers, Grilled, Wraps, Sides, Drinks, Desserts) and real-time search
- **Product Detail** — Full product view with description, price, preparation time, and quantity selector
- **Shopping Cart** — Add/remove items, adjust quantities, persistent cart via localStorage
- **Checkout** — Delivery or pickup selection, customer details form, payment method choice (cash/card)
- **Order Confirmation** — Animated success page with order summary and order number
- **Order Tracking** — Track any order by order number with a visual status timeline

### Admin Panel
- **Admin Login** — Secure JWT-based authentication
- **Dashboard** — Overview stats (total orders, revenue, active orders, product count)
- **Product Management** — Full CRUD (Create, Read, Update, Delete) for all menu items
- **Order Management** — View all orders with status filtering, update order status via dropdown (Pending → Confirmed → Preparing → Ready → Out for Delivery → Delivered)

### Design & UX
- **Fully Responsive** — Optimized for mobile (480px), tablet (768px), and desktop (1024px+)
- **Dark Theme** — Modern dark grey background with golden yellow accents
- **Micro-animations** — Hover effects, slide-in cards, animated success icons
- **Toast Notifications** — Real-time feedback for cart actions and form submissions
- **Glassmorphism Navbar** — Frosted glass effect with backdrop blur
- **Google Fonts** — Outfit font family for a clean, modern typography

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Vite, styled-components, React Router v6, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **UI Libraries** | react-icons, react-hot-toast |
| **Styling** | styled-components (CSS-in-JS, zero CSS files) |
| **Images** | Unsplash API |

---

## Project Structure

```
ember-grill/
├── server/                      # Backend API
│   ├── config/
│   │   └── db.js                # MongoDB connection helper
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── Product.js           # Product schema (name, price, category, image, etc.)
│   │   ├── Order.js             # Order schema (customer, items, status, timestamps)
│   │   └── User.js              # User schema (admin auth with bcrypt)
│   ├── routes/
│   │   ├── products.js          # Product CRUD endpoints
│   │   ├── orders.js            # Order endpoints + admin stats
│   │   └── auth.js              # Login, register, verify token
│   ├── server.js                # Express app entry point
│   ├── seed.js                  # Database seeder (20 items + admin user)
│   ├── .env                     # Environment variables
│   └── package.json
│
├── client/                      # Frontend React App
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js         # Axios instance with JWT interceptor
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Responsive nav with cart badge
│   │   │   ├── Footer.jsx       # Site footer with links and contact
│   │   │   ├── Layout.jsx       # Page layout wrapper
│   │   │   ├── ProductCard.jsx  # Product card with hover effects
│   │   │   ├── CategoryFilter.jsx # Category pill buttons
│   │   │   ├── Loader.jsx       # Animated loading spinner
│   │   │   └── ProtectedRoute.jsx # Auth guard for admin routes
│   │   ├── context/
│   │   │   ├── CartContext.jsx   # Cart state with localStorage
│   │   │   └── AuthContext.jsx   # Admin auth state with JWT
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page with hero and featured items
│   │   │   ├── Menu.jsx         # Full menu with search and filters
│   │   │   ├── ProductDetail.jsx # Single product view
│   │   │   ├── Cart.jsx         # Shopping cart page
│   │   │   ├── Checkout.jsx     # Order form and payment
│   │   │   ├── OrderConfirmation.jsx # Order success page
│   │   │   ├── TrackOrder.jsx   # Order tracking with timeline
│   │   │   ├── AdminLogin.jsx   # Admin authentication page
│   │   │   ├── AdminDashboard.jsx # Admin stats overview
│   │   │   ├── AdminProducts.jsx  # Product management table
│   │   │   ├── AdminAddProduct.jsx # Add/Edit product form
│   │   │   └── AdminOrders.jsx  # Order management with status updates
│   │   ├── theme.js             # Design tokens (colors, fonts, spacing)
│   │   ├── GlobalStyles.js      # Global CSS reset and base styles
│   │   ├── App.jsx              # Router and provider setup
│   │   └── main.jsx             # React entry point
│   ├── index.html               # HTML template with meta tags
│   └── package.json
│
└── README.md
```

---

## Prerequisites

Before running the project, make sure you have:

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **MongoDB** — Optional! The app includes an in-memory database for instant setup without installation. For data persistence, use:
  - Local MongoDB installation — [Download](https://www.mongodb.com/try/download/community)
  - Free MongoDB Atlas cloud cluster — [Sign Up](https://www.mongodb.com/atlas)
- **Git** — [Download](https://git-scm.com/)

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shehrrbano/client-project.git
cd client-project
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Edit `server/.env` with your settings:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ember-grill
JWT_SECRET=ember_grill_super_secret_key_2024
UNSPLASH_ACCESS_KEY=9YxoOWVGyrOqNicS4ZcVJZtCvFLn8PWqcSGncZ6hB14
```

> **Note:** If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string:
> ```
> MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ember-grill
> ```

### 4. Seed the Database

```bash
cd server
npm run seed
```

This creates:
- **20 menu items** across 6 categories (Burgers, Grilled, Wraps, Sides, Drinks, Desserts)
- **1 admin user** (see [Admin Panel Access](#-admin-panel-access))

### 5. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## Running the Application

Open **two separate terminals**:

### Terminal 1 — Backend Server
```bash
cd server
npm start
```
The API server will start on **http://localhost:5000**

### Terminal 2 — Frontend Dev Server
```bash
cd client
npm run dev
```
The React app will launch on **http://localhost:5173**

---

## Admin Panel Access

Navigate to **http://localhost:5173/admin/login**

| Credential | Value |
|-----------|-------|
| **Email** | `admin@embergrill.co.uk` |
| **Password** | `admin123` |

### Admin Features:
- **Dashboard** — View total orders, revenue, active orders, and product count
- **Products** — Add new products, edit existing ones, toggle availability, delete items
- **Orders** — View all customer orders, filter by status, update order progress

---

## API Endpoints

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/products` | List all products (filter: `?category=`, `?featured=`) | No |
| `GET` | `/api/products/:id` | Get single product | No |
| `POST` | `/api/products` | Create product | Admin |
| `PUT` | `/api/products/:id` | Update product | Admin |
| `DELETE` | `/api/products/:id` | Delete product | Admin |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/orders` | Place new order | No |
| `GET` | `/api/orders` | List all orders | Admin |
| `GET` | `/api/orders/stats` | Dashboard statistics | Admin |
| `GET` | `/api/orders/:id` | Get order (by ID or order number) | No |
| `PUT` | `/api/orders/:id` | Update order status | Admin |

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/login` | Admin login → JWT token | No |
| `POST` | `/api/auth/register` | Register admin user | No |
| `GET` | `/api/auth/me` | Verify current token | Admin |

---

## Color Palette

| Token | Hex | Preview | Usage |
|-------|-----|---------|-------|
| Background | `#1E1E1E` | 🟤 | Page background |
| Surface | `#2B2B2B` | ⬛ | Cards, panels |
| Accent | `#D4A843` | 🟡 | Buttons, links, highlights |
| Text Primary | `#F0F0F0` | ⬜ | Headings, body text |
| Text Secondary | `#A0A0A0` | 🔘 | Labels, muted content |
| Success | `#4CAF50` | 🟢 | Success states |
| Error | `#E74C3C` | 🔴 | Error states |

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | ≤ 480px | Single column, hamburger menu |
| Tablet | ≤ 768px | Adaptive grid, collapsible sidebar |
| Desktop | ≤ 1024px | Full multi-column layout |
| Wide | ≤ 1280px | Max-width container |

---

## License

This project is developed as part of academic coursework at **Namal University**.

---

**Developed by Shehr Bano — Namal University**
