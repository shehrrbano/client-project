@echo off
set "PATH=C:\Program Files\Git\cmd;%PATH%"

echo === Initializing Git ===
git init
git config user.email "shehrrbano@namal.edu.pk"
git config user.name "Shehr Bano"

echo === Adding .gitignore and README ===
git add .gitignore README.md
git commit -m "Initial commit: add README and .gitignore"

echo === Adding backend config and models ===
git add server/package.json server/.env server/config/ server/models/ server/middleware/
git commit -m "feat(server): add Express config, Mongoose models, and JWT auth middleware"

echo === Adding backend routes and entry point ===
git add server/routes/ server/server.js server/seed.js
git commit -m "feat(server): add REST API routes, server entry, and database seeder"

echo === Adding frontend setup and theme ===
git add client/package.json client/index.html client/vite.config.js client/src/main.jsx client/src/theme.js client/src/GlobalStyles.js client/src/api/
git commit -m "feat(client): initialize Vite React app with theme and API config"

echo === Adding context providers ===
git add client/src/context/
git commit -m "feat(client): add CartContext and AuthContext providers"

echo === Adding shared components ===
git add client/src/components/
git commit -m "feat(client): add Navbar, Footer, Layout, ProductCard, and utility components"

echo === Adding customer pages ===
git add client/src/pages/Home.jsx client/src/pages/Menu.jsx client/src/pages/ProductDetail.jsx client/src/pages/Cart.jsx client/src/pages/Checkout.jsx client/src/pages/OrderConfirmation.jsx client/src/pages/TrackOrder.jsx
git commit -m "feat(client): add customer pages — Home, Menu, Cart, Checkout, Order Tracking"

echo === Adding admin pages ===
git add client/src/pages/AdminLogin.jsx client/src/pages/AdminDashboard.jsx client/src/pages/AdminProducts.jsx client/src/pages/AdminAddProduct.jsx client/src/pages/AdminOrders.jsx
git commit -m "feat(client): add admin panel — Login, Dashboard, Products CRUD, Orders management"

echo === Adding App router ===
git add client/src/App.jsx
git commit -m "feat(client): configure React Router with all customer and admin routes"

echo === Adding any remaining files ===
git add -A
git commit -m "chore: add remaining project files" --allow-empty

echo === Pushing to GitHub ===
git branch -M main
git remote add origin https://github.com/shehrrbano/client-project.git
git push -u origin main

echo === DONE ===
