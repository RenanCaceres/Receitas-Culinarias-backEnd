const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://renan2004:back1008@cluster0.6xmi7lb.mongodb.net/')
    .then(() => {
        console.log('MongoDB Atlas conectado!');
    })
    .catch((erro) => {
        console.log('Erro ao conectar no MongoDB Atlas:', erro);
    });

module.exports = mongoose;