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