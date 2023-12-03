const form = document.getElementById('form-registration')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordCheck = document.getElementById('password-check')
let inputsAreValid = false;

form.addEventListener('submit', async (e) => {
    inputsAreValid = true;
    e.preventDefault();
    checkInputs();

    if (inputsAreValid) {
        const emailValue = email.value.trim();
        const isEmailAvailable = await checkEmailAvailability(emailValue);

        if (!isEmailAvailable) {
            setErrorFor(email, 'Email is already registered!');
        } else {

            fetch('http://localhost:8080/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.value,
                    email: email.value,
                    password: password.value
                })
            })
                .then(() => {
                    console.log('New FantasyUser added');
                })
                .catch(error => {
                    console.error('Error', error);
                })
        }
    }
})

function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordCheckValue = passwordCheck.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be empty!');
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be empty!');
    } else if (!isValidEmail(emailValue)) {
        setErrorFor(email, 'Email is not valid!');
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be empty!');
    } else {
        setSuccess(password);
    }

    if (passwordCheckValue === '') {
        setErrorFor(passwordCheck, 'Repeat password cannot be empty!');
    } else if (passwordValue !== passwordCheckValue) {
        setErrorFor(passwordCheck, 'Passwords do not match!');
    } else {
        setSuccess(passwordCheck);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement.parentElement; // .form-control bg-dark text-light
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control bg-dark text-light error'
    inputsAreValid = false;
}

function setSuccess(input) {
    const formControl = input.parentElement.parentElement; // .form-control bg-dark text-light
    formControl.className = 'form-control bg-dark text-light';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function checkEmailAvailability(email) {
    try {
        const response = await fetch(`http://localhost:8080/api/user/check/${encodeURIComponent(email)}`);
        return response.status === 200; // Check if the response status is OK
    } catch (error) {
        console.error('Error checking email availability', error);
        return false; // Assume email is not registered in case of an error
    }
}

