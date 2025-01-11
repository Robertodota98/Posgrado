const mysql = require("mysql2/promise");
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

async function connectDB() {
    const connection = await mysql.createConnection({
        host: dbHost,
        user: dbUser,
        password: dbPassword,
        database: dbDatabase,
    });

    return connection;
}

module.exports = {
    connectDB,
};
