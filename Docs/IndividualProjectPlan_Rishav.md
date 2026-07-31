# Individual Project Plan – Rishav Choudhary

## Project Overview
The goal of this section is to define the core product vision, backend structure, and UI flow for the Precision Agriculture Platform.

**Project Name:** Precision Agriculture Platform
**Tech Stack:** React, Spring Boot, MySQL
**Target Users:** Farmers, farm managers, and administrators

## Problem Statement
Farmers face unpredictable crop yields and waste resources because they lack real-time visibility into soil and field metrics.

## Proposed Solution
A centralized full-stack web application that allows users to manage farms, track crop health data, and automate scheduling.

The system is designed to keep farm data organized, improve monitoring, and give users a simple dashboard for day-to-day farm operations.

## Database Schema (MySQL)

- **User:** id (PK), username, password, role (Admin / Farm Manager / Guest), dob
- **Farm:** id (PK), farm_name, geo_location, owner_id (FK to User)
- **Crop:** id (PK), crop_name, farm_id (FK to Farm), status (Growing / Harvested)

## Backend REST APIs (Spring Boot CRUD)

**Farm Management:**
- POST (Create Farm)
- GET (Fetch All / Specific)
- PUT (Update Details)
- DELETE (Remove Farm)

**Crop Management:**
- POST (Add Crop to Farm)
- GET (View Farm's Crops)
- PUT (Log Growth Status)
- DELETE (Remove Crop)

## Frontend Screens (React)
- **Login Page** – Restricts dashboard views based on user permissions (Admin vs. Guest).
- **Farms Dashboard** – Grid view showing all registered farms and their locations.
- **Management Modals** – Forms to quickly add user, add farm, and add crop data.

## System Architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                 FRONTEND (Top Layer)                    │
│      React.js / HTML5 / CSS3 (User Dashboards)          │
└────────────────────────────┬────────────────────────────┘
                             │ (REST API / JSON Data)
                             ▼
┌─────────────────────────────────────────────────────────┐
│                BACKEND (Middle Layer)                   │
│       Spring Boot MVC / Spring Data JPA (Java)          │
└────────────────────────────┬────────────────────────────┘
                             │ (JDBC Connections)
                             ▼
┌─────────────────────────────────────────────────────────┐
│               DATABASE (Storage Layer)                  │
│               MySQL Relational Database                 │
└─────────────────────────────────────────────────────────┘
\`\`\`

## Implementation Roadmap
1. **Database Setup – Sprint 1:** Build local MySQL tables and create Java JPA entity mappings for User, Farm, and Crop.
2. **REST Controllers – Sprint 2:** Write Spring Boot service classes and test CRUD endpoints (GET, POST, etc.) via Postman.
3. **React UI Assembly – Sprint 3:** Build the frontend dashboards and use Axios / Fetch to pull data from backend APIs.
4. **Role Lock & Testing – Sprint 4:** Add role restrictions, execute end-to-end testing, and prepare the final pull request.
