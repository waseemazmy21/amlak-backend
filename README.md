# Amlak Backend API - Real Estate Platform

![Node.js](https://img.shields.io/badge/Node.js-18.x%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)
![JWT](https://img.shields.io/badge/JWT-Auth-yellow)
![Passport.js](https://img.shields.io/badge/Passport.js-Auth-blueviolet)
![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-blue)
[![Deployed on Render](https://img.shields.io/badge/Render-Deployed-5f45bb)](https://medsync-backend-production.up.railway.app/api)

## API Documentation

Explore our interactive API documentation:
- [Interactive API Documentation](https://medsync-backend-production.up.railway.app/api)

## Overview

Amlak Backend is a secure, scalable RESTful API built with Node.js and Express, designed to power modern real estate platforms. This backend provides all the necessary endpoints and business logic for property listings, user management, and media handling, with a strong focus on security and performance.

## Features

- Secure JWT authentication with Passport.js and HttpOnly cookies
- Complete CRUD operations for property listings
- Image upload and management with Cloudinary integration
- Advanced filtering and search capabilities
- Pagination and sorting for optimal performance
- Input validation and error handling middleware
- Comprehensive API documentation with Swagger/OpenAPI
- Role-based access control (Admin/User)
- Email notifications system
- Payment integration ready

## Tech Stack

- **Runtime**: Node.js 18+ with Express.js
- **Language**: TypeScript 
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js, JWT, bcrypt
- **File Storage**: Cloudinary SDK
- **Validation**: Express validators & Joi
- **Documentation**: Swagger UI
- **Testing**: Jest & Supertest

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- MongoDB 6.0 or higher
- Cloudinary account (for image storage)

### Installation

```bash
# Clone the repository
git clone https://github.com/waseemazmy21/amlak-backend.git

# Navigate to project directory
cd amlak-backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Environment Variables

Update the `.env` file with your configuration:

```env
# Server
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Running the Application

```bash
# Development mode with hot-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

## Project Structure

```
src/
├── config/           # Configuration files
│   ├── db.ts        # Database connection
│   ├── passport.ts  # Passport strategies
│   └── cloudinary.ts # Cloudinary configuration
├── controllers/     # Route controllers
├── middlewares/     # Custom middlewares
│   ├── auth.middleware.ts  # Authentication middleware
│   └── error.middleware.ts # Error handling
├── models/          # Database models
│   ├── user.model.ts
│   └── property.model.ts
├── routes/          # API routes
│   ├── auth.routes.ts
│   └── property.routes.ts
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Helper functions
├── app.ts           # Express application
└── server.ts        # Server entry point
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property (protected)
- `PUT /api/properties/:id` - Update property (protected)
- `DELETE /api/properties/:id` - Delete property (protected)
- `POST /api/properties/:id/images` - Upload property images (protected)

