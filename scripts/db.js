const db = require('mysql');
const pool = db.createPool(
    {"user": "root",
    "password": process.env.senha,
    "localhost": 3306,
    "database": "bookstore"
    }
);

exports.pool = pool;