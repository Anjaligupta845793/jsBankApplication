import { addAccount } from "./account.mjs";
import { findrecipientAccount } from "./account.mjs";
let userName, userAddress, phoneNumber;
import { currentAccount } from "./account.mjs";
document
  .getElementById("accountForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const nameId = document.getElementById("name");
    userName = nameId.value;
    console.log(userName);
    const addressId = document.getElementById("address");
    userAddress = addressId.value;

    const phoneId = document.getElementById("phonenumber");
    phoneNumber = phoneId.value;

    console.log(userName, userAddress, phoneNumber);
    try {
      await addAccount(userName, userAddress, phoneNumber);
    } catch (error) {
      console.log(error);
    }

    // Hide the form container
    document.getElementById("formContainer").classList.add("hidden");

    // Show the message container
    document.getElementById("messageContainer").classList.remove("hidden");

    // Show the welcome container after a short delay
    setTimeout(function () {
      document.getElementById("messageContainer").classList.add("hidden");
      document.getElementById("welcomeContainer").classList.remove("hidden");
    }, 2000); // Adjust the delay as needed
  });

function showForm(formType) {
  const formContainer = document.getElementById("formhandler");
  formContainer.innerHTML = ""; // Clear any existing form

  let formHTML = "";

  if (formType === "depositForm") {
    formHTML = `
            <form id="depositForm">
                <h2>Deposit Money</h2>
                <label for="depositAmount">Amount:</label>
                <input type="number" id="depositAmount" name="depositAmount" required>
                <button   type='submit'>Deposit</button>
            </form>
        `;
  } else if (formType === "withdrawForm") {
    formHTML = `
            <form id="withdrawForm">
                <h2>Withdraw Money</h2>
                <label for="withdrawAmount">Amount:</label>
                <input type="number" id="withdrawAmount" name="withdrawAmount" required>
                <button type="submit">Withdraw</button>
            </form>
        `;
  } else if (formType === "transferForm") {
    formHTML = `
            <form id="transferForm">
                <h2>Transfer Money</h2>
                <label for="transferAmount">Amount:</label>
                <input type="number" id="transferAmount" name="transferAmount" required>
                <label for="recipientAccount">Recipient Account:</label>
                <input type="text" id="recipientAccount" name="recipientAccount" required>
                <button type="submit">Transfer</button>
            </form>
        `;
  }

  formContainer.innerHTML = formHTML;
  //depositForm
  if (formType === "depositForm") {
    const depositButton = document.querySelector(
      "#depositForm button[type='submit']"
    );
    console.log(depositButton);
    depositButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default form submission
      const depositButton = document.querySelector("#depositForm input");
      const depositValue = depositButton.value;
      console.log(`the deposite amount is ${depositValue}`);
      console.log(currentAccount);
      currentAccount.deposite(depositValue);

      // Add your form submission logic here
    });
  }

  //withdrawForm
  if (formType === "withdrawForm") {
    const withdrawButton = document.querySelector(
      "#withdrawForm button[type='submit']"
    );
    console.log(withdrawButton);
    withdrawButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default form submission
      const withdrawButton = document.querySelector("#withdrawForm input");
      const withdrawValue = withdrawButton.value;
      console.log(`the withdrawe amount is ${withdrawValue}`);
      console.log(currentAccount);
      currentAccount.withdraw(withdrawValue);

      // Add your form submission logic here
    });
  }

  //transferFrom
  if (formType === "transferForm") {
    const transferButton = document.querySelector(
      "#transferForm button[type='submit']"
    );
    console.log(transferButton);
    transferButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default form submission
      const transferAmount = document.querySelector("#transferAmount");
      console.log(transferAmount);
      const transferValue = transferAmount.value;
      console.log(`the transfere amount is ${transferValue}`);
      //console.log(currentAccount);
      //currentAccount.transfer(transferValue);

      //transfer account
      const recipientAccount = document.querySelector("#recipientAccount");
      console.log(recipientAccount);
      const recipientValue = recipientAccount.value;
      const account = findrecipientAccount(recipientValue);
      console.log(account);

      currentAccount.transfer(transferValue, account);
      // Add your form submission logic here
    });
  }
}

document
  .getElementById("toggleTransactions")
  .addEventListener("click", function () {
    const transactions = document.getElementById("transactions");
    if (transactions.classList.contains("hidden")) {
      transactions.classList.remove("hidden");
      this.textContent = "Hide Transactions";
    } else {
      transactions.classList.add("hidden");
      this.textContent = "Show Transactions";
    }
    document.getElementById("toggleTransactions");

    const transactionsData = currentAccount.userAccountDetails.transaction;

    const tbody = document.querySelector("#transactionsTable tbody");

    transactionsData.forEach((transaction) => {
      const row = document.createElement("tr");

      row.innerHTML = `
      <td>${transaction.type}</td>
      <td>${transaction.amount}</td>
      <td>${transaction.date}</td>
      
    `;
      tbody.appendChild(row);
    });
  });

window.showForm = showForm;
