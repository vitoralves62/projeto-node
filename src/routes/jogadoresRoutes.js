import express from "express";
import JogadoresController from "../controllers/jogadoresController.js";

const router = express.Router();

router
    .get("/jogadores", JogadoresController.listarJogadores)
    .get("/jogadores/busca", JogadoresController.listarJogadoresPorPatrocinador)
    .get("/jogadores/:id", JogadoresController.listarJogadoresPorId)
    .post("/jogadores", JogadoresController.cadastrarJogador)
    .put("/jogadores/:id", JogadoresController.atualizarJogador)
    .delete("/jogadores/:id", JogadoresController.excluirJogador)

export default router;