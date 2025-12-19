'use strict';

const userInput = document.getElementById('user-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

let tasks = [];

/* ===== LocalStorage helpers ===== */
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (!storedTasks) return;

    tasks = JSON.parse(storedTasks);
}

/* ===== Small helpers (refactor) ===== */
function syncUI() {
    saveTasks();
    renderTasks();
}

function getTaskId(event) {
    return Number(event.currentTarget.dataset.id);
}

/* ===== Render ===== */
function renderTasks() {
    taskList.innerHTML = '';

    for (const task of tasks) {
        const newListEl = document.createElement('li');
        newListEl.textContent = task.text;
        newListEl.dataset.id = task.id;

        if (task.done) {
            newListEl.classList.add('done');
        }

        // Toggle done
        newListEl.addEventListener('click', function (event) {
            const id = getTaskId(event);
            const currentTask = tasks.find(task => task.id === id);
            if (!currentTask) return;

            currentTask.done = !currentTask.done;
            syncUI();
        });

        // Delete on right-click
        newListEl.addEventListener('contextmenu', function (event) {
            event.preventDefault();

            const shouldDelete = confirm('r u sure?');
            if (!shouldDelete) return;

            const id = getTaskId(event);
            tasks = tasks.filter(task => task.id !== id);

            syncUI();
        });

        taskList.appendChild(newListEl);
    }
}

/* ===== Init ===== */
loadTasks();
renderTasks();

/* ===== Events ===== */

// Add task by button
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
    syncUI();

    userInput.value = '';
});

// Add task by Enter
userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTaskButton.click();
    }
});