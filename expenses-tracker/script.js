let expenses =JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
    const name = document.getElementById("expenseName").value.trim();
    const amount = Number(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;

    if (name === "" || amount <= 0 || category === "") {
        alert("Please fill in all the fields correctly.");
        return;
    }

    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense);
    localStorage.setItem("expenses",JSON.stringify(expenses));

    displayExpenses();
   
    updateTotal();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseCategory").value = "";
}

function displayExpenses() {
    const expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";

    expenses.forEach(function(expense) {
        const item = document.createElement("div");

        item.innerHTML = `
            <div>
                <strong>${expense.name}</strong>
                <p>${expense.category}</p>
            </div>

           <div>
    <strong>₦${expense.amount.toLocaleString()}</strong>
    <button onclick="deleteExpense(${expense.id})">🗑️</button>
          </div>
        `;

        item.style.display = "flex";
        item.style.justifyContent = "space-between";
        item.style.alignItems = "center";
        item.style.padding = "15px 0";
        item.style.borderBottom = "1px solid #eee";

        expenseList.appendChild(item);
    });
}

function updateTotal() {
    const total = expenses.reduce(function(sum, expense) {
        return sum + expense.amount;
    }, 0);

    document.getElementById("total").textContent =
        `₦${total.toLocaleString()}.00`;
}
function deleteExpense(id) {
    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    updateTotal();

    displayExpenses();
    updateTotal();
}
