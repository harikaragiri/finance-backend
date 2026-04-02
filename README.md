# Finance Data Processing and Access Control Backend

## Objective

This project is developed as part of a Backend Developer Internship assignment. The goal is to demonstrate backend development skills such as API design, data modeling, business logic, authentication, authorization, and role-based access control.

---

## Overview

This backend system is a finance management API where users can track income and expenses based on roles.

It focuses on:
- Secure authentication using JWT
- Role-based access control (RBAC)
- Financial record management
- Analytics and dashboard APIs

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Express Validator

---

## Project Architecture

The project follows MVC architecture:

- Controllers → Business logic
- Models → Database schema
- Routes → API endpoints
- Middleware → Authentication & Authorization
- Utils → Helper functions

---

## Features

### User Features
- Register user
- Login user
- Get profile (/me)
- Update profile

### Admin Features
- Manage users
- Update user roles
- Update user status
- Full access to records

### Financial Records
- Create income/expense records
- Update records
- Delete records
- View records with pagination
- Filter by type/category

### Analytics
- Total income
- Total expense
- Net balance
- Category-wise summary
- Recent transactions
- Dashboard API

---

## Authentication Flow

- User registers with details
- Password is hashed using bcrypt
- JWT token generated on login
- Token required for all protected routes
- Middleware verifies token

---

## Role-Based Access Control (RBAC)

- **Viewer** → Read-only access
- **Analyst** → Read + analytics access
- **Admin** → Full access (CRUD + user management)

---

## API Endpoints

### Auth Routes
- POST /api/users/register
- POST /api/users/login


### User Routes
- GET /api/users/me
- PATCH /api/users/:id/role
-PATCH /api/users/:id/status
- PATCH /api/users/me


### Record Routes
- GET /api/records
- POST /api/records
- PUT /api/records/:id
- DELETE /api/records/:id


### Analytics Routes
- GET /api/records/summary
- GET /api/records/category-summary
- GET /api/records/recent
- GET /api/records/dashboard


---

## Sample API Response

### Login Response
- JSON
{
  "totalIncome": 20000,
  "totalExpense": 5000,
  "balance": 15000
}

- Summary Response
{
  "totalIncome": 20000,
  "totalExpense": 5000,
  "balance": 15000
}

### Validation Rules
- Amount must be numeric and greater than 0
- Type must be income or expense
- Category is required
- Invalid input returns validation errors

### Security Features

1. JWT Authentication
2. Role-Based Access Control
3. Input Validation
4. Data Isolation per user
5. Protected Routes


---


## Database Design
**User Schema**
- name
- email
- password (hashed)
- role (viewer / analyst / admin)
- status (active / inactive)
**Record Schema**
- amount
- type
- category
- date
- note
- user (reference)


---


### Project Structure
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
server.js

**Setup Instructions**
1. Clone Repository
git clone https://github.com/your-username/finance-backend.git
2. Install Dependencies
npm install
3. Create .env file
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
4. Run Server
npm start

---

### Performance Optimizations
1. MongoDB indexing (user + date)
2. Pagination (10 records per page)
3. Aggregation pipelines for analytics
4. Efficient filtering system

---

### Assumptions
- Each record belongs to one user
- Admin has full access
- JWT required for all protected routes
- Default pagination is 10

---

### Conclusion

This project demonstrates a production-level backend system with authentication, authorization, data modeling, and analytics. It follows clean MVC architecture and real-world backend practices