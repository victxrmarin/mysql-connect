import { Account } from "./class/Account";
import * as reader from "readline-sync";

async function createAccount(): Promise<Account> {
  console.info(`Bank Account`);
  const name: string = reader.question(`What is your name: `);
  let password: string, valid: string;

  do {
    password = reader.question(`Enter your password: `);
    valid = reader.question(`Confirm your password: `);
  } while (valid !== password);

  let mainUser = new Account(name, password);
  mainUser.register();

  return mainUser;
}

async function menu(): Promise<void> {
  let mainUser = await createAccount();
  let option = 0;

  while (option !== 4) {
    console.clear();
    console.info(
      `BANK ACCOUNT\n1 | Deposit\n2 | Withdraw\n3 | Extract\n4 | Exit`
    );
    option = reader.questionInt(`Select a number: `);

    switch (option) {
      case 1:
        await deposit(mainUser);
        break;
      case 2:
        await withdraw(mainUser);
        break;
      case 3:
        extract(mainUser);
        break;
      case 4:
        return;
    }
  }
}

async function deposit(user: Account): Promise<void> {
  console.clear();
  console.info(`BANK ACCOUNT`);

  const password: string = reader.question(`Enter your password: `);
  if (user.validPassword(password)) {
    console.error(`Wrong password!`);

    setTimeout(() => { return; }, 1000);
  } else {
    const money: number = reader.questionInt(`Money to deposit: `);
    await user.deposit(money);

    setTimeout(() => { return; }, 1000);
  }
}

async function withdraw(user: Account): Promise<void> {
  console.clear();
  console.info(`BANK ACCOUNT`);
  const password: string = reader.question(`Enter your password: `);
  if (user.validPassword(password)) {
    console.error(`Wrong password!`);

    setTimeout(() => { return; }, 1000);
  } else {
    const money: number = reader.questionInt(`Money to withdraw: `);
    await user.withdraw(money);

    setTimeout(() => { return; }, 1000);
  }
}

function extract(user: Account): void {
  console.clear();
  console.info(`BANK ACCOUNT`);
  const password: string = reader.question(`Enter your password: `);
  if (!user.validPassword(password)) {
    console.error(`Wrong password!`);

    setTimeout(() => { return; }, 1000);
  } else {
    console.log(`Current balance: ${user.getBalance()}`);

    setTimeout(() => { return; }, 1000);
  }
}


menu();
