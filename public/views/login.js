const myForm = document.getElementById('log-in-form');

myForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    // const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await axios.post('http://localhost:4000/user/login', 
        {
            email: email, 
            password: password
        }
        );
        console.log('LOGIN RESPONSE: ', res);
        if(res.status === 200) {
            clearError();
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