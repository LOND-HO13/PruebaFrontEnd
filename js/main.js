// main.js

// Placeholder for tasks array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to display tasks on the home page
function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task.name}</span>
            <button onclick="viewTask(${index})">Ver</button>
            <button style="background-color:red" onclick="deleteTask(${index})">Borrar</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Function to create a new task
function createTask() {
    const name = document.getElementById('task-name').value;
    const desc = document.getElementById('task-desc').value;
    const date = document.getElementById('task-date').value;

    const newTask = { name, desc, date };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    window.location.href = '../html/index.html';
}

// Function to view and edit a task's details
function viewTask(index) {
    const task = tasks[index];
    localStorage.setItem('currentTaskIndex', index);
    window.location.href = 'task-detail.html';
}

function loadTaskDetails() {
    const index = localStorage.getItem('currentTaskIndex');
    const task = tasks[index];

    document.getElementById('task-name').value = task.name;
    document.getElementById('task-desc').value = task.desc;
    document.getElementById('task-date').value = task.date;
}

function saveTaskDetails() {
    const index = localStorage.getItem('currentTaskIndex');

    tasks[index].name = document.getElementById('task-name').value;
    tasks[index].desc = document.getElementById('task-desc').value;
    tasks[index].date = document.getElementById('task-date').value;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.location.href = '../html/index.html';
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('task-list')) {
        displayTasks();
    } else if (document.getElementById('task-detail-form')) {
        loadTaskDetails();
    }
});

function goBack() {
    window.history.back();
}



