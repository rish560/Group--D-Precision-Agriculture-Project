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
