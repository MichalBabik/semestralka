
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-sign-in')
    const emailSignIn = document.getElementById('sign-email')
    const passwordSignIn = document.getElementById('sign-password')

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = emailSignIn.value.trim();
        const password = passwordSignIn.value.trim();

        try {
            const response = await authenticateUser(email, password);

            if (response.status === 200) {
                //user is logged in
                const user = response.body;
                // Store user information in localStorage or wherever you need it
                console.log('User logged in:', user);

                // Update UI or perform other actions as needed
            } else if (response.status === 404) {
                // Handle not found (user not registered), wrong email
                console.error('User not found');
            } else if (response.status === 406) {
                // Handle not acceptable (wrong password)
                console.error('Wrong password');
            } else {
                // Handle other error cases
                console.error('Authentication failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    });
});

async function authenticateUser(email, password) {
    try {
        const response = await fetch(
            `http://localhost:8080/api/user/authentication/${encodeURIComponent(email)}/${encodeURIComponent(password)}`,
            { redirect: 'manual' }
        );

        if (!response.ok) {
            throw new Error(`Authentication failed with status: ${response.status}`);
        }

        const user = await response.json();
        return { status: response.status, body: user };
    } catch (error) {
        console.error('Error during authentication:', error.message);
        throw error;
    }
}