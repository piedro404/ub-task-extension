document.cookie="__Host-name=value; Secure; Path=/; SameSite=None; Partitioned;"

const logout = document.getElementById("logout");
const user = document.getElementById('user_name');
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

const replaceStringElements = (my_string) => {
    new_string = my_string.replace(/<[^>]*>?/g, '')
    return new_string;
}

if(!(localStorage.getItem('login') && localStorage.getItem('password'))){
    window.location.href = 'index.html';
} 
else {
    img_user.src = replaceStringElements(localStorage.getItem('user_picture'))
    user.textContent = replaceStringElements(localStorage.getItem('name').split(' ')[0] + " " +localStorage.getItem('name').split(' ')[1]);
}

// console.log(replaceStringElements())

const fetchAPI = async (login, password) => {
    try {
        // const url = 'http://127.0.0.1:3000/ub/task';
        const url = 'https://ub-task-api.vercel.app/ub/task';
        const credentials = { login: login, password: password };

        const APIResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'SameSite': 'None', 
                'Secure': true 
            },
            body: JSON.stringify(credentials),
            credentials: 'omit'
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

const createTaskElement = (task) => {
    const randomColor = colors[parseInt(Math.floor(Math.random() * colors.length))];

    const card = document.createElement('div');
    card.classList.add("task");

    const h2 = document.createElement('h2');
    h2.textContent = replaceStringElements(`${task['day_week']}, ${task['date']}`);

    const rowDiv = document.createElement('div');
    rowDiv.classList.add("row");

    const timeDiv = document.createElement('div');
    timeDiv.classList.add("time");

    const timeSpan = document.createElement('span');
    timeSpan.textContent = replaceStringElements(task['time_limit']);

    const img = document.createElement('img');
    img.src = replaceStringElements("../image/monologo.svg");
    img.alt = replaceStringElements("task");
    img.style.setProperty('--clr', randomColor);

    const infoDiv = document.createElement('div');
    infoDiv.classList.add("info");

    const h4 = document.createElement('h4');
    const a = document.createElement('a');
    a.href = replaceStringElements(task['url_task']);
    a.target = replaceStringElements("_blank");
    a.textContent = replaceStringElements(task['task_name']);
    h4.appendChild(a);

    const matterSpan = document.createElement('span');
    matterSpan.textContent = replaceStringElements(task['matter']);

    const viewDiv = document.createElement('div');
    viewDiv.classList.add("view");

    const viewA = document.createElement('a');
    viewA.href = replaceStringElements(task['url_task']);
    viewA.classList.add("btnView");
    viewA.target = replaceStringElements("_blank");
    viewA.textContent = replaceStringElements("Ver Atividade");

    timeDiv.appendChild(timeSpan);
    timeDiv.appendChild(img);
    infoDiv.appendChild(h4);
    infoDiv.appendChild(matterSpan);
    rowDiv.appendChild(timeDiv);
    rowDiv.appendChild(infoDiv);
    viewDiv.appendChild(viewA);
    card.appendChild(h2);
    card.appendChild(rowDiv);
    card.appendChild(viewDiv);

    return card;
}

const renderTasks = (data) => {
    try {
        tasks.textContent = '';
        data['tasks']['list_tasks'].forEach(task => {
            tasks.appendChild(createTaskElement(task));
        });
    }
    catch {
        getTasks();
    }
}

const setTasks = (data) => {
    if(data['status']){
        description.textContent = replaceStringElements(data['tasks']['description']);
        localStorage.setItem('tasks', JSON.stringify(data));
        if(data['tasks']['find_task']){
            renderTasks(data);
        }
        else{
            tasks.textContent = '';
        }
    }
    else {
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
    localStorage.setItem('name', '');
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
    description.textContent = replaceStringElements("Carregando!");
    await getTasks();
    reload.disabled = false;
})
