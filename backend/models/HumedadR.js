const mongoose = require('mongoose');

const lecturaSchema = new mongoose.Schema({
    temperatura: Number,
    humedad: Number,
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HumedadR", lecturaSchema);