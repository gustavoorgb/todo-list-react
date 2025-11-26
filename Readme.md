# Todo List Project (Dockerized)

This is a full-stack **Todo List** application using **Symfony (backend)** and **Vite + React (frontend)**, fully containerized with **Docker**.  
It includes **JWT authentication** and a **MySQL database**.

---

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Generating JWT Keys](#generating-jwt-keys)
- [Running the Project](#running-the-project)
- [Accessing Containers](#accessing-containers)
- [Notes on JWT](#notes-on-jwt)
- [License](#license)

---

## Requirements

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Getting Started

### 1. Clone the repository

```bash
    git clone https://github.com/your-username/todo-list.git
    cd todo-list
2. Copy example environment files

# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env

3. Edit environment variables if necessary
Backend (backend/.env):

dotenv
DATABASE_URL="mysql://user:password@db:3306/todo_list?serverVersion=8.0&charset=utf8mb4"
JWT_PASSPHRASE=your_jwt_passphrase
APP_SECRET=your_app_secret

Frontend (frontend/.env):

dotenv
VITE_API_BASE_URL=http://localhost:8000
Generating JWT Keys
If keys are not present, generate them:

mkdir -p backend/config/jwt
openssl genrsa -out backend/config/jwt/private.pem 4096
chmod 600 backend/config/jwt/private.pem
openssl rsa -pubout -in backend/config/jwt/private.pem -out backend/config/jwt/public.pem
Notes:

The project uses RS256 algorithm

Keep keys and .env files out of version control

Placeholders are provided in .env.example

Running the Project
Start all services using Docker Compose:

bash
docker-compose up -d --build
This will start:

Service	Description	URL/Port
backend	Symfony + PHP + Nginx	http://localhost:8000
frontend	Vite + React	http://localhost:5173
db	MySQL 8	db:3306

Accessing Containers
Backend container:

docker-compose exec todo-list-backend bash
Running Symfony commands (inside backend container):

# Run migrations
php bin/console doctrine:migrations:migrate

# Clear cache
php bin/console cache:clear

# Other Symfony commands
php bin/console <command>
Frontend container:

docker-compose exec todo-list-frontend sh
Running frontend locally (inside frontend container):

npm install
npm run dev
Notes on JWT
Uses RS256 algorithm

Keys are stored in backend/config/jwt/

Keep keys and .env files out of version control

Make sure the JWT_PASSPHRASE in .env matches the keys
```
