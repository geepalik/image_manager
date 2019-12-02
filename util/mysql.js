const mysql = require('mysql2');

//manage multiple connection through connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'rest_api',
    password: 'admin'
});

module.exports = pool.promise();