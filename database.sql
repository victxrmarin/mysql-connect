CREATE DATABASE Bank;
USE Bank;

CREATE TABLE IF NOT EXISTS Accounts(
	id_account INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	username VARCHAR(50),
	userpassword VARCHAR(50),
	balance INT NOT NULL
);
