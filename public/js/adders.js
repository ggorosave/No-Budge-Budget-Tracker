const addTransactionFormHandler = async (event) => {

    event.preventDefault();

    // user inputs
    const item_name = document.querySelector('#transaction-name').value.trim();
    const amount = document.querySelector('#transaction-amount').value.trim()
    const transaction_date = dateGetter();
    const category_id = document.querySelector('#transaction-category').value.trim()

    if (item_name && amount && category_id) {

        // makes fetch request to user api
        const response = await fetch('/api/transactions', {
            method: 'POST',
            body: JSON.stringify({ item_name, amount, transaction_date, category_id }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.reload();
        } else {
            window.alert(response.statusText);
        }
    }

};

const addCategoryFormHandler = async (event) => {

    event.preventDefault();

    // user input
    const category_name = document.querySelector('#category-name').value.trim();

    if (category_name) {

        // makes fetch request to user api
        const response = await fetch('/api/categories', {
            method: 'POST',
            body: JSON.stringify({ category_name }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.reload();
        } else {
            window.alert(response.statusText);
        }

    };

};

const dateGetter = () => {
    const today = new Date();

    return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
};

// Add transaction button event listener
document.querySelector('#submit-transaction').addEventListener('click', addTransactionFormHandler);
// Add category button event listener
document.querySelector('#submit-category').addEventListener('click', addCategoryFormHandler);