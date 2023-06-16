import mongoose from "mongoose";

const jogadorSchema = new mongoose.Schema(
    {
        id: {type: Number},
        nome: {type: String, required: true},
        time: {type: mongoose.Schema.Types.ObjectID, ref: 'time', required: true},
        patrocinador: {type: String, required: true},
        idade: {type: Number},
        numero: {type: Number, required: true}

    });

const jogadores = mongoose.model('jogadores', jogadorSchema);

export default jogadores;