
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
var items;




events();
loadItems();

function events() {
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', deleteItem);
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
        items = [];
    }
    else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text) {
    items = getItemFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLS(text) {
    items = getItemFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1)
        }
        localStorage.setItem('items', JSON.stringify(items));
    })
}

function createItem(text) {
    //Create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary d-flex justify-content-between align-items-center';
    //inputtan aldigimiz degeri text ile li ye yazdik
    li.appendChild(document.createTextNode(text));

    //Create a
    const a = document.createElement('a');
    a.classList = 'delete-item text-danger';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    const div = document.createElement('div');
    div.className = 'd-flex align-items-center';
    div.innerHTML = 'Yapildi <input type="checkbox" class="me-3 ms-3"></input>';


    div.appendChild(a)
    // Add a to li
    li.appendChild(div);
    // Add li to ul
    taskList.appendChild(li);
}
// Add new item
function addNewItem(e) {

    if (input.value === '') {
        alert('Bir seyler yaz.');
    }
    else {

        createItem(input.value);
        //clear input

        setItemToLS(input.value);
        input.value = '';

        e.preventDefault();
    }

}
//Delete an item
function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.parentElement.remove();

        deleteItemFromLS(e.target.parentElement.parentElement.parentElement.textContent);
    }
}
//Delete all items
function deleteAllItems(e) {

    //En kisa yol
    //taskList.innerHTML = '';

    if (confirm('Bu İşlemi Yapmak İstediğinize Emin Misiniz ?')) {

        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}
