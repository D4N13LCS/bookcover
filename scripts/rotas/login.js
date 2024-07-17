const express = require('express');
const rotaLog = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db').pool;
const secret = process.env.senha;
const session = require('express-session');


rotaLog.post('/', (req, res, next) => {
    db.getConnection((error, conex) => {
        if (error) {
            return res.status(501).send({
                error: error.message
            });
        }

        conex.query('SELECT username FROM users WHERE username = ? AND user_key = ?', 
            [req.body.username, req.body.key], 
            (error, result) => {
                conex.release();
                if (error) {
                    return res.status(501).send({
                        error: error.message
                    });
                }
                if (result.length > 0) {
                    const token = jwt.sign({ username: req.body.username }, secret, { expiresIn: '1h' });
                    res.status(200).json({ token });
                } else {
                    return res.status(401).send({
                        mensagem: "Usuário ou senha inválida"
                    });
                }
            }
        );
    });
});


const autenticar = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(403).send({
            mensagem: "Token não fornecido"
        });
    }

    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Falha na autenticação do token"
            });
        }

        req.user = decoded;
        next();
    });
};

module.exports = {rotaLog, autenticar};
