
const addIncomeFormHandler = async (event) => {

    event.preventDefault();

    // user inputs
    const incomeName = document.querySelector('#income-name').value.trim();
    const incomeAmount = document.querySelector('#income-amount').value.trim();

    if (incomeName && incomeAmount) {

        console.log('name: ' + incomeName);
        console.log('amount: ' + incomeAmount);

        window.alert('Income input recieved!')

        // makes fetch request to user api (category id will be assigned in routes)
        // const response = await fetch('/api/income', {
        //     method: 'POST',
        //     body: JSON.stringify({ incomeName, incomeAmount }),
        //     headers: { 'Content-Type': 'application/json'},
        // });

        // if (response.ok) {
        //     document.location.reload();
        // } else {
        //     window.alert(response.statusText);
        // }
    }

};

const addExpenseFormHandler = async (event) => {

    // user inputs
    const expenseName = document.querySelector('#expense-name').value.trim();
    const expenseAmount = document.querySelector('#expense-amount').value.trim()
    const categoryId = document.querySelector('#expense-category').value.trim()

    if (expenseName && expenseAmount && categoryId) {

        console.log('name: ' + expenseName);
        console.log('amount: ' + expenseAmount);
        console.log('category_id: ' + categoryId);

        window.alert('Expense input recieved!')

        // makes fetch request to user api
        // const response = await fetch('/api/expense', {
        //     method: 'POST',
        //     body: JSON.stringify({ expenseName, expenseAmount, categoryId }),
        //     headers: { 'Content-Type': 'application/json'},
        // });

        // if (response.ok) {
        //     document.location.reload();
        // } else {
        //     window.alert(response.statusText);
        // }
    }

};

// Add income button event listener
document.querySelector('#submit-income').addEventListener('click', addIncomeFormHandler);
// Add expense button event listener
document.querySelector('#submit-expense').addEventListener('click', addExpenseFormHandler);