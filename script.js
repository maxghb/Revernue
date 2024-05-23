// script.js

document.getElementById('add-btn').addEventListener('click', function() {
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value;

    if (description && !isNaN(amount) && amount > 0 && date) {
        addTransaction(description, amount, type, date);
        updateBalance();
        saveTransactions();
    } else {
        alert('Please enter a valid description, amount, and date.');
    }
});

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(description, amount, type, date) {
    const transaction = {
        description,
        amount,
        type,
        date,
        id: new Date().getTime()
    };
    transactions.push(transaction);
    renderTransactions();
}

function updateBalance() {
    const balanceElement = document.getElementById('balance');
    const totalIncomeElement = document.getElementById('total-income');
    const totalExpensesElement = document.getElementById('total-expenses');

    const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);

    const totalIncome = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpenses = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    balanceElement.textContent = balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    totalIncomeElement.textContent = totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    totalExpensesElement.textContent = totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const transactionRow = document.createElement('tr');
        transactionRow.innerHTML = `
            <td>${transaction.description}</td>
            <td>฿${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
            <td>${transaction.date}</td>
            <td><button onclick="deleteTransaction(${transaction.id})">X</button></td>
        `;
        transactionList.appendChild(transactionRow);
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    renderTransactions();
    updateBalance();
    saveTransactions();
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    renderTransactions();
    updateBalance();
}

init();
