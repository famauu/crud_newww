const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'tugas_programming',
    user: 'postgres',
    password: 'Jubelio123'
});

module.exports = db;