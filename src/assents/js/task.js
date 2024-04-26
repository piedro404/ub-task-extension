const logout = document.getElementById("logout");
const user = document.querySelector('.hi');
const img_user = document.getElementById('img_user');
const reload = document.getElementById("reload");
const description = document.querySelector('.description');
const tasks = document.querySelector('.tasks');

const colors = [
    '#FDDFDF',
    '#DEFDE0',
    '#FCF7DE',
    '#DEF3FD',
    '#f4e7da',
    '#fceaff',
    '#98d7a5',
    '#f8d5a3',
    '#97b3e6',
    '#eaeda1',
    '#F5F5F5',
    '#E6E0D4',
    '#F5F5F5',
    '#FFDAB9',
    '#FFA07A',
    '#87CEEB',
    '#00FF7F',
    '#FF69B4',
    '#FFC0CB',
    '#E6E6FA',
    '#00FFFF',
    '#FFA500',
    '#1E90FF',
    '#FF4500',
    '#B0E0E6',
    '#00BFFF',
    '#FFEFD5',
    '#9932CC',
    '#D8BFD8',
    '#1E90FF',
    '#FF6347',
    '#FFB6C1',
    '#4682B4',
    '#FF0000',
    '#BC8F8F',
    '#4169E1',
    '#B22222',
    '#F5DEB3',
    '#0000FF',
    '#A52A2A',
    '#FFFACD',
    '#0000CD',
    '#8B0000',
    '#8B4513',
    '#FFFFE0',
    '#000080',
    '#800000',
    '#D2691E',
    '#FFF8DC',
    '#000080',
    '#808000',
    '#800080',
    '#FFFAF0',
    '#008080',
    '#C71585',
    '#FDF5E6',
    '#008000',
    '#DB7093',
    '#F0FFF0',
    '#006400',
    '#FFFAFA',
    '#F5FFFA',
    '#F0FFFF',
    '#FFFFF0',
    '#F0F8FF',
    '#FFF0F5'
];


if(!(localStorage.getItem('login') && localStorage.getItem('password'))){
    window.location.href = 'index.html';
} 
else {
    img_user.innerHTML = "<img src = ' " + localStorage.getItem('user_picture') + " '>";
    user.innerHTML=localStorage.getItem('name').split(' ')[0];
}

const fetchAPI = async (login, password) => {
    try {
        // const url = 'http://127.0.0.1:3000/ub/task';
        const url = 'https://ub-task-api.vercel.app/ub/task';
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

const renderTasks = (data) => {
    try {
        tasks.innerHTML = '';
        data['tasks']['list_tasks'].forEach(task => {
            const card = document.createElement('div');
            card.classList.add("task");
    
            const randomIndex = Math.floor(Math.random() * colors.length);
            const randomColor = colors[randomIndex];
    
            const taskCard = `
                <h2>${task['day_week']}, ${task['date']}</h2>
                <div class="row">
                    <div class="time">
                        <span>${task['time_limit']}</span>
                        <img src="../image/monologo.svg" alt="task" style="--clr:${randomColor};">
                    </div>
                    <div class="info">
                        <h4><a href="${task['url_task']}" target="_blank">${task['task_name']}</a></h4>
                        <span>${task['matter']}</span>
                    </div>
                </div>
                <div class="view">
                    <a href="${task['url_task']}" class="btnView" target="_blank">Ver Atividade</a>
                </div>
                `
    
            card.innerHTML = taskCard;
            tasks.appendChild(card);
        });
    }
    catch {
        // description.innerHTML = "Erro - Tentando Novamente!";
        getTasks();
    }
}

const setTasks = (data) => {
    if(data['status']){
        description.innerHTML = data['tasks']['description'];
        localStorage.setItem('tasks', JSON.stringify(data));
        if(data['tasks']['find_task']){
            renderTasks(data);
        }
        else{
            tasks.innerHTML = '';
        }
    }
    else {
        // description.innerHTML = "Tente Novamente!";
        getTasks();
    }
}

const getTasks = async () => {
    const data = await fetchAPI(localStorage.getItem('login'), localStorage.getItem('password'));

    setTasks(data);
}

if(localStorage.getItem('tasks') !== ''){
    setTasks(JSON.parse(localStorage.getItem('tasks')));
}  
else {
    getTasks();
}

const logoutBtn = () => {
    localStorage.setItem('username', '');
    localStorage.setItem('password', '');
    localStorage.setItem('name', '');
    localStorage.setItem('tasks', '');

    window.location.href = 'index.html';
}

logout.addEventListener('click', function(){
    logoutBtn();
})

reload.addEventListener('click', async function(){
    reload.disabled = true;
    description.innerHTML = "Carregando!";
    await getTasks();
    reload.disabled = false;
})
