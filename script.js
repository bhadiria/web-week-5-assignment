
// =====================================
// 1. STORE APPLICATION DATA
// =====================================

// Variables for the budget and expenses
let monthlyBudget = 0;
let expenses = [];
let totalExpenses = 0;
let remainingBalance = 0;


// =====================================
// 2. REUSABLE BUDGET FUNCTIONS
// =====================================

// Calculate the total of all expenses
function calculateTotalExpenses(expenseList) {
    let total = 0;

    for (let expense of expenseList) {
        total += expense.amount;
    }

    return total;
}

// Calculate the remaining budget
function calculateRemainingBalance(budget, expensesTotal) {
    return budget - expensesTotal;
}


// =====================================
// 3. COLLECT USER INPUT
// =====================================

// Ask the user for their monthly budget
let budgetInput = prompt(
    "Enter your monthly budget in KSh:"
);

if (budgetInput !== null && budgetInput.trim() !== "") {
    monthlyBudget = Number(budgetInput);
}

// Ask how many expenses the user wants to enter
let expenseCountInput = prompt(
    "How many expenses would you like to enter?"
);

let expenseCount = Number(expenseCountInput);

// Validate the budget and expense count
if (
    budgetInput === null ||
    budgetInput.trim() === "" ||
    !Number.isFinite(monthlyBudget) ||
    monthlyBudget < 0
) {
    console.log("Please enter a valid, non-negative budget.");
} else if (
    expenseCountInput === null ||
    expenseCountInput.trim() === "" ||
    !Number.isInteger(expenseCount) ||
    expenseCount < 0 ||
    expenseCount > 100
) {
    console.log("Please enter a whole number of expenses from 0 to 100.");
} else {

    // Collect the details of each expense
    for (let i = 0; i < expenseCount; i++) {
        let expenseName = prompt(
            `Enter the name of expense ${i + 1}:`
        );

        if (expenseName === null || expenseName.trim() === "") {
            console.log("Expense entry cancelled or name is empty.");
            continue;
        }

        let amountInput = prompt(
            `Enter the amount for ${expenseName} in KSh:`
        );

        if (
            amountInput === null ||
            amountInput.trim() === ""
        ) {
            console.log(`Skipped ${expenseName}: no amount entered.`);
            continue;
        }

        let expenseAmount = Number(amountInput);

        if (!Number.isFinite(expenseAmount) || expenseAmount < 0) {
            console.log(`Skipped ${expenseName}: invalid amount.`);
            continue;
        }

        // Store expense data as an object
        let expense = {
            name: expenseName.trim(),
            amount: expenseAmount
        };

        expenses.push(expense);
    }

    // =====================================
    // 4. PERFORM BUDGET CALCULATIONS
    // =====================================

    totalExpenses = calculateTotalExpenses(expenses);

    remainingBalance = calculateRemainingBalance(
        monthlyBudget,
        totalExpenses
    );

    // =====================================
    // 5. DISPLAY RESULTS IN THE CONSOLE
    // =====================================

    console.log("========== SPENDWISE BUDGET REPORT ==========");
    console.log("Monthly Budget: KSh " + monthlyBudget.toFixed(2));
    console.log("Number of Expenses: " + expenses.length);

    console.log("Expense Details:");

    for (let expense of expenses) {
        console.log(
            expense.name + ": KSh " + expense.amount.toFixed(2)
        );
    }

    console.log("Total Expenses: KSh " + totalExpenses.toFixed(2));
    console.log("Remaining Balance: KSh " + remainingBalance.toFixed(2));

    if (remainingBalance > 0) {
        console.log("Status: You are within your budget.");
    } else if (remainingBalance === 0) {
        console.log("Status: You have used your entire budget.");
    } else {
        console.log(
            "Status: You are over budget by KSh " +
            Math.abs(remainingBalance).toFixed(2)
        );
    }

    console.log("=============================================");
}
