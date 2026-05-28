# MyStore — Next.js E-Commerce App

A full stack e-commerce application built with Next.js and Tailwind CSS.

## Features
- Browse products
- View product details
- Add to cart
- Update cart quantities
- Place orders

## Tech Stack
- Next.js 15 (App Router)
- Tailwind CSS
- localStorage for cart and orders
- API Routes for backend

## Getting Started

1. Clone the repository
   git clone <your-repo-link>

2. Install dependencies
   npm install

3. Run the development server
   npm run dev

4. Open http://localhost:3000

## API Routes
- GET  /api/products        → get all products
- GET  /api/products/:id    → get one product
- POST /api/products        → create product
- PUT  /api/products/:id    → update product
- DELETE /api/products/:id  → delete product
- POST /api/orders          → place an order

## AI Usage
- Used Claude AI for guidance on Next.js concepts and debugging
- All code understood and written manually
- Issues solved manually: folder structure fixes, Next.js 15 params await fix