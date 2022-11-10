const myForm = document.getElementById('log-in-form');

myForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    // const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    try {
        const res = await axios.post('http://localhost:4000/user/login', 
        {
            email: email.value, 
            password: password.value
        }
        );
        console.log('LOGIN RESPONSE: ', res);
        if(res.status === 200) {
            clearError();
            email.value = '';
            password.value = '';
            confirm('User logged in successfully!');
        }
        
    } catch (error) {
        console.log(error);
        logErrorToUser(error);
        if(error.response.status === 401) {
            alert('Password is incorrect!');
        }
    }
});

function logErrorToUser(error) {
    const err = document.getElementById('error-text');
    err.innerHTML = error.message;
};

function clearError() {
    const err = document.getElementById('error-text');
    err.innerHTML = '';
};