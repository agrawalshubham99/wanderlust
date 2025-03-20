
# Wanderlust WebApp

Wanderlust is a Node.js, Express, EJS, and MongoDB-based web application that allows users to explore, create, and manage travel listings.

## Features
- User Authentication with Passport.js
- CRUD operations for travel listings
- User reviews and ratings
- Flash messages for feedback
- Session management with MongoDB

## Tech Stack
- Node.js & Express.js
- EJS & EJS-Mate
- MongoDB & Mongoose
- Passport.js for authentication
- connect-mongo for sessions
- bcrypt for password hashing

## Project Structure
```
wanderlust/
├── models/
├── routes/
├── utils/
├── views/
├── public/
├── .env
├── package.json
└── app.js
```

## Getting Started
1. Clone and install:
```bash
git clone your_repo_url
cd wanderlust
npm install
```
2. Set up `.env` file:
```
MONGO_URL=your_mongodb_url
SESSION_SECRET=mysecretkey
```

3. Run the app:
```bash
node app.js
```

## Usage
- Register or Login
- Create and manage listings
- Leave reviews and ratings

## Routes
- `/listings`
- `/listings/:id`
- `/register`, `/login`, `/logout`

## License
MIT License.
