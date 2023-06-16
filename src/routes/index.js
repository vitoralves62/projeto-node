import express from "express";
import jogadores from "./jogadoresRoutes.js";
import times from "./timesRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) =>{
        res.status(200).send({titulo: "curso de node"})
    })

    app.use(
        express.json(),
        jogadores,
        times
    )

}

export default routes