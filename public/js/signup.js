
const signUpFormHandler = async (event) => {
    
    event.preventDefault();

    // user inputs
    const name = document.querySelector('#signup-name').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    // checks that user input all fields
    if (name && email && password) {

        // console.log('name: ' + name)
        // console.log('email: ' + email)
        // console.log('password: ' + password)

        // makes fetch request to user api (may change depending on routes)
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json'},
        });
        
        // sends user to the manage-transaction page if sign up was successful
        if (response.ok) {
            document.location.replace('/manage-transactions');
        } else {
            window.alert(response.statusText);
        }
    }

}

document.querySelector('#submit-button').addEventListener('click', signUpFormHandler);