import { response } from "express";
import autores from "../models/Autor.js";

class AutoresController {

    static listarAutores = async (req, res) => {
        await autores.find()
        .then((response) =>{
            res.status(200).json(response)
        })     
        .catch((err) => {
            res.status(500).json(err);
        })
    }

    static listarAutorPorId = async (req, res) => {
        const id = req.params.id

        await autores.findOne({ _id: id })
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json({menssage: `${err.message} - Falha ao localizar Id do autor.`})
        });
        
    }

    static cadastrarAutor = async (req, res) => {
        let autor = new autores(req.body);
        await autor.save()
        .then((response) => {
            return res.status(201).send(response.toJSON())
        }).catch((err) => {  
            res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`})
        })
    }

    static atualizarAutor = async (req, res) => {
        const id = req.params.id;
        await autores.findByIdAndUpdate(id, {$set: req.body})
        .then(() => {
            res.status(201).send({message: `Autor atualizado com sucesso`});
        }).catch((err) => {
            res.status(500).send({message: `${err} falha ao atualizar autor`})
        })
    }

    static excluirAutor = async (req, res) => {
        const id = req.params.id;
        await autores.findByIdAndDelete(id, {$set: req.body})
        .then(() =>{
            res.status(200).send({message: 'Autor removido com sucesso'});
        }).catch((err) =>{
            res.status(500).send({message: err.message})
        })
    }
}

export default AutoresController;