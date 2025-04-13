const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items = [];

events();
loadItems();

function events() {
    form.addEventListener('submit', addNewItem);
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {
    items = getItemFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}

function getItemFromLS() {
    if (localStorage.getItem('items') === null) {
        return [];
    }
    return JSON.parse(localStorage.getItem('items'));
}

function setItemToLS(item) {
    items.push(item);
    updateLS();
}

function updateLS() {
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLS(text) {
    items = items.filter(item => item.text !== text);
    updateLS();
}

function createItem(item) {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary d-flex justify-content-between align-items-center';

    const leftDiv = document.createElement('div');
    leftDiv.className = 'd-flex align-items-center';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'task-list me-2';

    if (item.completed) {
        checkBox.checked = true;
        li.style.textDecoration = 'line-through';
    }

    checkBox.addEventListener('change', function () {
        item.completed = this.checked;
        li.style.textDecoration = this.checked ? 'line-through' : 'none';
        updateLS();
    });

    const textNode = document.createTextNode(item.text);
    leftDiv.appendChild(checkBox);
    leftDiv.appendChild(textNode);

    const a = document.createElement('a');
    a.href = '#';
    a.className = 'delete-item text-danger';
    a.innerHTML = '<i class="fas fa-times"></i>';

    a.addEventListener('click', function (e) {
        e.preventDefault();
        li.remove();
        deleteItemFromLS(item.text);
    });

    li.appendChild(leftDiv);
    li.appendChild(a);
    taskList.appendChild(li);
}

function addNewItem(e) {
    e.preventDefault();
    if (input.value === '') {
        alert('Bir şeyler yaz.');
        return;
    }
    const newItem = { text: input.value, completed: false };
    createItem(newItem);
    setItemToLS(newItem);
    input.value = '';
}

function deleteAllItems(e) {
    e.preventDefault();
    if (confirm('Hepsini silmek istediğine emin misin?')) {
        taskList.innerHTML = '';
        localStorage.removeItem('items');
        items = [];
    }
}
