import mongoose from "mongoose";

const timeSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        nacionalidade: {type: String}
    },
    {
        versionKey: false
    }
)

const time = mongoose.model('time', timeSchema)

export default time;