# FAQ API

## Overview
This project is a **FAQ Management System** built using **Express.js**, **MongoDB**, **Redis**, and **Google Translate API**. It supports **multilingual FAQs** with caching and an admin panel for managing FAQ content.

## Features
- **RESTful API** for FAQ management
- **Multilingual support** using Google Translate API
- **Caching with Redis** for improved performance
- **Admin Panel** for managing FAQs
- **Security Enhancements** with Helmet.js and CORS
- **Dockerized Deployment** with Docker and Docker Compose
- **Unit Testing** using Jest
- **Health Check API** for monitoring

---
## Technologies Used
### Backend:
- **Node.js & Express.js** (Server & API framework)
- **MongoDB** (Database)
- **Redis** (Caching mechanism)
- **Google Translate API** (Translation service)
- **Docker & Docker Compose** (Containerization)
- **CORS** (Security & Cross-Origin Handling)

---
## Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB installed or Atlas account
- Redis installed or Redis Cloud account
- Google Cloud API Key (for Google Translate API)
- Docker (Optional, for containerized deployment)

### Clone the Repository
```sh
git clone https://github.com/your-repo/FAQ_backend.git
cd FAQ_backend
```

### Environment Variables
Create a `.env` file in the root directory and add:
```
PORT=5000
MONGO_URI=<your_mongo_URI>
REDIS_URI=redis://localhost:6379
SUPPORTED_LANGUAGES=hi,bn,fr
```

### Install Dependencies
```sh
npm install
```

### Running the Server
#### Without Docker
```sh
npm start
```

#### With Docker
```sh
docker-compose up --build
```

## API Endpoints
### Base URL
```
http://localhost:5000/api/faqs
```

### Endpoints
| Method | Endpoint            | Description        |
|--------|--------------------|------------------|
| GET    | `/`                 | Fetch all FAQs   |
| POST   | `/`                 | Add a new FAQ    |
| PUT    | `/:faqId`           | Update an FAQ    |
| DELETE | `/:faqId`           | Delete an FAQ    |

### API Usage Examples

#### 1️⃣ Fetch All FAQs
```sh
curl -X GET http://localhost:5000/api/faqs
```
**Response:**
```json
[
  {
    "_id": "12345",
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime.",
    "translations": {
      "hi": { "question": "नोड.जेएस क्या है?", "answer": "नोड.जेएस एक जावास्क्रिप्ट रनटाइम है।" },
      "bn": { "question": "নোড.জেএস কি?", "answer": "নোড.জেএস একটি জাভাস্ক্রিপ্ট রানটাইম।" }
    }
  }
]
```

#### 2️⃣ Fetch FAQs in Different Languages
```sh
curl -X GET http://localhost:5000/api/faqs?lang=hi
```

#### 3️⃣ Add a New FAQ
```sh
curl -X POST http://localhost:5000/api/faqs \
     -H "Content-Type: application/json" \
     -d '{"question": "What is Express.js?", "answer": "Express.js is a web framework for Node.js."}'
```

#### 4️⃣ Update an FAQ
```sh
curl -X PUT http://localhost:5000/api/faqs/12345 \
     -H "Content-Type: application/json" \
     -d '{"question": "Updated Question", "answer": "Updated Answer"}'
```

#### 5️⃣ Delete an FAQ
```sh
curl -X DELETE http://localhost:5000/api/faqs/12345
```

---
## Testing & Code Quality

### Running Tests
Run unit tests with:
```sh
npm test
```
Run Jest with debugging:
```sh
npm test --detectOpenHandles
```

### ESLint Code Quality Check
To check and fix code formatting:
```sh
npm run lint
```

---
## Project Architecture
```
faq-backend/
│── config/                # Configuration files (DB, Redis, etc.)
│── controllers/           # Controllers for handling API logic
│── models/                # Mongoose models
│── routes/                # API routes
│── services/              # Services (Google Translate, caching, etc.)
│── middlewares/           # Middleware (Error handling, validation, etc.)
│── tests/                 # Unit tests
│── .env                   # Environment variables
│── server.js              # Main entry point
│── package.json           # Dependencies
│── README.md              # Documentation
```

---
## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Caching:** Redis
- **Testing:** Jest, Supertest
- **Translation:** Google Translate API

---
## Contributing
Want to contribute?
1. Fork this repo 🍴  
2. Create a feature branch 🌿  
3. Open a Pull Request 🔥  

---
## License
MIT License © 2025 Gyan Prakash  
