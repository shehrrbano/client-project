# Hosting Guide for Ember Grill

This guide explains how to deploy your MERN stack application for free using **Vercel** (Frontend), **Render** (Backend), and **MongoDB Atlas** (Database).

## 1. Cloud Database (MongoDB Atlas)
Since the local "in-memory" database data is lost when the server sleeps, you **must** use a cloud database for the hosted app.

1.  **Sign Up/Login**: [MongoDB Atlas](https://www.mongodb.com/atlas).
2.  **Create Cluster**: Create a **FREE (M0)** cluster.
3.  **Create User**: Go to "Database Access" -> Add New Database User (e.g., `admin` / `password123`).
4.  **Network Access**: Go to "Network Access" -> Add IP Address -> **Allow Access from Anywhere (0.0.0.0/0)**.
5.  **Get Connection String**:
    *   Click "Connect" -> "Drivers" -> Copy the string.
    *   It looks like: `mongodb+srv://admin:<password>@cluster0.Sx9.mongodb.net/?retryWrites=true&w=majority`

---

## 2. Deploy Backend (Render)

1.  **Sign Up**: [Render.com](https://render.com) (Login with GitHub).
2.  **New Web Service**: Click **New +** -> **Web Service**.
3.  **Connect Repo**: Select your `client-project` repo.
4.  **Configure**:
    *   **Root Directory**: `server` (Important!)
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
    *   **Instance Type**: Free
5.  **Environment Variables**:
    *   Scroll down to "Environment Variables" and add:
        *   `MONGO_URI`: (Paste your MongoDB Atlas string from Step 1)
        *   `JWT_SECRET`: (Enter a secure secret key, e.g., `my_super_secret_key`)
        *   `NODE_ENV`: `production`
6.  **Deploy**: Click "Create Web Service".
7.  **Copy URL**: Once live, copy your backend URL (e.g., `https://ember-grill-api.onrender.com`).

---

## 3. Deploy Frontend (Netlify) - Easiest Method

### Option A: Drag & Drop (Manual)
1.  **Build the App**: Run this command on your computer:
    ```bash
    cd client
    npm run build
    ```
    This creates a `dist` folder in `client/dist`.
2.  **Go to Netlify**: [Netlify Drop](https://app.netlify.com/drop).
3.  **Upload**: Drag and drop the `client/dist` folder into the upload area.
4.  **Environment Variables**:
    *   Go to "Site settings" -> "Environment variables".
    *   Add `VITE_API_URL` = your Render Backend URL (e.g., `https://ember-grill-api.onrender.com/api`).

### Option B: Connect GitHub (Automatic)
1.  **Login**: [Netlify](https://app.netlify.com).
2.  **New Site**: "Add new site" -> "Import an existing project" -> "GitHub".
3.  **Select Repo**: Choose `client-project`.
4.  **Settings**:
    *   **Base directory**: `client`
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
5.  **Environment Variables**:
    *   Add `VITE_API_URL` = your Render Backend URL + `/api`.

---

## 4. Final Verification
1.  Open your Netlify URL.
2.  Try adding an item to the cart.
3.  Go to `/admin/login` and try to log in (ensure you ran the seed script or manually created an admin in your Atlas DB).

> **Note**: The free Render backend spins down after inactivity. It might take 50 seconds to respond to the first request.
