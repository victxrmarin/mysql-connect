"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const db_1 = __importDefault(require("../database/db"));
class Account {
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.balance = 0;
    }
    getPassword() { return this.password; }
    getBalance() { return this.balance; }
    executeDatabaseQuery(query, values) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default.execute(query, values);
            }
            catch (error) {
                console.error(`Error during database query: ${error}`);
                Promise.reject(error);
            }
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO Accounts(username, userpassword, balance) VALUES(?,?,?)`;
            const values = [this.name, this.password, this.balance];
            yield this.executeDatabaseQuery(query, values);
            console.info(`Account registered!`);
        });
    }
    withdraw(money) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.balance < money) {
                console.info(`Insufficient balance for withdrawal!`);
                return;
            }
            this.balance -= money;
            const query = `UPDATE Accounts SET balance = ? WHERE username = ?`;
            const values = [this.balance, this.name];
            yield this.executeDatabaseQuery(query, values);
            console.info(`Withdrawal successful. Updated balance: ${this.balance}`);
        });
    }
    deposit(money) {
        return __awaiter(this, void 0, void 0, function* () {
            this.balance += money;
            const query = `UPDATE Accounts SET balance = ? WHERE username = ?`;
            const values = [this.balance, this.name];
            yield this.executeDatabaseQuery(query, values);
            console.info(`Deposit successful. Updated balance: ${this.balance}`);
        });
    }
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM Accounts WHERE username = ?`;
            const values = [this.name];
            yield this.executeDatabaseQuery(query, values);
            console.info("Account deleted!");
        });
    }
}
exports.Account = Account;
