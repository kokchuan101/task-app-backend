# Task App Backend
checkbox.ai take home assignment

## Prerequisite
- Node.js
- Docker
- Docker Compose v2

## Setup

There are 2 mode to run this project.

#### 1. Docker mode

```bash
# Ensure you are in root directory

# Setup .env
bash development.sh docker

# Spin up backend and mongo container
docker compose up -d
```

#### 2. Normal mode

```bash
# Ensure you are in root directory

# Setup .env
bash development.sh normal

# Install npm packages
npm install

# Start backend locally
npm run start:dev
```

## Seeding

Similar, there are 2 mode to seed. Ensure that the mode correspond to setup.

#### 1. Docker mode

```bash
# Enter container (alpine image doesn't have bash preinstalled)
docker exec -it task-app-backend /bin/sh

# Run seeder
npm run seed
```

#### 2. Normal mode

```bash
# Run seeder
npm run seed
```

## Testing

Similar, there are 2 mode to seed. Ensure that the mode correspond to setup.

#### 1. Docker mode

```bash
# Enter container (alpine image doesn't have bash preinstalled)
docker exec -it task-app-backend /bin/sh

# Run test
npm run test
```

#### 2. Normal mode

```bash
# Run test
npm run test
```

## Documentation

- [Swagger API](http://localhost:3000/api/)
- [Postman Collection](https://www.getpostman.com/collections/2402637c4cc965e0e3d0)
