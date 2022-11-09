const myForm = document.getElementById('sign-up-form');

myForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await axios.post('http://localhost:4000/user/sign-up', 
        {
            name: name, 
            email: email, 
            password: password
        }
        );
        console.log('SIGN UP RESPONSE: ', res);
        if(res.status === 200){
            name = '';
            email = '';
            password = '';
            clearError();
        }
        
    } catch (error) {
        logErrorToUser(error);
        if(error.response.status === 400) {
            alert('User already exists!');
        }
        console.log(error);
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