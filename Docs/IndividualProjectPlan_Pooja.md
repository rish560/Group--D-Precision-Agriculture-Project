# Individual Project Plan – Pooja

## Project Overview
**Project Name:** Precision Agriculture Platform
**Tech Stack:** React, Spring Boot, MySQL

## Problem Statement
Many farmers still depend on manual records to manage farms, crops, and farming activities. This often leads to inaccurate data, poor monitoring, and difficulty in making timely decisions.

## Proposed Solution
Develop a web-based Precision Agriculture Platform that helps farmers digitally manage farms, crops, and users. The system will provide secure access, real-time information, and an easy-to-use dashboard to improve farm productivity.

## Database Schema (MySQL)

**User**
- id (Primary Key)
- username
- email
- password
- role (Admin / Farm Manager / Viewer)
- phoneNumber

**Farm**
- id (Primary Key)
- farmName
- location
- landArea
- soilType
- ownerId (Foreign Key)

**Crop**
- id (Primary Key)
- cropName
- cropType
- season
- farmId (Foreign Key)
- growthStatus

## Backend REST APIs (Spring Boot)

**User Module**
- User Registration
- User Login
- View User Profile
- Update User Details
- Delete User

**Farm Module**
- Create Farm
- View Farm Details
- Update Farm Information
- Delete Farm

**Crop Module**
- Add Crop
- View Crop Details
- Update Crop Status
- Delete Crop

## Frontend Screens (React)
- Login Page
- Registration Page
- Home Dashboard
- Farm Management Page
- Crop Management Page
- User Management Page
- Profile Page

## Implementation Roadmap
1. **Step 1:** Design the database and create the required tables.
2. **Step 2:** Build the backend APIs and business logic in Spring Boot.
3. **Step 3:** Develop the React frontend and connect it to the backend.
4. **Step 4:** Test the full application and prepare it for submission.

The implementation is split into four practical stages: database design, backend APIs, frontend pages, and final testing/submission.
