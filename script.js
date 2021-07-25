//selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const doneList = document.querySelector('.done-list');
const darkmode = document.querySelector('.dark-mode');
// const filterOption = document.querySelector(".filter-todo");

//event listener
// document.addEventListener("DOMContentLoaded",getDone);
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
darkmode.addEventListener('click',darkmodeAdd);


function darkmodeAdd(e){
    e.preventDefault();
    let element = document.body;
    element.classList.toggle("dark-mode");
}

//Function

function addTodo(event) {

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    if (todoInput.value === "") {
        alert("task cannot be empty")
    } else {
        //Todo DIV
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todoInput.value;
        newTodo.classList.add('todo-item');

        //Create Li
        todoDiv.appendChild(newTodo);
        //ADD TODO TO LOCALSTORAGE
        saveLocalTodos(todoInput.value);
        event.preventDefault();
    }

    // Check Mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    //Check Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    todoDiv.appendChild(completeButton);
    todoDiv.appendChild(trashButton);

    //Append
    todoList.prepend(todoDiv);
    //clear Todo input value   
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        removeLocalTodos(todo);
        todo.remove();
    }

    else if (item.classList[0] === 'complete-btn') {
        const doneitem = item.parentElement;

        doneitem.classList.replace('todo','done-item')
        removeLocalTodos(doneitem)
        saveLocalDone(doneitem.firstElementChild)
        doneitem.remove();
        // doneitem => doneList
        doneList.prepend(doneitem.firstElementChild)
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");    
        doneList.appendChild(trashButton);
    }
}



function saveLocalTodos(todo) {
    //CHECK
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
}

function saveLocalDone(doneitem) {
    let dones;
    // if don't have locoal storage = create an array
    if (localStorage.getItem('dones') === null) {
        dones = [];
    }
    // if have locoal storage = reload it
    else {
        dones = JSON.parse(localStorage.getItem('dones'))
    }
    dones.push(doneitem.innerText)
    localStorage.setItem('dones', JSON.stringify(dones))
}



function getTodos() {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let dones;
    if (localStorage.getItem('dones') === null) {
        dones = [];
    }
    else {
        dones = JSON.parse(localStorage.getItem('dones'))
    }
    todos.forEach(function (todo) {
        // create todo div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        // create li

        const listTodo = document.createElement('li')
        listTodo.innerText = todo
        listTodo.classList.add('todo-item')
        // list => todo div
        todoDiv.appendChild(listTodo)

        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("complete-btn");

        todoDiv.appendChild(completeButton)

        //Check Mark button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");

        todoDiv.appendChild(trashButton)

        //Append
        todoList.prepend(todoDiv);

    })
    dones.forEach(function (done){
        const doneDiv = document.createElement('div')
        doneDiv.classList.add('done')

        // create li
    
        const listDone = document.createElement('li')
        listDone.innerHTML = done
        listDone.classList.add('todo-item')
        // list => todo div
        doneList.prepend(listDone)
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocalDone(doneitem) {
    let dones;
    if (localStorage.getItem('dones') === null) {
        dones = [];
    }
    else {
        dones = JSON.parse(localStorage.getItem('dones'))
    }
    dones.push(doneitem.innerText)
    localStorage.setItem('dones', JSON.stringify(dones))
}

