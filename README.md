# 💰 Finance Data Processing and Access Control Backend

## 🚀 Objective

This project is developed as part of a Backend Developer Internship assignment to demonstrate backend development skills including API design, data modeling, business logic, and role-based access control.

---

## 🧠 Overview

This backend system simulates a **finance dashboard** where users can manage financial records based on their roles.

It ensures:

* Secure authentication
* Role-based permissions
* Efficient financial data handling
* Dashboard analytics using aggregation

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Thunder Client (Testing)

---

## 👥 Roles & Permissions

| Role    | Access                        |
| ------- | ----------------------------- |
| Viewer  | View records only             |
| Analyst | View + analytics              |
| Admin   | Full access (CRUD operations) |

---

## 🔐 Access Control

* Only **Admin** can create/update/delete records
* **Analyst & Admin** can view analytics
* **Viewer** has read-only access

Implemented using:

* JWT Authentication Middleware
* Role-based Middleware

---

## 📦 Features

### ✅ User Management

* Register user
* Login with JWT
* Role assignment
* Active/Inactive status

### ✅ Financial Records

* Create records
* View records
* Update records
* Delete records
* Filter by type, category, date

### ✅ Dashboard APIs

* Total income
* Total expense
* Net balance
* Category-wise summary
* Recent transactions

---

## 📊 API Endpoints

### 🔑 Auth APIs

POST /api/users/register
POST /api/users/login

### 👤 User API

GET /api/users/me

### 📁 Records APIs

GET /api/records
POST /api/records
PUT /api/records/:id
DELETE /api/records/:id

### 📈 Analytics APIs

GET /api/records/summary
GET /api/records/category-summary
GET /api/records/recent

---

## 🧪 Sample API Responses

### 🔐 Login

```json
{
  "token": "JWT_TOKEN_HERE"
}
```

### 📊 Summary

```json
{
  "totalIncome": 20000,
  "totalExpense": 0,
  "balance": 20000
}
```

### 📂 Category Summary

```json
[
  {
    "_id": "salary",
    "total": 20000,
    "count": 4
  }
]
```

---

## ⚠️ Validation Example

If user already exists:

```json
{
  "message": "Email already exists"
}
```

---

## 📸 API Screenshots
## 📸 API Screenshots

### 🔐 Login API
![Login API](./images/login-api.png.jpeg)

### 📊 Summary API
![Summary API](./images/summary-api.png)

### 📂 Category Summary API
![Category Summary API](./images/categorysummary-api.png)

### 📜 Records API
![Records API](./images/records-api.png)

### 🕒 Recent Records API
![Recent Records API](./images/recentrecords-api.png)
---

## ⚙️ Setup Instructions

1. Clone repository
   git clone https://github.com/harikaragiri/finance-backend.git

2. Install dependencies
   npm install

3. Create `.env` file
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret

4. Run server
   npm run dev

---

## 🧾 Assumptions

* Each record belongs to one user
* Only Admin can modify records
* JWT used for authentication
* Pagination limit = 10

---

## ⚡ Enhancements

* Pagination
* Filtering
* MongoDB Aggregation
* Indexed fields for performance
* Clean project structure

---

## 🏗 Project Structure

src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/

---

## 👩‍💻 Author

Harika Ragiri

---

## 🎯 Conclusion

This project demonstrates:

* Backend architecture design
* Role-Based Access Control (RBAC)
* Secure authentication
* Efficient data processing

The focus was on clarity, maintainability, and real-world backend practices.
