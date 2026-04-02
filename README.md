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
POST /api/users/register
POST /api/users/login


### User Routes
GET /api/users/me
PATCH /api/users/:id/role
PATCH /api/users/:id/status
PATCH /api/users/me


### Record Routes
GET /api/records
POST /api/records
PUT /api/records/:id
DELETE /api/records/:id


### Analytics Routes
GET /api/records/summary
GET /api/records/category-summary
GET /api/records/recent
GET /api/records/dashboard


---

## Sample API Response

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

Summary Response
{
  "totalIncome": 20000,
  "totalExpense": 5000,
  "balance": 15000
}

Validation Rules
Amount must be numeric and greater than 0
Type must be income or expense
Category is required
Invalid input returns validation errors
Security Features
JWT Authentication
Role-Based Access Control
Input Validation
Data Isolation per user
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