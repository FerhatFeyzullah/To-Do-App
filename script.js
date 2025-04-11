
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');




events();
function events() {
    form.addEventListener('submit', addNewItem)
}

function addNewItem(e) {

    if (input.value === '') {
        alert('Bir seyler yaz.');
    }
    else {
        //Create li
        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary d-flex justify-content-between align-items-center';
        li.appendChild(document.createTextNode(input.value));

        //Create a
        const a = document.createElement('a');
        a.classList = 'delete-item text-danger';
        a.setAttribute('href', '#');
        a.innerHTML = '<i class="fas fa-times"></i>'

        // Add a to li
        li.appendChild(a);
        // Add li to ul
        taskList.appendChild(li);

        //clear input
        input.value = '';

        e.preventDefault();
    }


}