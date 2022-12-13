let listData = [];
let countId = 0;

const addList = () => {
    const listInput = document.querySelector('#list-add');
    
    if (listInput.value == '') {
        alert('Input is empty');
    } else {
        addListDatas(listInput);
        renderLists();
        listInput.value = '';
    }
}

const addListDatas = (listInput) => {
    let lists = {
        listText: listInput.value,
        id: countId++,
        editList: false,
        todos: [],
        displayTodos: false
    }
    listData.push(lists);
}

const renderLists = () => {
    const todoTasks = document.querySelector('.todo-tasks');
    todoTasks.innerHTML = '';
    
    listData.forEach(lists => {
        const { id, listText, editStatus, todos, displayTodos } = lists;
        
        //create list divs
        const todoBox = document.createElement('div');
        todoBox.classList.add('todo-box');
        todoBox.id = `${id}`;
        const listContent = document.createElement('div');
        listContent.classList.add('list-text');
        listContent.textContent = `${listText}`;
        const listOperation = document.createElement('div');
        listOperation.classList.add('list-operation');
        const addTodoContainer = document.createElement('div');
        addTodoContainer.classList.add('add-todo-container');
        const todosListContainer = document.createElement('div');
        todosListContainer.classList.add('todos-list-container');
        
        //craete inside list operation
        const deleteListBtn = document.createElement('button');
        deleteListBtn.classList.add('delete-list');
        deleteListBtn.className += ' list-action-btn';
        deleteListBtn.textContent = 'Delete';
        
        const editListBtn = document.createElement('button');
        editListBtn.classList.add('edit-todo');
        editListBtn.className += ' list-action-btn';
        editListBtn.textContent = 'Edit';
        
        //create inside todo list container
        const todoListTitle = document.createElement('div');
        todoListTitle.classList.add('todo-list-title');
        todoListTitle.textContent = 'Todos';
        const todoUl = document.createElement('ul');
        todoUl.classList.add('todos-list');
        todoUl.id = `${id}`;
        const downArrow = document.createElement('div');
        downArrow.classList.add('todo-arrow');
        renderTodos(todos,todoUl);
        
        //create inside add todo container
        const todoInput = document.createElement('input');
        todoInput.type = 'text';
        todoInput.id = 'todo-add';
        todoInput.placeholder = 'Add Todo';
        const createTodoBtn = document.createElement('button');
        createTodoBtn.classList.add('add-btn');
        createTodoBtn.textContent = 'Create';
        
        createTodoBtn.addEventListener('click', () => {
            addTodo(id,todoInput,todoUl);
        });
        editListBtn.addEventListener('click', (event) => {
            editLists(event.target,listContent)
        })
        deleteListBtn.addEventListener('click', (event) => {
            deleteLists(event.target);
        });
        downArrow.addEventListener('click', () => {
            showTodosView(todos,todoUl);
        });
        
        if (editStatus) {
            listContent.contentEditable = 'true';
            editListBtn.classList.add('edit-toggle');
            listContent.classList.add('list-text-edit-mode');
        }

        if (displayTodos) {
            todoUl.classList.add('todos-list-toggle');
        }
        
        todoBox.append(listContent, listOperation, addTodoContainer, todosListContainer);
        listOperation.append(deleteListBtn, editListBtn);
        todosListContainer.append(todoListTitle, downArrow, todoUl);
        addTodoContainer.append(todoInput, createTodoBtn);
        todoTasks.append(todoBox);
    });
}

const addTodo = (id,todoInput,todoUl) => {
    for (let lists of listData) {
        if (lists.id == id) {        
            if (todoInput.value == '') {
                alert('Input is empty');
            } else {
                lists.todos.push({
                    todosText: todoInput.value,
                    id: `${lists.id}-${lists.todos.length}`,
                    done: false,
                    edit: false,
                });
                
                renderTodos(lists.todos,todoUl);
                
                todoInput.value = '';
            }
        }
    }
}

const renderTodos = (todos,todoUl) => {
    todoUl.innerHTML = '';
    
    //creat todo list 
    todos.forEach(todoObj => {
        const { id, todosText, done, edit} = todoObj;

        const todoLi = document.createElement('li');
        todoLi.id = `${id}`;

        const todoTextContainer = document.createElement('div');
        const todoText = document.createElement('div');
        todoTextContainer.classList.add('todo-text-container');
        todoText.classList.add('todo-text');
        todoText.textContent = `${todosText}`;
        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.id = 'complete-todo';
        
        const todoOperation = document.createElement('div');
        todoOperation.classList.add('todo-operation');
        const deleteTodosBtn = document.createElement('button');
        deleteTodosBtn.classList.add('delete-todo');
        deleteTodosBtn.className += ' list-action-btn';
        deleteTodosBtn.textContent = 'Delete';
        const editTodosBtn = document.createElement('button');
        editTodosBtn.classList.add('edit-todo');
        editTodosBtn.className += ' list-action-btn';
        editTodosBtn.textContent = 'Edit';
        
        completeCheckbox.addEventListener('click', event => {
            completeTodoLists(event.target, todos, todoUl);
        });
        editTodosBtn.addEventListener('click', event => {
            editTodos(event.target, todos, todoUl);
        })
        deleteTodosBtn.addEventListener('click', event => {
            deleteTodos(event.target, todos,todoLi.id, todoUl)
        })

        if (done) {
            completeCheckbox.checked = true;
        }

        if (edit) {
            todoText.contentEditable = 'true';
            editTodosBtn.classList.add('edit-toggle');
            todoText.classList.add('list-text-edit-mode');
        }
        
        todoTextContainer.append(completeCheckbox,todoText);
        todoOperation.append(deleteTodosBtn, editTodosBtn);
        todoLi.append(todoTextContainer, todoOperation);
        todoUl.append(todoLi);
    });
}

const showTodosView = (todos, todoUl) => {
    debugger
    if (todos.length == '0') {
        alert('Your Todos are empty');
    } else {
        chanageDisplayTodos(todoUl);
        if (todoUl.className == 'todos-list todos-list-toggle') {
            todoUl.classList.remove('todos-list-toggle');
        } else {
            todoUl.classList.add('todos-list-toggle');
        }
    }
}

const chanageDisplayTodos = (todoUl) => {
    listData.forEach(lists => {
        if (todoUl.id == lists.id) {
            lists.displayTodos = !lists.displayTodos;
        }
    });
}

const deleteLists = (deleteBtn) => {
    let parentId = deleteBtn.parentElement;
    parentId = parentId.parentElement.id;
    
    listData = listData.filter(lists => {
        return lists.id != parentId;
    });

    renderLists();
}

const editLists = (editListBtn, listContent) => {
    let parentId = editListBtn.parentElement;
    parentId = parentId.parentElement.id;

    for (let lists of listData) {
        if (parentId == lists.id) {
            lists.editStatus = !lists.editStatus;
            lists.listText = listContent.textContent;
        }
    }

    renderLists();
}

const completeTodoLists = (completeTodoBtn,todos,todoUl) => {
    let parentId = completeTodoBtn.parentElement;
    parentId = parentId.parentElement.id;


    for (let todosObj of todos) {
        if (todosObj.id == parentId) {
            todosObj.done = !todosObj.done;
        }
    }
    console.log(todos);
    debugger
    renderTodos(todos,todoUl);
}

const editTodos = (editListBtn, todos, todoUl) => {
    let parentId = editListBtn.parentElement;
    parentId = parentId.parentElement.id;
    let todoTextElemnt = editListBtn.parentElement.previousSibling;

    for (let todosObj of todos) {
        if (parentId == todosObj.id) {
            todosObj.edit = !todosObj.edit;
            todosObj.todosText = todoTextElemnt.childNodes[1].textContent;
        }
    }

    renderTodos(todos, todoUl);
}


const deleteTodos = (deleteTodosBtn, todos, todoId, todoUl) => {
    let parentId = deleteTodosBtn.parentElement;
    parentId = parentId.parentElement.id;
    todoId = parentId[0];

    console.log(parentId);
    
    let todoDatas;
    for (let lists of listData) {
        if (lists.id == todoId) {
            lists.todos = lists.todos.filter(todosObj => {
                return todosObj.id != parentId;
            });
            todoDatas = lists.todos;
        }
    }
    
    renderTodos(todoDatas, todoUl);
}
