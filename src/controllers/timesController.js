import { response } from "express";
import time from "../models/Time.js";

class TimesController {

    static listarTimes = async (req, res) => {
        await time.find()
        .then((response) =>{
            res.status(200).json(response);
        })     
        .catch((err) => {
            res.status(500).json(err);
        })
    }

    static listarTimePorId = async (req, res) => {
        const id = req.params.id

        await time.findOne({ _id: id })
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json({menssage: `${err.message} - Falha ao localizar Id do autor.`})
        });
        
    }

    static cadastrarTime = async (req, res) => {
        let Time = new time(req.body);
        await Time.save()
        .then((response) => {
            return res.status(201).send(response.toJSON())
        }).catch((err) => {  
            res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`})
        })
    }

    static atualizarTime = async (req, res) => {
        const id = req.params.id;
        await time.findByIdAndUpdate(id, {$set: req.body})
        .then(() => {
            res.status(201).send({message: `Time atualizado com sucesso`});
        }).catch((err) => {
            res.status(500).send({message: `${err} falha ao atualizar autor`})
        })
    }

    static excluirTime = async (req, res) => {
        const id = req.params.id;
        await time.findByIdAndDelete(id, {$set: req.body})
        .then(() =>{
            res.status(200).send({message: 'Time removido com sucesso'});
        }).catch((err) =>{
            res.status(500).send({message: err.message})
        })
    }
}

export default TimesController;