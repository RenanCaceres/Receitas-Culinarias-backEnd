const mongoose = require('mongoose');

const comentario = mongoose.Schema({
    titulo: { type: String, required: true },
    texto:  { type: String, required: true },
    autor:  { type: String, required: true }
});

module.exports = mongoose.model('Comentario', comentario);
