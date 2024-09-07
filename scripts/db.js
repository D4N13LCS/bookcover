const db = require('mysql');
const pool = db.createPool(
    {"user": "cardosodaniel",
    "password": process.env.senha,
    "host": "db4free.net",
    "port": 3306,
    "database": "l1brary_2"
    }
);

exports.pool = pool;