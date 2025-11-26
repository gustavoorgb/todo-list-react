# Todo List Project (Dockerized)

This is a full-stack **Todo List** application built with **Symfony (backend)** and **Vite + React (frontend)**. The entire application is containerized using **Docker** and includes **JWT authentication** and a **MySQL database**.

---

## 📋 Table of Contents

- [Requirements](#-requirements)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Accessing Containers](#-accessing-containers)
- [Notes on JWT](#-notes-on-jwt)
- [License](#-license)

---

## 🚀 Requirements

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 📂 Project Structure

```
.
├── backend/      # Symfony PHP Backend
├── frontend/     # Vite + React Frontend
└── docker-compose.yml
```

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/todo-list.git
cd todo-list
```

### 2. Configure Environment Files

You'll need to create `.env` files for both the backend and frontend.

**Backend:**
```bash
cp backend/.env.example backend/.env
```

**Frontend:**
```bash
cp .env.example frontend/.env
```

### 3. Generate JWT Keys

For authentication, you need to generate private and public keys for JWT.

```bash
mkdir -p backend/config/jwt
openssl genrsa -out backend/config/jwt/private.pem 4096
chmod 600 backend/config/jwt/private.pem
openssl rsa -pubout -in backend/config/jwt/private.pem -out backend/config/jwt/public.pem
```
**Important:** Make sure you set a passphrase when generating the keys and add it to `backend/.env` as `JWT_PASSPHRASE`.

---

## ⚙️ Environment Variables

After copying the `.env.example` files, you may need to update the variables within the newly created `.env` files.

#### `backend/.env`

```dotenv
# .env file for backend
DATABASE_URL="mysql://user:password@db:3306/todo_list?serverVersion=8.0&charset=utf8mb4"
JWT_PASSPHRASE=your_jwt_passphrase
APP_SECRET=your_app_secret
```

#### `frontend/.env`

```dotenv
# .env file for frontend
VITE_API_BASE_URL=http://localhost:8000
```

---

## ▶️ Running the Project

Start all services using Docker Compose:

```bash
docker-compose up -d --build
```

This will build the images and start the following services:

| Service          | Description         | URL/Port          |
|------------------|---------------------|-------------------|
| `todo-list-backend`  | Symfony + Nginx     | http://localhost:8000 |
| `todo-list-frontend` | Vite + React        | http://localhost:5173 |
| `todo-list-db`       | MySQL 8             | `db:3306` (internal)  |


Once the containers are running, you need to run the database migrations inside the backend container.

```bash
docker-compose exec todo-list-backend php bin/console doctrine:migrations:migrate
```

---

## 🐚 Accessing Containers

You can access the running containers to execute commands.

### Backend (`todo-list-backend`)

```bash
docker-compose exec todo-list-backend bash
```

Inside the container, you can run any Symfony command:
```bash
# Clear cache
php bin/console cache:clear

# View routes
php bin/console debug:router
```

### Frontend (`todo-list-frontend`)

```bash
docker-compose exec todo-list-frontend sh
```

Inside the container, you can run `npm` commands:
```bash
# Install/update dependencies
npm install

# Run dev server (if you want to run it manually inside the container)
npm run dev
```

---

## 🔐 Notes on JWT

- The project uses the `RS256` algorithm for signing JWTs.
- The keys are stored in `backend/config/jwt/`.
- **IMPORTANT**: Keep your private keys and `.env` files out of version control. The `.gitignore` file should already be configured to ignore them.
- Make sure the `JWT_PASSPHRASE` in `backend/.env` matches the passphrase you used to generate the keys.

---

## 📄 License

This project is licensed under the MIT License.
```
