const mongoose = require('mongoose');
const Categoria = mongoose.model("Categoria",new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: String
}));
module.exports = Categoria;