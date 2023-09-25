var mariadb = require("mariadb");

const database = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "bank",
  waitForConnections: true,
  connectionLimit: 10,
});

export async function executeDatabaseQuery(query: string, values: any[]): Promise<void> {
  try {
    await database.execute(query, values);
  } catch (error) {
    console.error(`Error during database query: ${error}`);
    Promise.reject(error);
  }
}

export default database;

database.execute(`
    CREATE TABLE IF NOT EXISTS Accounts(
        id_accounts INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        username VARCHAR(50),
        userpassword VARCHAR(50),
        balance INT NOT NULL
    );
`)