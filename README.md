# AtmoSync — Sistema de Monitoreo Ambiental en Tiempo Real

AtmoSync es una aplicación web de monitoreo ambiental que integra hardware embebido, una interfaz de usuario reactiva y un servidor de datos persistentes, con el propósito de capturar, almacenar y visualizar variables ambientales —temperatura y humedad relativa— de forma continua y en tiempo real.

---

## Tabla de Contenidos

1. [Descripción General](#1-descripción-general)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Capa de Adquisición de Datos — Hardware](#3-capa-de-adquisición-de-datos--hardware)
4. [Capa de Servidor — Backend](#4-capa-de-servidor--backend)
   - [Modelos de Datos](#41-modelos-de-datos)
   - [Endpoints de la API REST](#42-endpoints-de-la-api-rest)
5. [Capa de Presentación — Frontend](#5-capa-de-presentación--frontend)
   - [Componentes de la Interfaz](#51-componentes-de-la-interfaz)
6. [Estructura de Directorios](#6-estructura-de-directorios)
7. [Instalación y Ejecución](#7-instalación-y-ejecución)
8. [Tecnologías Utilizadas](#8-tecnologías-utilizadas)
9. [Equipo de Desarrollo](#9-equipo-de-desarrollo)

---

## 1. Descripción General

AtmoSync constituye un sistema de monitoreo ambiental de arquitectura cliente-servidor, cuyo flujo de información inicia en un microcontrolador ESP32 equipado con un sensor de temperatura y humedad (DHT11/DHT22). Los datos adquiridos son transmitidos de forma inalámbrica hacia un servidor Node.js, el cual los persiste en una base de datos MongoDB Atlas. La interfaz web, desarrollada con React, consulta periódicamente el servidor y presenta la información al usuario mediante gráficas de línea y tablas de registros actualizadas cada tres segundos.

---

## 2. Arquitectura del Sistema

```
┌──────────────┐        HTTP POST        ┌───────────────────┐       Mongoose       ┌──────────────────┐
│   ESP32      │ ──────────────────────► │  Backend          │ ───────────────────► │  MongoDB Atlas   │
│  + DHT11/22  │    /sensor              │  Express (4000)   │                      │  (Nube)          │
└──────────────┘                         └─────────┬─────────┘                      └──────────────────┘
                                                   │ HTTP GET /lecturas
                                                   ▼  (cada 3 s)
                                         ┌───────────────────┐
                                         │  Frontend         │
                                         │  React + Vite     │
                                         └───────────────────┘
```

El sistema se compone de tres capas diferenciadas:

| Capa | Responsabilidad | Tecnología principal |
|---|---|---|
| Adquisición | Lectura de sensores y envío de datos | ESP32, DHT11/DHT22 |
| Servidor | Persistencia, autenticación y exposición de datos | Node.js, Express, MongoDB |
| Presentación | Visualización interactiva y autenticación de usuario | React, Recharts, Vite |

---

## 3. Capa de Adquisición de Datos — Hardware

El microcontrolador **ESP32** actúa como nodo sensor de la red. Se conecta mediante Wi-Fi a la red local y, a través del sensor **DHT11** o **DHT22**, mide la temperatura (en grados Celsius) y la humedad relativa (en porcentaje). Cada lectura es transmitida al backend mediante una solicitud HTTP POST al endpoint `/sensor`, codificada en formato JSON.

---

## 4. Capa de Servidor — Backend

El servidor se implementa con **Node.js** y el framework **Express v5**. Se ejecuta en el puerto `4000` y se conecta a una instancia de **MongoDB Atlas** a través de **Mongoose**. La cadena de conexión se gestiona como variable de entorno mediante el paquete `dotenv`, almacenada en el archivo `backend/.env`.

### 4.1 Modelos de Datos

#### `User` (`models/user.js`)
Representa a un usuario registrado en el sistema.

| Campo | Tipo | Descripción |
|---|---|---|
| `email` | `String` | Dirección de correo electrónico del usuario |
| `password` | `String` | Contraseña del usuario |

#### `HumedadR` (`models/HumedadR.js`)
Almacena cada lectura enviada por el sensor.

| Campo | Tipo | Descripción |
|---|---|---|
| `temperatura` | `Number` | Temperatura registrada en °C |
| `humedad` | `Number` | Humedad relativa registrada en % |
| `fecha` | `Date` | Marca temporal de la lectura (por defecto: fecha actual) |

### 4.2 Endpoints de la API REST

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/register` | Registra un nuevo usuario en la base de datos |
| `POST` | `/login` | Autentica a un usuario existente verificando credenciales |
| `POST` | `/sensor` | Recibe y persiste una lectura de temperatura y humedad |
| `GET` | `/lecturas` | Retorna las lecturas almacenadas ordenadas por fecha descendente |

---

## 5. Capa de Presentación — Frontend

La interfaz de usuario se desarrolla con **React 19** y se compila mediante **Vite**. La navegación entre vistas se gestiona mediante un estado interno del componente raíz (`App.jsx`), sin necesidad de un enrutador externo. Las vistas disponibles son: `login`, `register`, `dashboard` y `about`.

### 5.1 Componentes de la Interfaz

#### `App.jsx` — Componente Raíz
Gestiona el estado global de navegación de la aplicación. Renderiza condicionalmente uno de los cuatro componentes de vista según el valor del estado `page`.

#### `Login.jsx` — Inicio de Sesión
Presenta un formulario de autenticación con campos de correo electrónico y contraseña. Al enviarse, realiza una solicitud `POST /login` al backend. En caso de autenticación exitosa, redirige al usuario al Dashboard.

#### `Register.jsx` — Registro de Usuario
Permite la creación de una nueva cuenta mediante un formulario con campos de correo electrónico, nombre de usuario y contraseña. Envía los datos al endpoint `POST /register` y, ante una respuesta satisfactoria, redirige a la vista de inicio de sesión.

#### `Dashboard.jsx` — Panel de Monitoreo
Es el componente central del sistema de monitoreo. Mediante `useEffect` y `setInterval`, consulta el endpoint `GET /lecturas` cada **3 segundos** y actualiza el estado local con los últimos 10 registros. Presenta la información en:
- **Tarjetas de resumen**: valor actual de temperatura y humedad.
- **Gráficas de línea**: evolución temporal de cada variable, construidas con la biblioteca **Recharts**.
- **Tablas de registros**: listado de las lecturas recientes con indicadores de estado (ej. temperatura `> 27 °C` se clasifica como *Alta*; humedad `< 50 %` se clasifica como *Baja*).

#### `Navbar.jsx` — Barra de Navegación
Componente de navegación persistente que se muestra en las vistas autenticadas. Contiene enlaces al Dashboard, a la sección "Acerca de nosotros" y un botón para cerrar sesión (retorna a la vista de login).

#### `About.jsx` — Información del Proyecto
Vista informativa que describe el propósito del proyecto, las variables monitoreadas, el hardware empleado y los integrantes del equipo de desarrollo.

---

## 6. Estructura de Directorios

```
atmosync/
├── backend/
│   ├── models/
│   │   ├── user.js          # Modelo de usuario (Mongoose)
│   │   └── HumedadR.js      # Modelo de lectura de sensor (Mongoose)
│   ├── .env                 # Variables de entorno (cadena de conexión MongoDB)
│   ├── package.json         # Dependencias del servidor
│   └── server.js            # Servidor Express — rutas y lógica de negocio
│
└── Frontend/
    ├── public/              # Recursos estáticos públicos
    ├── src/
    │   ├── components/
    │   │   ├── About.jsx        # Vista: información del proyecto y equipo
    │   │   ├── Dashboard.jsx    # Vista: panel de monitoreo en tiempo real
    │   │   ├── Login.jsx        # Vista: inicio de sesión
    │   │   ├── Navbar.jsx       # Componente: barra de navegación
    │   │   ├── Register.jsx     # Vista: registro de usuario
    │   │   ├── about.css
    │   │   ├── dashboard.css
    │   │   ├── navbar.css
    │   │   └── styles.css
    │   ├── App.jsx          # Componente raíz — gestión de navegación
    │   ├── main.jsx         # Punto de entrada de la aplicación React
    │   └── index.css
    ├── index.html
    ├── package.json         # Dependencias del frontend
    └── vite.config.js       # Configuración de Vite
```

---

## 7. Instalación y Ejecución

### Prerrequisitos
- Node.js v18 o superior
- Cuenta en MongoDB Atlas (o instancia local de MongoDB)

### Backend

```bash
cd backend
# Configurar la cadena de conexión en el archivo .env
# MONGO_URI=<cadena de conexión de MongoDB Atlas>
node server.js
```

El servidor quedará disponible en `http://localhost:4000`.

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

La aplicación web quedará disponible en `http://localhost:5173` (puerto por defecto de Vite).

---

## 8. Tecnologías Utilizadas

| Tecnología | Categoría | Versión |
|---|---|---|
| ESP32 | Microcontrolador | — |
| DHT11 / DHT22 | Sensor ambiental | — |
| Node.js | Entorno de ejecución servidor | v18+ |
| Express | Framework web (backend) | v5 |
| Mongoose | ODM para MongoDB | v9 |
| MongoDB Atlas | Base de datos en la nube | — |
| React | Biblioteca de interfaz de usuario | v19 |
| Vite | Herramienta de construcción (frontend) | v8 |
| Recharts | Biblioteca de gráficas para React | v3 |
| dotenv | Gestión de variables de entorno | v17 |
| CORS | Middleware de control de acceso | v2 |

---

## 9. Equipo de Desarrollo

| Nombre | Rol |
|---|---|
| Richard Montes | Desarrollador |
| Ronald Pradilla | Desarrollador |
| Diego Barrios | Desarrollador |
