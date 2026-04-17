# 🌡️ AtmoSync - Sistema de Monitoreo de Temperatura y Humedad

AtmoSync es una aplicación fullstack para monitorear temperatura y humedad en tiempo real. Incluye un backend robusto con Node.js/Express y una interfaz moderna con React/Vite.

## 🎯 Características

- ✅ Registro e inicio de sesión de usuarios con contraseñas hasheadas
- ✅ Recepción de datos de sensores en tiempo real
- ✅ Gráficas interactivas con historial de lecturas
- ✅ API REST bien documentada
- ✅ Validación de datos en backend y frontend
- ✅ Interfaz responsiva y moderna

## 📋 Requisitos

- **Node.js** >= 18.0.0
- **npm** o **yarn**
- **MongoDB Atlas** (base de datos en la nube)

## 🚀 Instalación y Configuración

### 1️⃣ Clonar el repositorio

```bash
git clone [tu-repositorio]
cd atmosync
```

### 2️⃣ Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env` (copiar desde `.env.example`):

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales de MongoDB:

```env
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/atmosync?retryWrites=true&w=majority
PORT=4000
NODE_ENV=development
```

### 3️⃣ Configurar Frontend

```bash
cd ../Frontend
npm install
```

Crear archivo `.env` (copiar desde `.env.example`):

```bash
cp .env.example .env
```

## 🏃 Ejecutar el Proyecto

### Backend (Terminal 1)

```bash
cd backend
node server.js
```

El servidor estará disponible en: `http://localhost:4000`

### Frontend (Terminal 2)

```bash
cd Frontend
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## 📚 API Endpoints

### Autenticación

- `POST /register` - Registrar nuevo usuario
- `POST /login` - Iniciar sesión

### Sensores

- `POST /sensor` - Guardar lectura del sensor
- `GET /lecturas` - Obtener últimas lecturas
- `GET /lecturas/promedio` - Obtener estadísticas

### Utilidad

- `GET /health` - Verificar estado del servidor

## 🏗️ Estructura del Proyecto

```
atmosync/
├── backend/
│   ├── models/
│   │   ├── user.js           # Modelo de usuario con validaciones
│   │   └── HumedadR.js       # Modelo de lecturas de sensor
│   ├── .env.example          # Variables de entorno (ejemplo)
│   ├── .gitignore            # Archivos a ignorar en Git
│   ├── package.json          # Dependencias del backend
│   └── server.js             # Servidor principal
│
├── Frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── services/
│   │   │   └── api.js        # Cliente centralizado de API
│   │   └── App.jsx           # Componente principal
│   ├── .env.example          # Variables de entorno (ejemplo)
│   ├── .gitignore            # Archivos a ignorar en Git
│   ├── package.json          # Dependencias del frontend
│   └── vite.config.js        # Configuración de Vite
│
└── README.md                 # Este archivo
```

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcryptjs
- ✅ Validación de entrada en todos los endpoints
- ✅ Variables sensibles en .env (no comprometidas)
- ✅ CORS configurado

## 🛠️ Scripts Disponibles

### Backend

```bash
npm run dev      # Iniciar con watch mode (desarrollo)
npm start        # Iniciar servidor
npm test         # Ejecutar pruebas
```

### Frontend

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Ver build de producción localmente
npm run lint     # Verificar estilo de código
npm run lint:fix # Corregir estilo automáticamente
```

## 📊 Mejoras Realizadas

- ✨ Refactorización completa del backend a módulos ES6
- ✨ Modelos mejorados con validaciones y esquemas
- ✨ Centralización de llamadas a API en servicio único
- ✨ Manejo de errores consistente
- ✨ Códigos HTTP adecuados en respuestas
- ✨ Autenticación mejorada
- ✨ Eliminar URLs hardcodeadas
- ✨ Agregar loading states en componentes
- ✨ Documentación clara

## 🐛 Debugging

### Backend

Si el servidor no inicia:

1. Verificar que MongoDB está accesible:
   ```bash
   npm run dev
   ```
   Debe mostrar: `✅ Conectado a MongoDB Atlas`

2. Verificar el puerto 4000 no esté en uso:
   ```bash
   netstat -ano | findstr :4000  # Windows
   lsof -i :4000                  # Linux/Mac
   ```

### Frontend

Si hay errores de CORS, verificar que `VITE_API_URL` en `.env` apunta al backend correcto.

## 📞 Soporte

Para reportar bugs o sugerir mejoras, abre un issue en el repositorio.

## 📄 Licencia

ISC

---

**Última actualización:** 17 de abril de 2026

