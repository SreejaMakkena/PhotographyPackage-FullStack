# Photography Package Management System

A full-stack web application for managing photography packages, developed using React, Spring Boot, PostgreSQL, and Docker.

## Technologies Used

- **Frontend:** React.js, Vite, Bootstrap, Axios
- **Backend:** Java, Spring Boot, Spring Data JPA, REST APIs
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose
- **CI/CD:** GitHub Actions
- **API Documentation:** Swagger UI
- **Version Control:** Git and GitHub

## Features

- Add new photography packages
- View all available packages
- Update existing package details
- Delete photography packages
- Search and sort packages
- Filter packages by price and album availability
- View photography package statistics on the dashboard
- Form validation and error handling
- Responsive user interface

## Project Structure

```text
PhotographyPackage-FullStack/
├── .github/
│   └── workflows/
│       └── docker-publish.yml
├── backend/
│   └── PhotographyPackageBackend/
│       ├── src/
│       ├── DockerFile
│       └── pom.xml
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/packages/add` | Add a package |
| GET | `/api/packages/all` | View all packages |
| GET | `/api/packages/{id}` | View package by ID |
| PUT | `/api/packages/update/{id}` | Update a package |
| DELETE | `/api/packages/delete/{id}` | Delete a package |
| GET | `/api/packages/search?name=` | Search packages |
| GET | `/api/packages/filter/price` | Filter by price |
| GET | `/api/packages/filter/album` | Filter by album |
| GET | `/api/packages/sort/price` | Sort by price |
| GET | `/api/packages/dashboard` | Dashboard statistics |

## Run Using Docker

### Prerequisites

- Docker Desktop
- Docker Compose

### Clone the Repository

```bash
git clone https://github.com/SreejaMakkena/PhotographyPackage-FullStack.git
cd PhotographyPackage-FullStack
```

### Build and Start Containers

```bash
docker compose up --build -d
```

### Check Container Status

```bash
docker compose ps
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8081/api/packages/all
- **Swagger UI:** http://localhost:8081/swagger-ui/index.html

### Stop Containers

```bash
docker compose down
```

## Docker Hub Images

**Frontend:** https://hub.docker.com/r/sreejamakkena/docker-frontend-2400030533

**Backend:** https://hub.docker.com/r/sreejamakkena/docker-backend-2400030533

## CI/CD Pipeline

GitHub Actions automatically builds and publishes the frontend and backend Docker images to Docker Hub when changes are pushed to the main branch.

Workflow file: `.github/workflows/docker-publish.yml`

## GitHub Repository

https://github.com/SreejaMakkena/PhotographyPackage-FullStack

## Developer

**Sreeja Makkena**  
**Registration Number:** 2400030533  
**University:** KL University  
**Department:** Computer Science and Engineering