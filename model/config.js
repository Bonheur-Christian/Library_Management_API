const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "library_management_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

})

pool.getConnection()

    .then((connection) => {
        console.log("Connected to database");
        connection.release();

    }).catch((err) => {
        console.log("failed to connect to db ", err);

    })

module.exports = pool;
