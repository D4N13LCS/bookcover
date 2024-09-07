const db = require('../db').pool;
const express = require('express');
const rotaLiv = express.Router();
const jwt = require('jsonwebtoken');
const autenticar = require('./login').autenticar;

rotaLiv.patch('/', autenticar ,(req, res, next) => {
    db.getConnection((error, conex) => {
        if (error) {
            return res.status(500).send({ mesagem: error });
        }

        conex.query('SELECT quantidade FROM livros WHERE titulo_livro = ?', [req.body.titulo_livro], (error, result) => {
            if (error) {
                conex.release();
                return res.status(500).send({ error: error });
            }

            if (result.length > 0) {
                let quantidade = result[0].quantidade - req.body.quantidade;

                if (result[0].quantidade <= 0 || req.body.quantidade > result[0].quantidade) {
                    conex.release();
                    return res.status(400).send({ msg: "Quantidade insuficiente" });
                }

                conex.query('UPDATE livros SET quantidade = ? WHERE titulo_livro = ?', [quantidade, req.body.titulo_livro], (error, result) => {
                    conex.release();
                    if (error) {
                        return res.status(500).send({ error: error });
                    }

                    if (result.affectedRows > 0) {
                        return res.status(200).send({ msg: "Atualização feita com sucesso!" });
                    } else {
                        return res.status(500).send({ msg: "Não foi possível fazer a atualização!" });
                    }
                });
            } else {
                conex.release();
                return res.status(404).send({ msg: "Livro não encontrado" });
            }
        });
    });
});

module.exports = rotaLiv;

