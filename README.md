# Restaurant POS System

A complete Restaurant Point of Sale (POS) system built with the MERN stack (MongoDB, Express.js, React, Node.js). This system is designed to streamline restaurant operations, including order management, billing, dynamic dashboard analytics, and online payments.

## Features

- **Dashboard**: Real-time overview of business performance, including recent orders and dynamic sales charts.
- **Menu Management**: Categorized menu display with an intuitive cart system.
- **Order Flow**: End-to-end order processing, from adding items to the cart, applying taxes and discounts, to generating receipts.
- **Billing & Payments**: Integrated online payments (Razorpay) and comprehensive automated receipt generation.
- **Settings**: Dynamic configuration for restaurant profile, tax rates, service charges, discounts, and menu items backed by MongoDB.
- **Responsive UI**: Clean, modern, and fully responsive user interface built with Tailwind CSS.
- **State Management**: Robust frontend state handling using Redux Toolkit and React Query.

## Technology Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit, React Query
- **Routing**: React Router v7
- **Charts**: Chart.js, React-Chartjs-2
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: bcryptjs, cookie-parser
- **Payments**: Razorpay

## Project Structure

- `/pos-frontend` - Contains the React client application.
- `/pos-backend` - Contains the Express server and API endpoints.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd pos-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the `pos-backend` directory and add your configuration (e.g., MongoDB URI, Razorpay keys, JWT secret).
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd pos-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the `pos-frontend` directory if needed for your backend API URL.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Running the Application
Once both servers are running, access the POS system frontend in your browser, typically at `http://localhost:5173`.

## License
ISC
