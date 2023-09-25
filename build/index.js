"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = require("./class/Account");
const reader = __importStar(require("readline-sync"));
let mainUser;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mainUser) {
            yield createAccount();
        }
        else {
            yield menu();
        }
    });
}
function createAccount() {
    return __awaiter(this, void 0, void 0, function* () {
        console.info(`Bank Account`);
        const name = reader.question(`What is your name: `);
        let password, valid;
        do {
            password = reader.question(`Enter your password: `);
            valid = reader.question(`Confirm your password: `);
        } while (valid !== password);
        mainUser = new Account_1.Account(name, password);
        mainUser.register();
        yield main();
    });
}
function menu() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        console.info(`BANK ACCOUNT\n1 | Deposit\n2 | Withdraw\n3 | Extract\n4 | Exit`);
        const option = reader.questionInt(`Select a number: `);
        switch (option) {
            case 1:
                yield deposit();
                break;
            case 2:
                yield withdraw();
                break;
            case 3:
                extract();
                break;
            case 4:
                break;
            default:
                yield menu();
                break;
        }
    });
}
function deposit() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        console.info(`BANK ACCOUNT`);
        const password = reader.question(`Enter your password: `);
        if (!validPassword(password)) {
            console.error(`Wrong password!`);
            setTimeout(() => { menu(); }, 1000);
        }
        else {
            const money = reader.questionInt(`Money to deposit: `);
            yield (mainUser === null || mainUser === void 0 ? void 0 : mainUser.deposit(money));
            setTimeout(() => { menu(); }, 1000);
        }
    });
}
function withdraw() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        console.info(`BANK ACCOUNT`);
        const password = reader.question(`Enter your password: `);
        if (!validPassword(password)) {
            console.error(`Wrong password!`);
            setTimeout(() => { menu(); }, 1000);
        }
        else {
            const money = reader.questionInt(`Money to withdraw: `);
            yield (mainUser === null || mainUser === void 0 ? void 0 : mainUser.withdraw(money));
            setTimeout(() => { menu(); }, 1000);
        }
    });
}
function extract() {
    console.clear();
    console.info(`BANK ACCOUNT`);
    const password = reader.question(`Enter your password: `);
    if (!validPassword(password)) {
        console.error(`Wrong password!`);
        setTimeout(() => { menu(); }, 1000);
    }
    else {
        console.log(`Current balance: ${mainUser === null || mainUser === void 0 ? void 0 : mainUser.getBalance()}`);
        setTimeout(() => { menu(); }, 1000);
    }
}
const validPassword = (password) => {
    return password === (mainUser === null || mainUser === void 0 ? void 0 : mainUser.getPassword());
};
main();
