
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
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary d-flex justify-content-between align-items-center';

    // Sol taraf: checkbox + yazı
    const leftDiv = document.createElement('div');
    leftDiv.className = 'd-flex align-items-center';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'task-list me-2';

    // Checkbox'a olay dinleyici
    checkBox.addEventListener('change', function () {
        if (this.checked) {
            li.style.textDecoration = 'line-through';
        } else {
            li.style.textDecoration = 'none';
        }
    });

    const textNode = document.createTextNode(text);

    leftDiv.appendChild(checkBox);
    leftDiv.appendChild(textNode);

    // Sağ taraf: silme butonu
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'delete-item text-danger';
    a.innerHTML = '<i class="fas fa-times"></i>';

    // li içine ekle
    li.appendChild(leftDiv);
    li.appendChild(a);

    taskList.appendChild(li);
}





// function createItem(text) {
//     //Create li
//     const li = document.createElement('li');
//     li.className = 'list-group-item list-group-item-secondary d-flex justify-content-between align-items-center';
//     //inputtan aldigimiz degeri text ile li ye yazdik
//     li.appendChild(document.createTextNode(text));

//     //Create a
//     const a = document.createElement('a');
//     a.classList = 'delete-item text-danger';
//     a.setAttribute('href', '#');
//     a.innerHTML = '<i class="fas fa-times"></i>';

//     const checkBox = document.createElement('input');
//     checkBox.className = 'task-list';
//     checkBox.type = 'checkbox';
//     const div = document.createElement('div');
//     const div2 = document.createElement('div');
//     div.className = 'd-flex';

//     // Add a to li

//     div.appendChild(checkBox)
//     li.appendChild(div);
//     div2.appendChild(a)
//     li.appendChild(div2);
//     taskList.appendChild(li);
//     // Add li to ul

// }
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
        e.target.parentElement.parentElement.remove();

        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
    //e.preventDefault();
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
