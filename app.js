'use strict';

const userInput = document.getElementById('user-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';
    for (const task of tasks) {
        const newListEl = document.createElement('li');
        newListEl.textContent = task.text;
        newListEl.dataset.id = task.id;

        if (task.done) {
            newListEl.classList.add('done');
        };

        // Помечаем таск выполненным
        newListEl.addEventListener('click', function (event) {
            const currentTask = tasks.find(task => task.id === Number(event.currentTarget.dataset.id));
            if (currentTask === undefined) {
                return;
            }
            currentTask.done = !currentTask.done;
            renderTasks();
        });

        // Удаляем таск
        newListEl.addEventListener('contextmenu', function (event) {
            event.preventDefault();

            const shouldDelete = confirm('r u sure?');
            if (!shouldDelete) return;

            const idToDelete = Number(event.currentTarget.dataset.id);
            tasks = tasks.filter(task => task.id !== idToDelete);

            renderTasks();
        });


        taskList.appendChild(newListEl);
    };
};

// Добавление таска в лист по нажатию кнопки
addTaskButton.addEventListener('click', function () {
    const inputText = userInput.value.trim();

    if (inputText === '') {
        console.log('empty string');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: inputText,
        done: false
    };
    tasks.push(newTask);

    renderTasks();

    userInput.value = '';
});

// Добавление таска в лист по нажатию Enter
userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTaskButton.click();
    }
});