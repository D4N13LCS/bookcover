const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const pool = require("./db").pool;
const session = require('express-session');
const port = 3000;
app.listen(port);
const rotaCad = require('./rotas/cadastro');
const rotaLog = require('./rotas/login').rotaLog;
const rotaLiv = require('./rotas/livros');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: process.env.senha,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*') 
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )


    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    }
    next();
})

app.use("/cadastro", rotaCad);
app.use('/login', rotaLog);
app.use('/livros', rotaLiv);

app.use("/", (req, res, next)=>{
    res.status(201).send({
        "mensagem": "Página principal"
    })
})

module.exports = app;