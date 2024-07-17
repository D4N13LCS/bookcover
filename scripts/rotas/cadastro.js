const db = require('../db').pool;
const express = require('express');
const rotaCad = express.Router();

rotaCad.post("/", (req, res, next)=>{
    db.getConnection((error, conex)=>{
        if(error){return res.status(500).send({
            "Message error": error.message
        })}
        conex.query('SELECT * FROM users WHERE username = (?)',
                [req.body.username],
                (error, result)=>{
                    if(error){return res.status(501).send({
                        msg: error
                    })}
                    if(result.length > 0){
                        return res.status(401).send({
                            mensagem: "Usuário indisponível"
                        })
                    }else{
                        conex.query('Insert into users (username, user_key) values (?, ?)', [req.body.username, req.body.key], (error, result, field)=>{
                            conex.release();
                            if(error){ return res.status(500).send({
                                erro: error,
                                response: null
                            })}
                            return res.status(201).send({"mensagem": "cadastro realizado com sucesso!"})
                        })
                    }
                    
                }
            )
            
    })
})

module.exports = rotaCad;
