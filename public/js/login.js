
const loginFormHandler = async (event) => {
    event.preventDefault();

    // user inputs
    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    // if the user has entered an email and password
    if (email && password) {     

        // sends a fetch request to the user api (may change depending on routes)
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        // if the response is ok, send user to the manage-transactions page
        if (response.ok) {

            document.location.replace('/manage-transactions')
        } else {

            // if response is bad, send status in an alert
            window.alert(response.statusText);
        }
    }

};

document.querySelector('#submit-button').addEventListener('click', loginFormHandler);