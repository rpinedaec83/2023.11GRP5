const mongoose = require('mongoose');
const Cupon = mongoose.model('Cupon', new mongoose.Schema({
    codigo: String,
    descuento: Number,
    curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }
}));
module.exports = Cupon;