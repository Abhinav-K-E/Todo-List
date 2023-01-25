const form = document.getElementById("form");
const input = document.getElementById("input");
const todoUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem('todos')) ;

if(todos){
    todos.forEach((todo)=>{
        addTodo(todo)     // displaying localstorage todo into our screen
    })
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    addTodo()
})

function addTodo(todo){
    let todoText = input.value;

    if(todo){
        todoText = todo.text

    }

    if(todoText){
        const todoLi = document.createElement('li');

        if(todo && todo.completed){
            todoLi.classList.add('completed'); // mark as completed
        }

        todoLi.innerHTML = todoText;

        // for completed todo

        todoLi.addEventListener('click', () =>{
            todoLi.classList.toggle("completed")

            updateLS() // when mark complete also update localstorage
        })

        // to remove --> right click

        todoLi.addEventListener('contextmenu', (e)=>{
            e.preventDefault()

            todoLi.remove()

            updateLS()
        })

        todoUL.appendChild(todoLi);

        input.value = '';

        // last part to update localstorage

        updateLS()
    }
}


// add item into local storage

function updateLS(){
    todosEle = document.querySelectorAll('li')

    const todos = []

    todosEle.forEach( (todoLi) => {
        todos.push({
            text : todoLi.innerHTML,
            completed : todoLi.classList.contains('completed')
        })
    })

    localStorage.setItem('todos' , JSON.stringify(todos)) // to store all todos in local storage
}
