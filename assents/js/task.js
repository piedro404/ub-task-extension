const logout = document.getElementById("logout");
const user = document.querySelector('.hi');
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


if(!(localStorage.getItem('username') && localStorage.getItem('password'))){
    window.location.href = 'index.html';
}

user.innerHTML=localStorage.getItem('name').split(' ')[0];

const fetchAPI = async (username, password) => {
    try {
        // const APIResponse = await fetch(`http://127.0.0.1:8000/ub/atv/${username}&${password}`);
        const APIResponse = await fetch(`https://ub-task-api.vercel.app/ub/atv/${username}&${password}`);
        
        if (APIResponse.status == 200){
            const data = await APIResponse.json();
            return data;
        }
    } catch {
        return {'status':false};
    }
}

const renderTasks = (data) => {
    try {
        tasks.innerHTML = '';
        data['list'].forEach(task => {
            const card = document.createElement('div');
            card.classList.add("task");
    
            const randomIndex = Math.floor(Math.random() * colors.length);
            const randomColor = colors[randomIndex];
    
            const taskCard = `
                <h2>${task['day_week']}, ${task['date']}</h2>
                <div class="row">
                    <div class="time">
                        <span>${task['time_limit']}</span>
                        <img src="assents/image/monologo.svg" alt="task" style="--clr:${randomColor};">
                    </div>
                    <div class="info">
                        <h4><a href="${task['link_atv']}" target="_blank">${task['name']}</a></h4>
                        <span>${task['mat']}</span>
                    </div>
                </div>
                <div class="view">
                    <a href="${task['link_atv']}" class="btnView" target="_blank">Ver Atividade</a>
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
        description.innerHTML = data['description'];
        localStorage.setItem('task', JSON.stringify(data));
        if(data['atv']){
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
    const data = await fetchAPI(localStorage.getItem('username'), localStorage.getItem('password'));

    setTasks(data);
}

if(localStorage.getItem('task') !== ''){
    setTasks(JSON.parse(localStorage.getItem('task')));
}  
else {
    getTasks();
}

const logoutBtn = () => {
    localStorage.setItem('username', '');
    localStorage.setItem('password', '');
    localStorage.setItem('name', '');
    localStorage.setItem('task', '');

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



