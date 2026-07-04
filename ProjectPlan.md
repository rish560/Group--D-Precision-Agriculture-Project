---
# Precision Agriculture Project Plan

This document collects the team’s individual plans for the Precision Agriculture Platform in one organized, readable format.

---

## 1. Rishav Choudhary

### Project Overview

The goal of this section is to define the core product vision, backend structure, and UI flow for the Precision Agriculture Platform.

- **Project Name:** Precision Agriculture Platform
- **Tech Stack:** React, Spring Boot, MySQL
- **Target Users:** Farmers, farm managers, and administrators

### Problem Statement

- Farmers face unpredictable crop yields and waste resources because they lack real-time visibility into soil and field metrics.

### Proposed Solution

- A centralized full-stack web application that allows users to manage farms, track crop health data, and automate scheduling.

- The system is designed to keep farm data organized, improve monitoring, and give users a simple dashboard for day-to-day farm operations.

### Database Schema (MySQL)

- **User**: `id` (PK), `username`, `password`, `role` (Admin / Farm Manager / Guest), `dob`

- **Farm**: `id` (PK), `farm_name`, `geo_location`, `owner_id` (FK to User)

- **Crop**: `id` (PK), `crop_name`, `farm_id` (FK to Farm), `status` (Growing / Harvested)

### Backend REST APIs (Spring Boot CRUD)

- **Farm Management**: `POST` (Create Farm), `GET` (Fetch All / Specific), `PUT` (Update Details), `DELETE` (Remove Farm)

- **Crop Management**: `POST` (Add Crop to Farm), `GET` (View Farm's Crops), `PUT` (Log Growth Status), `DELETE` (Remove Crop)

### Frontend Screens (React)

- **Login Page** - Restricts dashboard views based on user permissions (`Admin` vs. `Guest`).
- **Farms Dashboard** - Grid view showing all registered farms and their locations.
- **Management Modals** - Forms to quickly add user, add farm, and add crop data.

### System Architecture

```text
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
```


### Implementation Roadmap

1. **Database Setup - Sprint 1**
   Build local MySQL tables and create Java JPA entity mappings for User, Farm, and Crop.
2. **REST Controllers - Sprint 2**
   Write Spring Boot service classes and test CRUD endpoints (`GET`, `POST`, etc.) via Postman.
3. **React UI Assembly - Sprint 3**
   Build the frontend dashboards and use Axios / Fetch to pull data from backend APIs.
4. **Role Lock & Testing - Sprint 4**
   Add role restrictions, execute end-to-end testing, and prepare the final pull request.

---

## 2. Roshni Samanta

### Project Overview

- **Project Name:** Precision Agriculture Platform
- **Tech Stack:** React, Spring Boot, MySQL

### Problem Statement

Farmers find it difficult to keep track of their farms and crops using paper records. This can lead to mistakes and make it harder to manage farming activities.

### Proposed Solution

Create a website where users can easily manage farms, crop details, and other farming information in one place.

### Data to be Stored

- **User:** Stores user details such as name, login information, date of birth, and role (Admin, Farm Manager, or Guest).
- **Farm:** Stores farm details such as farm name, location, and owner information.
- **Crop:** Stores crop details such as crop name, the farm where it is grown, and its current status (Growing or Harvested).

### Backend Functions

- **User Management:** Register users, log in, and view user details.
- **Farm Management:** Add a new farm, view farms, update farm details, and remove a farm.
- **Crop Management:** Add a crop, view crop details, update crop status, and remove a crop.

### Frontend Screens

- **Login Page:** Users enter their username and password to access the system.
- **Dashboard:** Displays all farms and crop information in one place.
- **Management Forms:** Simple forms that allow users to add, update, or delete farms and crop details.

### Implementation Roadmap

1. **Planning and Database**
	Understand the project requirements and create a database to store user, farm, and crop information.
2. **Backend Development**
	Develop the main functions that handle user, farm, and crop information and make sure they work correctly.
3. **Frontend Development**
	Build the website pages and connect them with the backend so users can interact with the system.
4. **Testing and Final Submission**
	Test all features, fix any problems, ensure everything works properly, and submit the completed project.

---

## 3. Sangita Das

### Project Overview

- **Project Name:** FarmVerse – Precision Agriculture Platform
- **Tech Stack:** React, Spring Boot, MySQL

### Problem Statement

1. Farmers face difficulties in managing multiple farms efficiently.
2. Manual farm management is time-consuming and prone to human errors.
3. Poor monitoring and resource management can reduce crop yield and productivity.
4. Existing manual systems are not scalable and lack real-time monitoring capabilities for modern agricultural operations.

### Proposed Solution

1. Develop a web-based application for efficient farm management.
2. Provide modules for Farm, Crop, and User Management.
3. Provide an interactive dashboard with automated monitoring and reporting features to support better decision-making.
4. Design a scalable system that can support future growth and additional features.

### System Architecture

The FarmVerse application follows a three-tier architecture:

1. Presentation Layer (Frontend - Web Application)
2. Business Logic Layer (Spring Boot REST APIs)
3. Data Layer (MySQL Database)

### Components

1. **Frontend:** Developed using React and designed to provide a user-friendly interface for managing farms, crops, and users.
2. **Backend:** Spring Boot REST APIs handle business logic and communication.
3. **Database:** MySQL stores application data securely.

### Database Schema

The application will use three main tables:

1. **Users:** id, name, email, password, role (Admin / Farm Manager / Viewer), dateOfBirth
2. **Farms:** id, farmName, location, ownerId (Foreign Key)
3. **Crops:** id, cropName, cropType, farmId (Foreign Key), status (Growing / Harvested)

These tables are connected through relationships to maintain organized and consistent data.

### Backend

The backend will be developed using Spring Boot and will provide RESTful APIs for managing the system.

#### Backend Features

1. User CRUD APIs
2. Farm CRUD APIs
3. Crop CRUD APIs
4. User Registration & Login
5. JWT-based Authentication & Authorization

### Frontend

The frontend will be developed as a web application using React and will provide a user-friendly interface for managing farms, crops, and users.

#### Frontend Pages

1. Login Page
2. Register Page
3. Dashboard
4. Users Management Page
5. Farms Management Page
6. Crops Management Page

### Conclusion

FarmVerse is a scalable Precision Agriculture Management Platform that digitizes farm operations and improves efficiency. It enables users to manage farms, crops, and users through a secure and user-friendly system while supporting future enhancements and scalability.

---

## 4. Sangeetha T

### Project Overview

- **Project Name:** FarmVerse – Precision Agriculture Platform
- **Tech Stack:** React, Spring Boot, MySQL

### Project Statement

Agriculture management becomes difficult when farm and crop information is maintained manually. Managing multiple farms, updating crop records, and tracking farming activities can take a lot of time. A digital platform can simplify these tasks and improve overall farm management.

### Proposed Solution

The main objective is to develop a web-based application that helps users manage farms, crops, and user information in a simple and organized way. The system provides easy access to farm records and supports better management of agricultural activities.

### Main Features

- Secure login for different users.
- Add, edit, view, and delete farm details.
- Maintain crop records and update crop status.
- Store all information in a MySQL database.
- Easy-to-use dashboard for quick access.

### Database Design (MySQL)

- **User** - Stores user login details and role fields such as `id`, `username`, `password`, `role`, and `dob`.
- **Farm** - Stores farm information like id, farm_name, geo_location, owner_id
- **Crop** - Stores crop information like id, crop_name, farm_id, status

### System Modules (Backend / Spring Boot)

- **User Module** - User login, view profile, role-based access.
- **Farm Module** - Add farm, view farm, edit farm, delete farm.
- **Crop Module** - Add crop, view crop, update crop status, delete crop.

### User Interface (Frontend / React)

- **Login Screen:** Users log in using their username and password.
- **Dashboard:** Shows farms, crops, and important information in one place.
- **Management Pages:** Simple forms for managing farms and crop records.

### Development Process

1. **Phase 1:** Create the database and tables.
2. **Phase 2:** Develop backend APIs using Spring Boot.
3. **Phase 3:** Design the React frontend and connect it with the backend.
4. **Phase 4:** Test the application, fix errors, and submit the final project.

### Expected Result

The application will help users manage farm information easily, reduce manual work, improve record accuracy, and provide a simple platform for daily farm management.

---

## 5. Pooja Sri S

### Project Overview

- **Project Name:** Precision Agriculture Platform
- **Tech Stack:** React, Spring Boot, MySQL

### Problem Statement

Many farmers still depend on manual records to manage farms, crops, and farming activities. This often leads to inaccurate data, poor monitoring, and difficulty in making timely decisions.

### Proposed Solution

Develop a web-based Precision Agriculture Platform that helps farmers digitally manage farms, crops, and users. The system will provide secure access, real-time information, and an easy-to-use dashboard to improve farm productivity.

### Database Schema (MySQL)

#### User

- `id` (Primary Key)
- `username`
- `email`
- `password`
- `role` (Admin / Farm Manager / Viewer)
- `phoneNumber`

#### Farm

- `id` (Primary Key)
- `farmName`
- `location`
- `landArea`
- `soilType`
- `ownerId` (Foreign Key)

#### Crop

- `id` (Primary Key)
- `cropName`
- `cropType`
- `season`
- `farmId` (Foreign Key)
- `growthStatus`

### Backend REST APIs (Spring Boot)

#### User Module

- User Registration
- User Login
- View User Profile
- Update User Details
- Delete User

#### Farm Module

- Create Farm
- View Farm Details
- Update Farm Information
- Delete Farm

#### Crop Module

- Add Crop
- View Crop Details
- Update Crop Status
- Delete Crop

### Frontend Screens (React)

- Login Page
- Registration Page
- Home Dashboard
- Farm Management Page
- Crop Management Page
- User Management Page
- Profile Page

### Implementation Roadmap

1. **Step 1:** Design the database and create the required tables.
2. **Step 2:** Build the backend APIs and business logic in Spring Boot.
3. **Step 3:** Develop the React frontend and connect it to the backend.
4. **Step 4:** Test the full application and prepare it for submission.

The implementation is split into four practical stages: database design, backend APIs, frontend pages, and final testing/submission.
