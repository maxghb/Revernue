// script.js

document.getElementById('save-btn').addEventListener('click', function() {
    const id = parseInt(document.getElementById('edit-id').value);
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value;

    if (description && !isNaN(amount) && amount > 0 && date) {
        const index = transactions.findIndex(transaction => transaction.id === id);
        if (index !== -1) {
            transactions[index].description = description;
            transactions[index].amount = amount;
            transactions[index].type = type;
            transactions[index].date = date;
            renderTransactions();
            updateBalance();
            saveTransactions();
            clearForm();
            document.getElementById('add-btn').style.display = 'block'; // Show the Add button
            document.getElementById('save-btn').style.display = 'none'; // Hide the Save button
        }
    } else {
        alert('Please enter a valid description, amount, and date.');
    }
});

document.getElementById('add-btn').addEventListener('click', function() {
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value;

    if (description && !isNaN(amount) && amount > 0 && date) {
        addTransaction(description, amount, type, date);
        updateBalance();
        saveTransactions();
        clearForm();
    } else {
        alert('Please enter a valid description, amount, and date.');
    }
});


document.getElementById('save-btn').addEventListener('click', function() {
    document.getElementById('add-btn').style.display = 'block'; // Show the Add button
    document.getElementById('save-btn').style.display = 'none'; // Hide the Save button
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
            <td>
                <button onclick="editTransaction(${transaction.id})">Edit</button>
                <button onclick="deleteTransaction(${transaction.id})">Delete</button>
            </td>
        `;
        transactionList.appendChild(transactionRow);
    });
}

function editTransaction(id) {
    const transaction = transactions.find(transaction => transaction.id === id);
    if (transaction) {
        document.getElementById('description').value = transaction.description;
        document.getElementById('amount').value = transaction.amount;
        document.getElementById('type').value = transaction.type;
        document.getElementById('date').value = transaction.date;
        document.getElementById('edit-id').value = transaction.id;
        document.getElementById('add-btn').style.display = 'none';
        document.getElementById('save-btn').style.display = 'block';
    }
}

document.getElementById('save-btn').addEventListener('click', function() {
    const id = parseInt(document.getElementById('edit-id').value);
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value;

    if (description && !isNaN(amount) && amount > 0 && date) {
        const index = transactions.findIndex(transaction => transaction.id === id);
        if (index !== -1) {
            transactions[index].description = description;
            transactions[index].amount = amount;
            transactions[index].type = type;
            transactions[index].date = date;
            renderTransactions();
            updateBalance();
            saveTransactions();
            clearForm();
            document.getElementById('add-btn').style.display = 'block';
            document.getElementById('save-btn').style.display = 'none';
        }
    } else {
        alert('Please enter a valid description, amount, and date.');
    }
});

document.getElementById('add-btn').addEventListener('click', function() {
    document.getElementById('add-btn').style.display = 'block';
    document.getElementById('save-btn').style.display = 'none';
});
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


function updateTransaction(){
document.getElementById('save-btn').addEventListener('click', function() {
    const id = parseInt(document.getElementById('edit-id').value);
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value;

    if (description && !isNaN(amount) && amount > 0 && date) {
        const index = transactions.findIndex(transaction => transaction.id === id);
        if (index !== -1) {
            transactions[index] = { id, description, amount, type, date };
            renderTransactions();
            updateBalance();
            saveTransactions();
            clearForm();
            document.getElementById('add-btn').style.display = 'block';
            document.getElementById('save-btn').style.display = 'none';
        }
    } else {
        alert('Please enter a valid description, amount, and date.');
    }
});
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    renderTransactions();
    updateBalance();
    saveTransactions();
}


function init() {
    renderTransactions();
    updateBalance();
}

init();
