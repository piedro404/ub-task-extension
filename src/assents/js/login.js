const alertSpan = document.querySelector('.login__label.alert');
const button = document.querySelector('.login__label.btn .submit');

if (localStorage.getItem('login') && localStorage.getItem('password')) {
    window.location.href = 'task.html';
}

const authenticatedRedirect = async (data, login, password) => {
    if (data['status']) {
        localStorage.setItem('login', login);
        localStorage.setItem('password', password);
        localStorage.setItem('name', data['profile']['name']);
        localStorage.setItem('tasks', '');

        console.log(data)
        window.location.href = 'task.html';
    } else {
        alertSpan.classList.add('active');
    }
};

const fetchAPI = async (login, password) => {
    try {
        // const url = 'http://127.0.0.1:3000/ub/profile';
        const url = 'https://ub-task-api.vercel.app/ub/profile';
        const credentials = { login: login, password: password };

        const APIResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (APIResponse.status === 200) {
            const data = await APIResponse.json();
            return data;
        } else {
            return { status: false };
        }
    } catch (error) {
        console.log('Erro:', error);
        return { status: false };
    }
};

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    alertSpan.classList.remove('active');
    button.disabled = true;

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    authenticatedRedirect(await fetchAPI(login, password), login, password);

    button.disabled = false;
});
