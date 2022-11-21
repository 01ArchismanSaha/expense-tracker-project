const form = document.getElementById('forgot-password-form');
const emailField = document.getElementById('email');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const email = emailField.value;
        console.log(email);
        await axios.post('http://localhost:4000/user/password/forgotpassword', {email: email});

    } catch (error) {
        console.log(error);
    }
})