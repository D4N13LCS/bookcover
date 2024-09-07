const db = require('../db').pool;
const express = require('express');
const mysql = require('mysql');
const rotaCad = express.Router();

rotaCad.post("/", (req, res, next) => {
    db.getConnection((error, conex) => {
        if (error) {
            return res.status(500).send({ "Message error": error.message });
        }

        conex.query('SELECT * FROM users WHERE username = ?', [req.body.username], (error, result) => {
            if (error) {
                conex.release();
                return res.status(501).send({ msg: error });
            }

            if (result.length > 0) {
                conex.release();
                return res.status(401).send({ mensagem: "Usuário indisponível" });
            }

            conex.query('INSERT INTO users (username, user_key) VALUES (?, ?)', [req.body.username, req.body.key], (error, result) => {
                if (error) {
                    conex.release();
                    return res.status(500).send({ erro: error, response: null });
                }

                const tableName = mysql.escapeId(req.body.username);
                const createTableQuery = `
                    CREATE TABLE ${tableName} (
                        id_item int primary key auto_increment, 
                        item varchar(100) default(""), 
                        qtd_item int default(0), 
                        preco float default(0),
                        link varchar(255) default("")
                    )
                `;

                conex.query(createTableQuery, (err, result) => {
                    if (err) {
                        conex.release();
                        return res.status(500).send({ text: "Não foi possível criar a tabela" });
                    }

                    
                    const insertClientQuery = `INSERT INTO ${tableName} (item) VALUES (?)`;
                    conex.query(insertClientQuery, [req.body.item], (error, result) => {
                        conex.release();

                        if (error) {
                            console.error("Erro ao inserir na tabela:", error);
                            return res.status(500).send({ error: 'Deu ruim na inserção' });
                        }

                        return res.status(200).send({ msg: "Cadastro e tabela criados com sucesso!" });
                    });
                    
                });
            });
        });
    });
});

module.exports = rotaCad;

