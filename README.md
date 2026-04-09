# Music App API

## Overview
This project is a RESTful API built with Node.js and Express that allows users to manage music-related data, including songs, users, artists, albums, and playlists. The API also includes JWT authentication to protect certain routes.

The goal of this project was to build and deploy a fully functional backend API that supports CRUD operations and secure access using authentication.

---

## Features
- CRUD operations for:
  - Songs
  - Users
  - Artists
  - Albums
  - Playlists
- JWT authentication for protected routes
- Middleware for request handling and security
- Organized route structure
- JSON-based API responses

---

## Technologies Used
- Node.js
- Express.js
- Sequelize (database ORM)
- JWT (authentication)
- Postman (API testing)

---

## How the Project Works

### 1. Server Setup
The server runs on port 3000. 
### 2. Routes
Each resource (songs, users, artists, albums, playlists) has its own route file. These routes handle CRUD operations such as:
- GET (retrieve data)
- POST (create data)
- PUT (update data)
- DELETE (remove data)

### 3. Authentication (JWT)
Users can log in through the `/login` endpoint. A token is generated using JSON Web Tokens (JWT), which is required to access protected routes.

Example flow:
1. User sends POST request to `/login`
2. Server returns a token
3. User includes token in Authorization header:
   Authorization: Bearer TOKEN
4. Server verifies token before allowing access

### 4. Middleware
A custom middleware (`requireAuth`) is used to:
- Check if a token exists
- Verify the token
- Allow or deny access to protected routes

---

## How to Run the Project Locally

1. Install dependencies:
npm install

2. Start the server:
node server.js

3. Open Postman and test endpoints:
http://localhost:3000

---

## API Endpoints

### Authentication
POST /login  
Body:
{
  "username": "abby"
}

Returns:
- JWT token

---

### Protected Route
GET /protected  
Headers:
Authorization: Bearer and my token

---

### Example Routes
GET /songs  
GET /users  
GET /artists  
GET /albums  
GET /playlists  

---

## Testing
The API was tested using Postman by:
- Sending requests to endpoints
- Verifying responses
- Testing authentication with and without tokens

---

## Deployment

This API is deployed using Render.

Deployed URL:
(Add your Render link here)

---

## Challenges
- Setting up authentication correctly using JWT
- Debugging route issues and middleware placement
- Ensuring all endpoints worked properly in Postman
- Connecting all routes and database models together

---

## Future Improvements
- Add password hashing with bcrypt
- Add user registration
- Improve validation and error handling
- Add more secure authentication practices

---

## Conclusion
This project shows my ability to build, test, and deploy a REST API with authentication. It shows my understanding of backend development, routing, middleware, and API security.