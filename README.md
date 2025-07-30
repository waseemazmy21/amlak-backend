# Amlak Real Estate - Backend API

![Project Status](https://img.shields.io/badge/status-active%20development-yellow) 
![Node Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)

Backend service for Amlak Real Estate platform. This repository contains the API services, database models, and business logic for property management operations.


## Features

### ✅ Implemented
- User authentication passport & JWT
- Role-based access control (Admin/User)
- Error handling middleware

### 🚧 In Progress
- Advanced search filters
- Property CRUD operations
- Image upload service
- Favorite properties system
- Email notifications
- Payment integration

### ⏳ Planned
- Analytics dashboard
- Social media integrations
- SMS notifications
- Map-based property search

## Technologies Used
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: Passport & JWT
- **Validation**: Joi
- **Deployment**: Docker setup in progress

## Getting Started

### Prerequisites
- Node.js >= 22.x
- npm >= 10.x

### Installation
```bash
# Clone repository
git clone https://github.com/waseemazmy21/amlak-backend.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Configuration
Update your .env file with:
```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Running the Server
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

### API Documentation
Interactive documentation available at http://localhost:8000/api-docs when server is running (Swagger implementation in progress).

Current endpoints:
- POST /api/auth/login - User authentication
- POST /api/auth/register - User registration
- POST /api/auth/logout - User logout

### Project Structure
```bash
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # API endpoints
│   ├── middlewares/    # Custom middlewares
│   ├── utils/          # Helper functions
│   └── app.ts          # Main application entry
├── .env.example        # Environment template
├── package.json
```
