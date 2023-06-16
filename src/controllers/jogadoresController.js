import { response } from "express";
import timesController from "./timesController.js";
import jogadores from "../models/Jogador.js";

class JogadoresController {

    static listarJogadores = async (req, res) => {
        await jogadores.find()
        .populate('time', 'nome')
        .then(async(response) =>{
            //let times = await timesController.listarTimesInterna();
            //console.log(time);
            res.status(200).json(response)
        })     
        .catch((err) => {
            //console.log(err);
            res.status(500).json(err);
        })
      }

    static listarJogadoresPorId = async (req, res) => {
        const id = req.params.id

        await jogadores.findOne({ _id: id })
        .populate('time', 'nome')
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json({menssage: `${err.message} - Falha ao localizar Id do Jogador.`})
        });
        
    }

    static cadastrarJogador = async (req, res) => {
        let jogador = new jogadores(req.body);
        await jogador.save()
        .then((response) => {
            return res.status(201).send(response.toJSON())
        }).catch((err) => {  
            res.status(500).send({message: `${err.message} - falha ao cadastrar jogador.`})
        })
    }

    static atualizarJogador = async (req, res) => {
        const id = req.params.id;
        await jogadores.findByIdAndUpdate(id, {$set: req.body})
        .then(() => {
            res.status(201).send({message: `jogador atualizado com sucesso`});
        }).catch((err) => {
            res.status(500).send({message: `${err} falha ao atualizar jogador`})
        })
    }

    static excluirJogador = async (req, res) => {
        const id = req.params.id;
        await jogadores.findByIdAndDelete(id, {$set: req.body})
        .then(() =>{
            res.status(200).send({message: 'Jogador removido com sucesso'});
        }).catch((err) =>{
            res.status(500).send({message: err.message})
        })
    }

    static listarJogadoresPorPatrocinador = async (req,res) => {
        const patrocinador = req.query.patrocinador

        await jogadores.find({ 'patrocinador': patrocinador}, [])
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json({menssage: `${err.message} - Falha ao localizar o patrocinador do jogador.`})
        })
    }
}


export default JogadoresController;