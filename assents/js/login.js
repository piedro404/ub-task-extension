const alertSpan = document.querySelector('.login__label.alert');
const button = document.querySelector('.login__label.btn .submit');

if(localStorage.getItem('username') !== '' && localStorage.getItem('password') !== ''){
    window.location.href = 'task.html';
}

const authenticatedRedirect = async (data,username, password) => {
    if (data['status']) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('name', data['name']);
        localStorage.setItem('task', '');

        window.location.href = 'task.html';
    } else {
        alertSpan.classList.add('active')
    }
}

const fetchAPI = async (username, password) => {
    try {
        // const APIResponse = await fetch(`http://127.0.0.1:8000/ub/perfil/${username}&${password}`);
        const APIResponse = await fetch(`https://ub-task-api.vercel.app/ub/perfil/${username}&${password}`);
        
        if (APIResponse.status == 200){
            const data = await APIResponse.json();
            return data;
        }
    } catch {
        return {'status':false};
    }
}

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    alertSpan.classList.remove('active')
    button.disabled = true
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    authenticatedRedirect(await fetchAPI(username, password),username, password);
    button.disabled = false
});