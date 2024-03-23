const mongoose = require("mongoose");

const Checkout = mongoose.model("Checkout",new mongoose.Schema({
    curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso' },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fechaCompra: { type: Date, default: Date.now },
    cupon: { type: String }
}));

module.exports = Checkout;