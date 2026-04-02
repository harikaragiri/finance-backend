# Finance Data Processing and Access Control Backend

---

## Objective

This project is developed as part of a Backend Developer Internship assignment. The goal is to demonstrate backend development skills such as API design, data modeling, business logic, authentication, authorization, and role-based access control.

---

## Overview

This backend system represents a finance dashboard where users can manage financial records based on their roles.

The system focuses on secure authentication using JWT, role-based permissions, proper handling of financial data, and providing summary analytics for a dashboard.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Express Validator
- Thunder Client (for API testing)

---

## Project Architecture

The project follows a modular MVC architecture:

- Controllers → Business logic and request handling  
- Models → Database schemas (Mongoose)  
- Routes → API endpoints  
- Middleware → Authentication & Role-Based Access Control  
- Utils → Helper functions (async error handling)

---

## Implementation

This project is implemented using a real-world backend architecture with secure authentication, authorization, and data processing.

---

### Authentication Flow

- Users register with name, email, and password
- Passwords are hashed using bcrypt
- JWT token is generated during login
- Token is required to access protected routes
- Middleware verifies token before granting access

---

### Role-Based Access Control (RBAC)

- Roles are stored in JWT payload
- Middleware checks role before allowing access
- Viewer → read-only access
- Analyst → read + analytics access
- Admin → full access (create, update, delete, manage users)

---

### Financial Record System

- Each record belongs to a specific user (data isolation)
- Users can only access their own records
- Admin can manage all records
- Supports:
  - income / expense tracking
  - category grouping
  - date tracking
  - pagination (10 records per page)
  - filtering (type, category)

---

### Analytics System

Implemented using MongoDB Aggregation Pipeline:

- Total income calculation
- Total expense calculation
- Net balance calculation
- Category-wise summary
- Recent transactions
- Full dashboard aggregation API

---

### API Security

- JWT authentication for all protected routes
- Role-based middleware for authorization
- Input validation using express-validator
- Centralized error handling middleware
- Data isolation per user

---

## Features

### User Management

- User registration
- User login with JWT
- Get current user profile
- Update user role (Admin only)
- Update user status (Admin only)

---

### Financial Records

- Create financial records (Admin only)
- View records (pagination + filtering)
- Update records (Admin only)
- Delete records (Admin only)

---

### Dashboard & Analytics

- Total income
- Total expenses
- Net balance
- Category-wise summary
- Recent transactions
- Full dashboard aggregation

---

## API Endpoints

### Auth APIs

POST /api/users/register  
POST /api/users/login  

---

### User APIs

GET /api/users/me  
PATCH /api/users/:id/role  
PATCH /api/users/:id/status  
PATCH /api/users/me  

---

### Record APIs

GET /api/records  
POST /api/records  
PUT /api/records/:id  
DELETE /api/records/:id  

---

### Analytics APIs

GET /api/records/summary  
GET /api/records/category-summary  
GET /api/records/recent  
GET /api/records/dashboard  

---

## Sample API Responses

### Login Response

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "123",
    "name": "John",
    "email": "john@example.com",
    "role": "admin"
  }
}

```Summary Response
{
  "totalIncome": 20000,
  "totalExpense": 5000,
  "balance": 15000
}
```Category Summary Response
[
  {
    "_id": "salary",
    "total": 20000,
    "count": 4
  }
]
---

### Validation Rules

Amount must be greater than 0
Type must be income or expense
Category is required
Invalid input returns validation errors


###Error Handling

The API uses centralized error handling middleware:

{
  "message": "Error message here"
}
Security Features
JWT Authentication
Role-Based Access Control (RBAC)
Data Isolation (each record belongs to a user)
Input Validation
Protected Routes
Database Design
User Schema
name
email
password (hashed)
role (viewer / analyst / admin)
status (active / inactive)
Record Schema
amount
type
category
date
note
user (reference)
Performance Optimizations
MongoDB indexing on user + date fields
Pagination (10 records per page)
Aggregation pipelines for analytics
Efficient filtering system
Project Structure

src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
server.js

Setup Instructions
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

Assumptions
Each record belongs to one user
Admin has full control over system
JWT required for protected routes
Pagination default is 10 records
Improvements Implemented
Pagination system
Filtering system
MongoDB aggregation
Role-based access control
Centralized error handling
Clean MVC architecture

---
##Conclusion

This project demonstrates a production-level backend system with authentication, authorization, data modeling, and analytics. It follows real-world backend engineering practices with a clean and scalable architecture.

