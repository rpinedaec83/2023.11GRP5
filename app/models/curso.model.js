const mongoose = require("mongoose");
const Curso = mongoose.model("Curso",new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: String,
    precio:{
        type:Number,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }
}));
module.exports = Curso;