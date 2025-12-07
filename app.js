'use strict';

const userInput = document.getElementById('user-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// Добавление таска в лист по нажатию кнопки
addTaskButton.addEventListener('click', function() {
    const inputText = userInput.value.trim();
    
    if (inputText === '') {
        console.log('empty string');
        return;
    }

    const newListEl = document.createElement('li');

    // Помечаем таск выполненным
    newListEl.addEventListener('click', function() {
        newListEl.classList.toggle('done');
    });

    // Удаляем таск
    newListEl.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const shouldDelete = confirm('r u sure?');
        if (shouldDelete === false) {
            return;
        }
        newListEl.remove();
    })
    
    newListEl.textContent = inputText;
    taskList.appendChild(newListEl);
    userInput.value = '';
});

// Добавление таска в лист по нажатию Enter
userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTaskButton.click();
    }
});