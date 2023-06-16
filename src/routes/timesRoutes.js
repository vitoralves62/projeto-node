import express from "express";
import TimesController from "../controllers/timesController.js";

const router = express.Router();

router
    .get("/times", TimesController.listarTimes)
    .get("/times/:id", TimesController.listarTimePorId)
    .post("/times", TimesController.cadastrarTime)
    .put("/times/:id", TimesController.atualizarTime)
    .delete("/times/:id", TimesController.excluirTime)

export default router;