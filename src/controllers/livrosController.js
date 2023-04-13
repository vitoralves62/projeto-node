import { response } from "express";
import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = async (req, res) => {
        await livros.find()
        .populate('autor', 'nome')
        .then((response) =>{
            res.status(200).json(response)
        })     
        .catch((err) => {
            res.status(500).json(err);
        })
    }

    static listarLivrosPorId = async (req, res) => {
        const id = req.params.id

        await livros.findOne({ _id: id })
        .populate('autor', 'nome')
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json({menssage: `${err.message} - Falha ao localizar Id do livro.`})
        });
        
    }

    static cadastrarLivro = async (req, res) => {
        let livro = new livros(req.body);
        await livro.save()
        .then((response) => {
            return res.status(201).send(response.toJSON())
        }).catch((err) => {  
            res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})
        })
    }

    static atualizarLivro = async (req, res) => {
        const id = req.params.id;
        await livros.findByIdAndUpdate(id, {$set: req.body})
        .then(() => {
            res.status(201).send({message: `livro atualizado com sucesso`});
        }).catch((err) => {
            res.status(500).send({message: `${err} falha ao atualizar livro`})
        })
    }

    static excluirLivro = async (req, res) => {
        const id = req.params.id;
        await livros.findByIdAndDelete(id, {$set: req.body})
        .then(() =>{
            res.status(200).send({message: 'Livro removido com sucesso'});
        }).catch((err) =>{
            res.status(500).send({message: err.message})
        })
    }

    static listarLivroPorEditora = async (req,res) => {
        const editora = req.query.editora

        await livros.find({ 'editora': editora}, [])
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json({menssage: `${err.message} - Falha ao localizar a editora do livro.`})
        })
    }
}


export default LivroController