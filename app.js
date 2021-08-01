//selecters
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector('.todo-btn')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//event-lisener
//localStorage.clear();
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click',filterTodo);
document.addEventListener("DOMContentLoaded",getTodos);


//defoult calls
//getTodos();
//functions

function addToDo(event){
    //prevent refrech the page
    event.preventDefault();
    addingElement(todoInput.value)
    todoInput.value='';
    
}

function addingElement(valuee){
   
  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");
  const newTodo = document.createElement('li');
  newTodo.innerText = valuee;  
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //store the value in locale storege
  saveToLocaleStorege(todoInput.value); 
  //chek mark btn
  const completedBtn = document.createElement('button');
  completedBtn.innerHTML= '<i class="fas fa-check"></i>';
  completedBtn.classList.add("complete-btn");
  todoDiv.appendChild(completedBtn);
  //chek tresh btn
  const trashBtn = document.createElement('button');
  trashBtn.innerHTML= '<i class="fas fa-trash"></i>';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);
  //append to list
  todoList.appendChild(todoDiv);
}

function deleteCheck (e){
    const item = e.target;
    //delete the to do
    if (item.classList[0]==="trash-btn") {
        const toRemove = item.parentElement;
        toRemove.classList.add("fall");
        removeFromLocalStorege(toRemove);
        toRemove.addEventListener("transitionend",function(){
            toRemove.remove();
            
        })
    }

    //check mark
    if (item.classList[0]==="complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

  

}

function filterTodo(e) {
  const todos = todoList.childNodes;


  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
      break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      break;
    }
  });
}

function saveToLocaleStorege(todo){

  let todos;

  if(localStorage.getItem('todos')===null){
    todos=[];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){
  console.log("traing to lowd")
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //<----------------------------------------------------------------
  todos.forEach(function(todo){
    addingElement(todo)
  });
  
}

function removeFromLocalStorege(todo){

  if(localStorage.getItem('todos')===null){
    todos=[];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //geting the inner text of the div element
  const todoIndex = todo.children[0].innerText;
  //remova one element after todo index
  todos.splice(todos.indexOf(todoIndex),1); 
  localStorage.setItem('todos',JSON.stringify(todos))
  //console.log(todo.children[0].innerText);
  
}