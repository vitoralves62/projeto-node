import mongoose from "mongoose"

mongoose.connect("mongodb+srv://vitoralves062:18vi03to03R@node-express.ov19fkq.mongodb.net/alura-node?");

let db = mongoose.connection;

export default db;