-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  alias VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  nombres VARCHAR(100),
  apellidos VARCHAR(100),
  fecha_nacimiento DATE
);

-- Insertar usuarios de prueba
INSERT INTO users (alias, password, nombres , apellidos, fecha_nacimiento)
VALUES ('jbar', 'password123', 'Jeison', 'Barbosa', '1995-09-19');

INSERT INTO users (alias, password, nombres , apellidos, fecha_nacimiento)
VALUES ('jbar2', 'password123', 'David', 'Moreno', '1990-01-01');

-- Crear tabla de publicaciones
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar publicaciones
INSERT INTO posts (user_id, message)
VALUES (1, '¡Hola, esta es mi primera publicación! by Jeison');

INSERT INTO posts (user_id, message)
VALUES (2, '¡Hola, esta es mi primera publicación! by David');

-- Crear tabla de likes
CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar likes de prueba
INSERT INTO likes (user_id, post_id)
VALUES (1, 2);

INSERT INTO likes (user_id, post_id)
VALUES (2, 1);
