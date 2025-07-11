let currentEditElemen = null;

document.addEventListener('DOMContentLoaded', ()=>{
    loadTaskFromLocalStorage();
})

function loadTaskFromLocalStorage() {
    let task = JSON.parse(localStorage.getItem('task')) || [];
    task.forEach(task=>{
        const li = createTaskElement(task);
        document.getElementById('todo-list').appendChild(li);
    })
}

function createTaskElement(task) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.onclick = ()=> openModal(li,span);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delate-btn');
    deleteBtn.onclick = () => {
        li.remove();
        deleteTaskFromLocalStorage(task);
    }

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttons);

    return li;
}

function openModal(li, span) {
    currentEditElemen = {li,span};
    document.getElementById('task-input').value = span.textContent;
    document.getElementById('edit-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const task = taskInput.value.trim();
    if (task) {
        const li = createTaskElement(task);
        document.getElementById('todo-list').appendChild(li);
        saveTaskToLocalStorage(task);
        taskInput.value = '';
    }
}

function saveTask() {
    const editTask = document.getElementById('task-input').value.trim();
    if (editTask) {
        const originalTask = currentEditElemen.span.textContent;
        currentEditElemen.span.textContent = editTask;
        updateTaskInLocalStorage(originalTask,editTask);
        closeModal();
    }
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('task')) || [];
    tasks.push(task);
    localStorage.setItem('task', JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('task')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('task', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(originalTask, editTask) {
    let tasks = JSON.parse(localStorage.getItem('task')) || [];
    const taskIndex = tasks.indexOf(originalTask);
    if (taskIndex > -1) {
        tasks[taskIndex] = editTask
    }
    localStorage.setItem('task', JSON.stringify(tasks));
}

document.getElementById('save-modal').addEventListener('click', saveTask)
document.getElementById('cancel-modal').addEventListener('click', closeModal)