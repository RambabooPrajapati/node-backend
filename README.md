<!-- 1. for frontend:
  docker build -t imagename .
  docker run --name=frontend --network=networkname -d -p   5173:5173 frontend_image
  docker logs containername
2. for database:
docker run --network=networkname --name mongodb -d -p 27017:27017 -v ~/otp/data:/data/db mongo:latest

for backend:
docker build -t imagename .
 docker run --name=backend --network=networkname -d -p 5000:5000   -e MONGO_URL="mongodb+srv://chat_app_admin:password@cluster0.bs2brdq.mongodb.net/mern_fullstack_project?retryWrites=true&w=majority&appName=Cluster0" -e JWT_SECRET_KEY="DJSDJFLSJFSFJLSdseeee4435gdg"  backend_image

for createing network:
docker network create networkname -->

<!-- For development phase:
mern-app/
│
├── client/                 # Vite + React app
│   ├── public/
│   ├── src/
│   ├── .env                # Only VITE_ vars
│   └── Dockerfile
│
├── server/                 # Express + Mongo backend
│   ├── src/
│   ├── .env                # DB and JWT secret
│   └── Dockerfile
│
├── docker-compose.yml      # Central dev config
├── .gitignore
└── README.md -->

<!-- Docker-yml-file
version: '3.8'

services:
  mongo:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - ./mongo-data:/data/db

  backend:
    build:
      context: ./server
    container_name: backend
    ports:
      - "5000:5000"
    volumes:
      - ./server:/app
      - /app/node_modules
    env_file:
      - ./server/.env
    command: npm run dev
    depends_on:
      - mongo

  frontend:
    build:
      context: ./client
    container_name: frontend
    ports:
      - "5173:5173"
    volumes:
      - ./client:/app
      - /app/node_modules
    env_file:
      - ./client/.env
    command: npm run dev
    depends_on:
      - backend -->

<!-- client/Dockerfile (for Vite + React):
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]


server/Dockerfile (for Express + Nodemon):
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000
CMD ["npm", "run", "dev"]

 .env Files (Used with env_file:):
client/.env
VITE_API_URL=http://localhost:5000/api


server/.env:
PORT=5000
MONGO_URL=mongodb://mongo:27017/mydb
JWT_SECRET=my-secret

🚀 Run It All
In your terminal:
docker-compose up --build -->

<!-- for Production:
🌍 Folder Structure (Production)

mern-app/
├── client/             # React frontend
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── server/             # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── Dockerfile
│   ├── .env            # For MongoDB URI and JWT secrets
│   └── package.json
├── nginx/              # NGINX to serve frontend
│   └── default.conf
├── docker-compose.prod.yml
└── README.md
⚙️ client/Dockerfile (Production)
Dockerfile

# Build stage
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve build with NGINX
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ../nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
⚙️ server/Dockerfile (Production)
Dockerfile

FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "src/index.js"]
⚙️ nginx/default.conf
nginx

server {
  listen 80;
  server_name localhost;

  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri /index.html;
  }
}
🛠️ docker-compose.prod.yml
yaml

version: '3.9'

services:
  frontend:
    build: ./client
    container_name: frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./server
    container_name: backend
    ports:
      - "5000:5000"
    env_file:
      - ./server/.env
    depends_on:
      - mongodb

  mongodb:
    image: mongo:latest
    container_name: mongodb
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongo-data:
📦 Build & Run for Production
bash

docker compose -f docker-compose.prod.yml up --build -d
🧠 Notes
Don't forget to set your .env for backend with:

env

MONGO_URL=mongodb://mongodb:27017/yourdbname
JWT_SECRET=supersecret
You can set up environment-specific .env.production if needed.

Use Docker volumes to persist data (mongo-data in this case). -->

// how to create git repo
…or create a new repository on the command line
echo "# githum_actions_aws" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/RambabooPrajapati/githum_actions_aws.git
git push -u origin main


mern-app/
├── client/             # React frontend
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── server/             # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── Dockerfile
│   ├── .env            # For MongoDB URI and JWT secrets
│   └── package.json
├── docker-compose.prod.yml
└── README.md# rambaboo_fullstack_app
