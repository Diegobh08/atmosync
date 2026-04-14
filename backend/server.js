const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
console.log("🔥 ESTE ES EL ARCHIVO CORRECTO");
// Conexión a MongoDB Atlas (solo una vez)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch(err => console.error('❌ Error:', err));

// Modelo de Usuario

const User = require("./models/user");

// Registro
app.post('/register', async (req, res) => {
    const { email, password } = req.body; // <-- esto va DENTRO del post

    try {
        const newUser = new User({ email, password });
        await newUser.save();
        res.send("Usuario guardado");
    } catch (err) {
        res.send("Error al guardar: " + err.message);
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }); // <-- User, no userSchema
        if (!user) return res.send("Usuario no existe");
        if (user.password !== password) return res.send("Contraseña incorrecta");
        res.send("Usuario encontrado");
    } catch (err) {
        res.send("Error en el servidor");
    }
});

const HumedadR = require('./models/HumedadR');


app.post('/sensor', async (req, res) => {
    const { temperatura, humedad } = req.body;

    try {
        const nueva = new HumedadR({ temperatura, humedad });
        await nueva.save();

        console.log("Datos guardados:", temperatura, humedad);

        res.json({ ok: true });
    } catch (err) {
        res.json({ ok: false, error: err.message });
    }
});



app.get('/lecturas', async (req, res) => {
    const datos = await HumedadR
        .find({}, { fecha: 0 })
        .sort({ fecha: -1 });

    res.json(datos);
});

app.listen(4000, () => {
    console.log('Servidor corriendo en http://localhost:4000');
});