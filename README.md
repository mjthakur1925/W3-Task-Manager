Task Manager with User Authentication
Task Manager is a web application built with Node.js and Express that allows users to manage tasks. It includes user authentication using bcrypt for password hashing and sessions for managing user sessions.

Features
User signup and login functionality with secure password hashing.
Session management for keeping users authenticated across requests.
CRUD operations for tasks (Create, Read, Update, Delete).
Responsive design for desktop and mobile devices.
#---------------------------------------------------------------
Technologies Used
Node.js
Express.js
MongoDB (with Mongoose)
bcrypt.js (for password hashing)
express-session (for session management)
HTML5
CSS3 (with Bootstrap for styling)
JavaScript (Frontend and Backend)
---------------------------------------------------------------------------------------------------------
Getting Started
To run this project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/task-manager.git
1.Navigate to the project directory:
cd task-manager

2.Install dependencies:
npm install express express-session bcrypt


3.Set up environment variables:
Create a .env file in the root directory.

4. Add the following environment variables:
makefile
PORT=3000 MONGODB_URI=your_mongodb_connection_string SESSION_SECRET=your_session_secret
5.Start the server:
npm start

6. Open your browser and visit http://localhost:3000 to view the application.

Folder Structure


task-manager/ │ ├── controllers/ # Controller functions for handling routes
├── models/ # Mongoose models for MongoDB 

├── public/ # Static assets (CSS, images, client-side JavaScript) 

├── routes/ # Express route handlers

├── views/ # EJS templates for rendering HTML

├── .env # Environment variables

├── app.js # Express application setup 

└── README.md # Project documentation
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Authentication Flow
Signup:

User provides username, email, and password.
Password is hashed using bcrypt before saving to the database.
Login:

User provides username/email and password.
Password is verified using bcrypt.
Session is created to keep the user logged in.
Session Management:

Express session middleware is used for managing sessions.
Session secret is used for encryption.
Logout:


User can log out to destroy the session.



#DEMO------


https://github.com/mjthakur1925/W3-Task-Manager/assets/114571796/51e4fff7-e410-4862-9653-2cd9eb635f66


https://github.com/mjthakur1925/W3-Task-Manager/assets/114571796/496d2687-77ce-4f26-95f0-ad327a4922f5
///.--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

login page 
![Screenshot (539)](https://github.com/mjthakur1925/W3-Task-Manager/assets/114571796/841ba88d-86d4-4426-abb1-f7d8d89397d9)

//---------------------------------------------------------------------------------------

signup page 

![Screenshot (540)](https://github.com/mjthakur1925/W3-Task-Manager/assets/114571796/a143e881-c18a-44b5-af7a-ab1390670d3e)

//------------------------------------------------------------------------------------------------------------------------------------------------------------------

task manager home page 
![Screenshot (541)](https://github.com/mjthakur1925/W3-Task-Manager/assets/114571796/f94e1749-29fd-487f-ad1e-87865a00253f)

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
Add a new task 


![Screenshot (542)](https://github.com/mjthakur1925/W3-Task-Manager/assets/114571796/2af30343-00a0-4f3c-bd4f-8be1a2b66b5c)

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
edit the task

![Screenshot (543)](https://github.com/mjthakur1925/W3-Task-Manager/assets/114571796/68b0883e-9423-4c96-9d93-007c92d3b70c)

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
delete the task
![Screenshot (544)](https://github.com/mjthakur1925/W3-Task-Manager/assets/114571796/90e4be33-1716-413c-a484-311ca27d0e80)

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

search the task

![Screenshot (545)](https://github.com/mjthakur1925/W3-Task-Manager/assets/114571796/c4169727-ce77-4421-a3d0-8227785f19e2)

