"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mariadb = require("mariadb");
const database = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "bank",
    waitForConnections: true,
    connectionLimit: 10,
});
exports.default = database;
database.execute(`
    CREATE TABLE IF NOT EXISTS Accounts(
        id_accounts INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        username VARCHAR(50),
        userpassword VARCHAR(50),
        balance INT NOT NULL
    );
`);
