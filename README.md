# FarmVerse – Precision Agriculture Platform

## Project Overview

FarmVerse is a web-based Precision Agriculture Platform designed to help farmers and agricultural managers manage farms, crops, and agricultural activities digitally. Instead of maintaining records manually, the application stores all farm-related information securely in a centralized database. It simplifies farm management by allowing users to add, update, and view farm and crop details through an easy-to-use interface.

The platform follows a role-based system where different users have different permissions. It is developed using React.js for the frontend, Spring Boot (Java) for the backend, and MySQL as the database.

---

## Team

**Team Name:** Team D

Our team collaborated to develop different modules of the project, including frontend development, backend development, database design, API integration, testing, and documentation. Git and GitHub were used to manage the project and allow multiple team members to work simultaneously without conflicts.

---

# Tech Stack

## Frontend – React.js & Tailwind CSS

The frontend is responsible for everything the user sees and interacts with.

### React.js

React.js is a JavaScript library used to build dynamic and reusable user interfaces. It divides the application into reusable components, making development faster and easier to maintain.

### Tailwind CSS

Tailwind CSS is a utility-first CSS framework used to design responsive and modern user interfaces without writing extensive CSS files.

### Responsibilities of the Frontend

* User Login Page
* Registration Page
* Dashboard
* Farm Management Interface
* Crop Management Interface
* Navigation between pages
* Calling backend APIs
* Displaying data received from the backend

---

## Backend – Spring Boot (Java)

The backend acts as the brain of the application. It receives requests from the frontend, performs validations, processes business logic, interacts with the database, and sends responses back to the frontend.

Spring Boot provides REST APIs for communication between the frontend and backend.

### Responsibilities of the Backend

* User Authentication
* User Registration
* Business Logic
* Farm CRUD Operations
* Crop CRUD Operations
* Data Validation
* Security
* Database Communication

---

## Database – MySQL

MySQL is used to store all application data permanently.

The database stores:

### Users Table

* User ID
* Name
* Email
* Password
* User Role

### Farms Table

* Farm ID
* Farm Name
* Location
* Area
* Owner

### Crops Table

* Crop ID
* Crop Name
* Crop Type
* Season
* Farm ID

---

## Version Control – Git & GitHub

Git is used to track every change made during development, while GitHub hosts the project online for collaboration.

### Benefits

* Team Collaboration
* Code Backup
* Version History
* Branch Management
* Easy Code Sharing

---

# Features

## 1. User Registration

The registration module allows a new user to create an account.

The user provides:

* Full Name
* Email
* Password
* Confirm Password
* User Role

The backend validates the information, encrypts the password, and stores the user details securely in the MySQL database.

---

## 2. User Login

Registered users can log in using their email and password.

During login:

* The frontend sends login credentials to the backend.
* Spring Boot verifies the credentials.
* If authentication is successful, the user is redirected to the appropriate dashboard according to their role.

---

## 3. Dashboard

The dashboard is the main page displayed after login.

It provides quick access to all available modules.

The dashboard displays:

* Welcome Message
* Total Farms
* Total Crops
* Navigation Menu
* Profile Access

---

## 4. Farm Management

This module allows users to manage farm information.

Functions include:

* Add Farm
* View Farms
* Edit Farm Details

Each farm record contains:

* Farm Name
* Location
* Area
* Owner Information

The backend stores this information in the database.

---

## 5. Crop Management

This module manages crop-related information.

Users can:

* Add Crop
* View Crop
* Update Crop Details

Crop information includes:

* Crop Name
* Crop Type
* Season
* Farm Association

---

## 6. Role-Based Access Control

Different users have different permissions within the application.

### Admin

The Admin has complete control over the application.

Admin can:

* View all users
* Manage users
* View all farms
* Edit any farm
* Delete farms
* View all crops
* Edit any crop
* Delete crops

---

### Farm Manager

The Farm Manager manages only their own farms and crops.

Farm Manager can:

* Add Farm
* View Own Farms
* Edit Own Farms
* Add Crop
* View Own Crops
* Edit Own Crops

---

### Guest

Guests have read-only access.

Guest can:

* View Farms
* View Crops

Guests cannot:

* Add Data
* Edit Data
* Delete Data

---

# Milestone 2 Progress

## Frontend UI Development

The frontend interface has been designed using React.js and Tailwind CSS.

Completed screens include:

* Login Page
* Registration Page
* Dashboard
* Farm Management Pages
* Crop Management Pages
* Navigation Components

---

## Backend API Development

REST APIs have been developed using Spring Boot.

Implemented APIs include:

* User Registration API
* User Login API
* Farm CRUD APIs
* Crop CRUD APIs

---

## Documentation Updated

Project documentation has been prepared and updated regularly.

Documents include:

* [Project Plan](Docs/ProjectPlan.md)
* [Frontend Documentation](FRONTEND_DOCUMENTATION.md)
* [Backend Documentation](BACKEND_DOCUMENTATION.md)
* Individual Project Plans — available in the `Docs` folder

---

## GitHub Repository Maintained

GitHub is used to manage the complete project source code.

Activities include:

* Regular Code Commits
* Code Pushes
* Branch Management
* Team Collaboration
* Version Tracking

---

# Project Workflow

```
User
   │
   ▼
React Frontend
(Login, Dashboard, Farm & Crop Pages)
   │
   ▼
REST API Request
   │
   ▼
Spring Boot Backend
(Authentication & Business Logic)
   │
   ▼
MySQL Database
(Store & Retrieve Data)
   │
   ▼
Backend Response
   │
   ▼
Frontend Displays Updated Information
```

---

# Conclusion

FarmVerse is a full-stack web application that digitizes farm and crop management. The React.js frontend provides a responsive user interface, Spring Boot handles the business logic and secure API communication, and MySQL stores all user, farm, and crop information. Git and GitHub enable collaborative development and version control, making the project scalable, maintainable, and suitable for modern precision agriculture applications.
