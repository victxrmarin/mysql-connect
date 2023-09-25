import database from "../database/db";
import { executeDatabaseQuery } from "../database/db";

export class Account {
  private balance: number = 0;
  constructor(public name: string, private password: string) {}

  getPassword(): string { return this.password; }
  getBalance(): number { return this.balance; }

  async register(): Promise<void> {
    const query = `INSERT INTO Accounts(username, userpassword, balance) VALUES(?,?,?)`;
    const values = [this.name, this.password, this.balance];

    await executeDatabaseQuery(query, values);
    console.info(`Account registered!`);
  }

  async withdraw(money: number): Promise<void> {
    if (this.balance < money) {
      console.info(`Insufficient balance for withdrawal!`);
      return;
    }

    this.balance -= money;
    const query = `UPDATE Accounts SET balance = ? WHERE username = ?`;
    const values = [this.balance, this.name];

    await executeDatabaseQuery(query, values);
    console.info(`Withdrawal successful. Updated balance: ${this.balance}`);
  }

  async deposit(money: number): Promise<void> {
    this.balance += money;
    const query = `UPDATE Accounts SET balance = ? WHERE username = ?`;
    const values = [this.balance, this.name];

    await executeDatabaseQuery(query, values);
    console.info(`Deposit successful. Updated balance: ${this.balance}`);
  }

  async remove(): Promise<void> {
    const query = `DELETE FROM Accounts WHERE username = ?`;
    const values = [this.name];

    await executeDatabaseQuery(query, values);
    console.info("Account deleted!");
  }

  validPassword(password: string): boolean {
    return password === this.password;
  };
}
