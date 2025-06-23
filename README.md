# 🧑‍💻 Red Social - Prueba Técnica Full Stack

Este proyecto es una red social básica construida como parte de una prueba técnica para el rol de Desarrollador Full Stack. Usa una arquitectura de microservicios basada en Node.js, NestJS, React, Prisma y Docker.

---

## Características principales

- Autenticación con JWT (login y carga de perfil)
- CRUD de publicaciones
- Likes por usuario
- Arquitectura con microservicios (`auth-service`, `posts-service`)
- Seed de base de datos
- Docker para desarrollo local
- Documentación Swagger en backend
- Rutas protegidas en frontend con React Router
- Estado global con Zustand

---

## Tecnologías utilizadas

### Backend

- Node.js + NestJS
- Prisma ORM
- PostgreSQL
- Swagger
- Docker

### Frontend

- React + Vite
- Zustand
- Axios
- React Router DOM

---

## Estructura del proyecto

```bash
.
├── backend
│   ├── auth-service
│   └── posts-service
├── frontend
│   └── src
├── docker-compose.yml
└── README.md
```

---

## Variables de entorno

Cada microservicio backend utiliza:

```bash
DATABASE_URL=postgres://postgres:postgres@postgres:5432/social
```

---

## Cómo ejecutar (modo desarrollo técnico)

Desde la raíz del proyecto:

```bash
docker-compose up --build
```

Esto iniciará:

- PostgreSQL en el puerto `5432`
- `auth-service` en `http://localhost:3001`
- `posts-service` en `http://localhost:3002`
- Frontend React en `http://localhost:5173`

---

## Uso

### Login

- Ruta: `/`
- Inicia sesión con un alias y contraseña (usuarios del seed)

### Perfil

- Ruta: `/profile`
- Muestra datos del usuario autenticado

### Publicaciones

- Ruta: `/posts`
- Lista publicaciones y permite crear nuevas
- Permite dar "like"

---

## Documentación Swagger

Disponible en:

- `http://localhost:3001/api` → auth-service
- `http://localhost:3002/api` → posts-service

---

## Seed de base de datos

Para cargar datos de prueba, ejecuta desde cada microservicio:

```bash
npx prisma db seed
```
