const express = require('express');
const rotaCarrinho = express.Router();
const db = require('../db').pool;
const autenticar = require('./login').autenticar;
const mysql = require('mysql');

rotaCarrinho.get('/:tit', autenticar, (req, res, next)=>{
    let tit = req.params.tit;
    console.log(tit)
    db.getConnection((error, conex)=>{
        if(error){ return res.status(500).send({msg: 'erro na conexão'})}
        conex.query(`select * from livros where titulo_livro= ?`, [tit], (error, result)=>{
            if (error){return res.status(404).send({text: 'livro não encontrado'})}
            return res.status(201).send({
                preco: result[0].preco,
                quantidade: result[0].quantidade,
                link: result[0].item_link,
                titulo: tit
            })
        })
    })
})

rotaCarrinho.get('/itens/:user', autenticar, (req, res, next)=>{
    let user = req.params.user
    db.getConnection((error, conex)=>{
        if(error){ return res.status(500).send({msg: 'erro na conexão'})}
        conex.query(`select * from ${user}`, (error, result)=>{
            if (error){return res.status(404).send({text: 'livro não encontrado'})}
            return res.status(201).send(result)
        })
    })
})

rotaCarrinho.post('/', autenticar, (req, res, next)=>{
    db.getConnection((error, conex)=>{
        if(error){return res.status(500).send({mens: 'conexão de bosta'})}

        conex.query(`SELECT * FROM ${req.body.username} where item = ?`, [req.body.item], (error, result)=>{
            if(error){res.status(500).send({txt: "erro no select"})}
            if(result.length > 0){
                return res.status(302).send({msg: "item já está adicionado"})
            }else{
                let table = mysql.escapeId(req.body.username);
                let qr = `INSERT INTO ${table}(item, qtd_item, preco, link) VALUES(?, ?, ?, ?)`
                conex.query(qr, [req.body.item, req.body.qtd_item, req.body.preco, req.body.link], (error, result)=>{
                if(error){ return res.status(500).send({msg: 'erro na query'})}
                return res.status(200).send({msg: 'produto adicionado ao carrinho com sucesso!'})
                })        
            }
        })

        
    })
})

rotaCarrinho.delete('/', autenticar, (req, res, next)=>{
    db.getConnection((err, conex)=>{
        if(err){ return res.status(500).send({error: err.message})}
        conex.query(`SELECT * FROM ${req.body.username} where item = ?`, [req.body.titulo_livro], (error, result)=>{
            if(error){ return res.status(404).send({msg: "registro não encontrado"})}
            conex.query(`DELETE FROM l1brary_2.${req.body.username} WHERE (item = ?)`, [req.body.titulo_livro], (err, result)=>{
                if(err){ return res.status(500).send({msg: "erro no delete"})}
                conex.release();
                return res.status(200).send({msg: "registro deletado com sucesso"})
            })
        })
    })
});

module.exports = {rotaCarrinho};