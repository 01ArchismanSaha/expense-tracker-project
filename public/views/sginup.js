const myForm = document.getElementById('sign-up-form');

myForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await axios.post('http://localhost:4000/sign-up', 
        {
            name: name, 
            email: email, 
            password: password
        }
        );
        console.log('RESPONSE: ', res);
        if(res.status === 200){
            name = '';
            email = '';
            password = '';
        }
        
    } catch (error) {
        if(error.response.status === 403) {
            alert('User already exists!');
        }
        console.log(error);
    }
});