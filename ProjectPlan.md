- Name: Rishav Choudhary
- Project Name: Precision Agriculture Platform
- Tech Stack: React, Spring Boot, MySQL

1. Problem & Solution

- Problem: Farmers face unpredictable crop yields and waste resources because they lack real-time visibility into soil and field metrics.
- Solution: A centralized full-stack web application allowing users to manage farms, track crop health data, and automate scheduling.

2. Database Schema (MySQL)

- User: `id` (PK), `username`, `password`, `role` (Admin / Farm Manager / Guest), `dob`
- Farm: `id` (PK), `farm_name`, `geo_location`, `owner_id` (FK to User)
- Crop: `id` (PK), `crop_name`, `farm_id` (FK to Farm), `status` (Growing / Harvested)

3. Backend REST APIs (Spring Boot CRUD)

- Farm Management: `POST` (Create Farm), `GET` (Fetch All/Specific), `PUT` (Update Details), `DELETE` (Remove Farm)
- Crop Management:** `POST` (Add Crop to Farm), `GET` (View Farm's Crops), `PUT` (Log Growth Status), `DELETE` (Remove Crop)

4. Frontend Screens (React)

1. Login Page: Restricts dashboard views based on user permissions (`Admin` vs. `Guest`).
2. Farms Dashboard: Grid view showing all registered farms and their locations.
3. Management Modals: Forms to quickly Add User, Add Farm, and Add Crop Data.

5. Implementation Roadmap
Step 1: Database Setup: Sprint 1.Build local MySQL tables and create Java JPA Entity mappings for User, Farm, and Crop.

Step 2: REST Controllers: Sprint 2.Write Spring Boot service classes and test CRUD endpoints (`GET`, `POST`, etc.) via Postman.

Step 3: React UI Assembly: Sprint 3.Build the frontend dashboards and use Axios/Fetch to pull data from our backend APIs.

Step 4: Role Lock & Push: Sprint 4.Add role restrictions, execute end-to-end testing, and open a Pull Request into `mainBackup`.



Name: Roshni Samanta
Project Name: Precision Agriculture Platform
Tech Stack: React, Spring Boot, MySQL
1. Problem & Solution
Problem: Farmers find it difficult to keep track of their farms and crops using paper records. This can lead to mistakes and make it harder to manage farming activities.
Solution: We will create a website where users can easily manage farms, crop details, and other farming information in one place.
2. Data to be Stored
User: Stores user details such as name, login information, date of birth, and role (Admin, Farm Manager, or Guest).
Farm: Stores farm details such as farm name, location, and owner information.
Crop: Stores crop details such as crop name, the farm where it is grown, and its current status (Growing or Harvested).
3. Backend Functions
User Management: Register users, log in, and view user details.
Farm Management: Add a new farm, view farms, update farm details, and remove a farm.
Crop Management: Add a crop, view crop details, update crop status, and remove a crop.
4. Frontend Screens
Login Page: Users enter their username and password to access the system.
Dashboard: Displays all farms and crop information in one place.
Management Forms: Simple forms that allow users to add, update, or delete farms and crop details.
5. Implementation Roadmap

Step 1: Planning and Database (Step 1)
Understand the project requirements and create a database to store user, farm, and crop information.

Step 2: Backend Development (Step 2)
Develop the main functions that handle user, farm, and crop information and make sure they work correctly.

Step 3: Frontend Development (Step 3)
Build the website pages and connect them with the backend so users can interact with the system.

Step 4: Testing and Final Submission (Step 4)
Test all features, fix any problems, ensure everything works properly, and submit the completed project.




**Name:** Sangita Das
**Project Name:** FarmVerse – Precision Agriculture Platform
**Tech Stack:** React, Spring Boot, MySQL

## Problem Statement:

1. Farmers face difficulties in managing multiple farms efficiently.
2. Manual farm management is time-consuming and prone to human errors.
3. Poor monitoring and resource management can reduce crop yield and productivity.
4. Existing manual systems are not scalable and lack real-time monitoring capabilities for modern agricultural operations.

## Problem Solution:

1. Develop a web-based application for efficient farm management.
2. Provide modules for Farm, Crop, and User Management.
3. Provide an interactive dashboard with automated monitoring and reporting features to support better decision-making.
4. Design a scalable system that can support future growth and additional features.

## System Architecture:

The FarmVerse application follows a three-tier architecture:
1. Presentation Layer (Frontend – Web Application)
2. Business Logic Layer (Spring Boot REST APIs)
3. Data Layer (MySQL Database)

## Components:

1. **Frontend:** The frontend of the application will be developed using React and will provide a user-friendly interface for managing farms, crops, and users.
2. **Backend:** Spring Boot REST APIs to handle business logic and communication.
3. **Database:** MySQL to store application data securely.

## Database Schema:

The application will use three main tables:
1. **Users:** id, name, email, password, role (Admin / Farm Manager / Viewer), dateOfBirth
2. **Farms:** id, farmName, location, ownerId (Foreign Key)
3. **Crops:** id, cropName, cropType, farmId (Foreign Key), status (Growing / Harvested)

These tables are connected through relationships to maintain organized and consistent data.

## Backend:

The backend of the application will be developed using Spring Boot and will provide RESTful APIs for managing the system.

### Backend Features:

1. User CRUD APIs
2. Farm CRUD APIs
3. Crop CRUD APIs
4. User Registration & Login
5. JWT-based Authentication & Authorization

## Frontend:

The frontend of the application will be developed as a web application using React and will provide a user-friendly interface for managing farms, crops, and users.

### Frontend Pages:

1. Login Page
2. Register Page
3. Dashboard
4. Users Management Page
5. Farms Management Page
6. Crops Management Page

## Conclusion:

FarmVerse is a scalable Precision Agriculture Management Platform that digitizes farm operations and improves efficiency. It enables users to manage farms, crops, and users through a secure and user-friendly system while supporting future enhancements and scalability.




Name: Sangeetha T
Project Name : FarmVerse – Precision Agriculture Platform
Tech Stack : React,Spring Boot,MySQL

1. Project Statement
Agriculture management becomes difficult when farm and crop information is maintained manually. Managing multiple farms, updating crop records, and tracking farming activities can take a lot of time. A digital platform can simplify these tasks and improve overall farm management.

2. Proposed Solution
The main objective is to develop a web-based application that helps users manage farms, crops, and user information in a simple and organized way. The system provides easy access to farm records and supports better management of agricultural activities.

3. Main Features
•	Secure login for different users.
•	Add, edit, view, and delete farm details.
•	Maintain crop records and update crop status.
•	Store all information in a MySQL database.
•	Easy-to-use dashboard for quick access.

4. Database Design(MySQL)
User - Stores user login details and role like id,username,password,role,dob
Farm - Stores farm information like id,farm_name,geo_location,owner_id
Crop - Stores crop information like id,crop_name,farm_id,status

5. System Modules(Backend/Spring Boot)
User Module are User Login,View Profile,Role-based Access
Farm Module are Add Farm,View Farm,Edit Farm,Delete Farm
Crop Module are Add Crop,View Crop,Update Crop Status,Delete Crop

6. User Interface(Frotened/React)
Login Screen : Users log in using their username and password.
Dashboard : Shows farms, crops, and important information in one place.
Management Pages : Simple forms for managing farms and crop records.

7. Development Process
Phase 1: Create the database and tables.
Phase 2: Develop backend APIs using Spring Boot.
Phase 3: Design the React frontend and connect it with the backend.
Phase 4: Test the application, fix errors, and submit the final project.

8. Expected Result
The application will help users manage farm information easily, reduce manual work, improve record accuracy, and provide a simple platform for daily farm management.

