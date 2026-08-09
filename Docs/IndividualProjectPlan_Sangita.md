# Individual Project Plan – Sangita Das

## Project Overview
**Project Name:** FarmVerse – Precision Agriculture Platform
**Tech Stack:** React, Spring Boot, MySQL

## Problem Statement
- Farmers face difficulties in managing multiple farms efficiently.
- Manual farm management is time-consuming and prone to human errors.
- Poor monitoring and resource management can reduce crop yield and productivity.
- Existing manual systems are not scalable and lack real-time monitoring capabilities for modern agricultural operations.

## Proposed Solution
- Develop a web-based application for efficient farm management.
- Provide modules for Farm, Crop, and User Management.
- Provide an interactive dashboard with automated monitoring and reporting features to support better decision-making.
- Design a scalable system that can support future growth and additional features.

## System Architecture
The FarmVerse application follows a three-tier architecture:
1. **Presentation Layer** (Frontend - Web Application)
2. **Business Logic Layer** (Spring Boot REST APIs)
3. **Data Layer** (MySQL Database)

### Components
- **Frontend:** Developed using React and designed to provide a user-friendly interface for managing farms, crops, and users.
- **Backend:** Spring Boot REST APIs handle business logic and communication.
- **Database:** MySQL stores application data securely.

## Database Schema
The application will use three main tables:

- **Users:** id, name, email, password, role (Admin / Farm Manager / Viewer), dateOfBirth
- **Farms:** id, farmName, location, ownerId (Foreign Key)
- **Crops:** id, cropName, cropType, farmId (Foreign Key), status (Growing / Harvested)

These tables are connected through relationships to maintain organized and consistent data.

## Backend
The backend will be developed using Spring Boot and will provide RESTful APIs for managing the system.

**Backend Features**
- User CRUD APIs
- Farm CRUD APIs
- Crop CRUD APIs
- User Registration & Login
- JWT-based Authentication & Authorization

## Frontend
The frontend will be developed as a web application using React and will provide a user-friendly interface for managing farms, crops, and users.

**Frontend Pages**
- Login Page
- Register Page
- Dashboard
- Users Management Page
- Farms Management Page
- Crops Management Page

## Conclusion
FarmVerse is a scalable Precision Agriculture Management Platform that digitizes farm operations and improves efficiency. It enables users to manage farms, crops, and users through a secure and user-friendly system while supporting future enhancements and scalability.
