//import { accountDetails } from "./connector.js";

let currentAccount = null;

class Account {
  constructor(name, address, phonenumber, accountNumber) {
    this.name = name;
    this.address = address;
    this.phonenumber = phonenumber;
    this.accountNumber = accountNumber;
    this.balance = 0;
    this.trasaction = [];
    this.userAccountDetails = {
      name: this.name,
      address: this.address,
      phonenumber: this.phonenumber,
      accountNumber: this.accountNumber,
      balance: this.balance,
      transaction: this.trasaction,
    };
  }
  deposite(despositeAmount) {
    try {
      this.balance += Number(despositeAmount);
      this.userAccountDetails.balance += Number(despositeAmount);
      this.trasaction.push({
        type: "deposite",
        amount: despositeAmount,
        date: new Date(),
        transactionId: this.trasaction.length + 1,
      });
      alert(`${this.balance} is deposited`);
    } catch (error) {
      console.log(error);
    }
  }

  withdraw(withdrawAmount) {
    if (withdrawAmount < 0 || withdrawAmount >= this.balance) {
      console.log("it is not withdrawing");
      return;
    } else {
      this.balance -= Number(withdrawAmount);
      this.userAccountDetails.balance -= Number(withdrawAmount);
      console.log("it's done");
      this.trasaction.push({
        type: "withdraw",
        amount: withdrawAmount,
        date: new Date(),
        transactionId: this.trasaction.length + 1,
      });
      alert(`${withdrawAmount} is withdraw`);
    }
  }
  //Trasfer
  transfer(transferAmount, transferAccount) {
    console.log(transferAmount);
    console.log(transferAccount);
    console.log(transferAmount < 0);
    console.log(this.balance);
    console.log(transferAmount);
    if (transferAmount < 0 || this.balance < transferAmount) {
      console.log("transfer method is failing");
      return;
    } else {
      this.balance -= Number(transferAmount);
      console.log(
        `this user account details ${this.userAccountDetails.balance}`
      );
      this.userAccountDetails.balance -= Number(transferAmount);
      this.trasaction.push({
        type: "transfer",
        amount: transferAmount,
        date: new Date(),
        transactionId: this.trasaction.length + 1,
      });
      console.log(this.userAccountDetails);
      transferAccount.balance += Number(transferAmount);
      transferAccount.userAccountDetails.balance += Number(transferAmount);
      transferAccount.trasaction.push({
        type: "transfer",
        amount: transferAmount,
        date: new Date(),
        transactionId: this.trasaction.length + 1,
      });
      console.log(transferAccount.userAccountDetails);
      console.log(transferAccount.trasaction);
      console.log("transfer method is done");
    }
  }
}
const accountNumberHandler = (accountNumber) => {
  for (let i = 0; i < userAccountList.length; i++) {
    accountNumber == userAccountList[i].accountNumber ? true : false;
  }
};
const accountNumbergenerator = () => {
  let digitsStrings = "0123456789";
  let accountNumber = "";
  for (let i = 0; i < 10; i++) {
    const digits = Math.floor(Math.random() * digitsStrings.length);
    accountNumber += digitsStrings[digits];
  }

  const condition = accountNumberHandler(accountNumber);
  if (condition) {
    accountNumbergenerator();
  }
  return accountNumber;
};
const otherAccountGenerate = (name, address, phonenumber) => {
  const accountnumber = accountNumbergenerator();
  const otherAccount = new Account(name, address, phonenumber, accountnumber);
  userAccountList.push(otherAccount);
  console.log(otherAccount);
};
export const addAccount = async (userName, userAddress, phoneNumber) => {
  otherAccountGenerate("krihsna", "mathura", 9621127693);
  try {
    const accountnumber = accountNumbergenerator();
    console.log(accountnumber);
    const userAccount = new Account(
      userName,
      userAddress,
      phoneNumber,
      accountnumber
    );
    const userAccountDetails = userAccount.userAccountDetails;
    currentAccount = userAccount;
    console.log(userAccountDetails);
    userAccountList.push(userAccount);
    console.log(
      `this is userAccountlist --${JSON.stringify(userAccountList, null, 2)}`
    );
  } catch (error) {
    console.log(error);
  }
};
export const findrecipientAccount = (recipientAccount) => {
  console.log(userAccountList[0]);
  for (let i = 0; i < userAccountList.length; i++) {
    if (Number(userAccountList[i].accountNumber) == Number(recipientAccount)) {
      console.log(userAccountList[i]);
      return userAccountList[i];
    } else {
      console.log(`i didn't find`);
    }
  }
};
export const userAccountList = [];

export { currentAccount };
