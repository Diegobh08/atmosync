# 🌡️ AtmoSync — Proyecto IoT de Monitoreo Ambiental

AtmoSync es un proyecto IoT que permite **medir, almacenar y visualizar temperatura y humedad en tiempo real**.
La idea principal es conectar sensores (por ejemplo, en un ESP32), enviar las lecturas al backend y mostrarlas en una interfaz web con gráficas y tablas.

## 📌 ¿De qué habla este proyecto?

Este proyecto trata de:

- Monitoreo ambiental continuo.
- Integración de hardware IoT (ESP32 + sensor DHT11/DHT22) con software web.
- Almacenamiento de lecturas en base de datos (MongoDB).
- Visualización de datos para tomar decisiones rápidas (estado normal/alerta).

En resumen, AtmoSync busca convertir datos físicos del ambiente en información útil y accesible desde una aplicación web.

## 🧩 Arquitectura general

1. **Dispositivo IoT** captura temperatura y humedad.
2. **Backend (Node.js + Express + MongoDB)** recibe y guarda los datos.
3. **Frontend (React + Vite + Recharts)** consulta el backend y muestra:
   - tarjetas de valores actuales,
   - gráficas históricas,
   - tablas con estado de las mediciones.

## ⚙️ Tecnologías

- **Frontend:** React, Vite, Recharts
- **Backend:** Node.js, Express, Mongoose
- **Base de datos:** MongoDB Atlas
- **IoT/Hardware:** ESP32 + DHT11/DHT22

## 🚀 Puesta en marcha

### 1) Backend

```bash
cd backend
npm install
node server.js
```

Configura `backend/.env` con:

```env
MONGO_URI=tu_cadena_mongodb
PORT=4000
NODE_ENV=development
```

### 2) Frontend

```bash
cd Frontend
npm install
npm run dev
```

## 🔌 Endpoints principales

- `POST /sensor` → recibe y guarda una lectura (`temperatura`, `humedad`)
- `GET /lecturas` → devuelve lecturas para visualización
- `POST /register` → registro de usuario
- `POST /login` → inicio de sesión

## 📁 Estructura del repositorio

```text
atmosync/
├── backend/      # API y conexión a MongoDB
├── Frontend/     # Aplicación web React
└── README.md
```

## 👥 Equipo

- Richard Montes
- Ronald Pradilla
- Diego Barrios

## 📄 Licencia

ISC
