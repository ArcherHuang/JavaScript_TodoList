const newTodo = document.getElementById('newTodo')
const addTodo = document.getElementById('addTodo')
const clearTask = document.getElementById('clearTask')
const todoList = document.getElementById('todoList')
const taskCount = document.getElementById('taskCount')

let todoDatas = []

const clickListenerList = [addTodo, clearTask, todoList]
clickListenerList.forEach(element => {
  element.addEventListener("click", function (e) {
    const todoFunctionName = [element.id] + 'Func'
    actionFunctions[todoFunctionName](e)
  })
})

const actionFunctions = {
  addTodoFunc() {
    if (newTodo !== '') {
      todoDatas.push({
        id: Math.floor(Date.now()),
        title: newTodo.value.trim(),
        completed: false,
      })
      actionFunctions.render(todoDatas)
      newTodo.value = ''
    }
  },
  removeTodo(id) {
    let newIndex = 0
    todoDatas.forEach((item, key) => {
      if (id == item.id) {
        newIndex = key
      }
    })
    todoDatas.splice(newIndex, 1)
    actionFunctions.render(todoDatas)
  },
  completeTodo(id) {
    todoDatas.forEach((item) => {
      if (id == item.id) {
        item.completed = item.completed ? false : true
      }
    })
    actionFunctions.render(todoDatas)
  },
  clearTaskFunc(e) {
    e.preventDefault()
    todoDatas = []
    actionFunctions.render(todoDatas)
  },
  todoListFunc(e) {
    const action = e.target.parentNode.dataset.action
    const id = e.target.parentNode.dataset.id
    if (action == 'remove') {
      actionFunctions.removeTodo(id)
    } else if (action === 'complete') {
      actionFunctions.completeTodo(id)
    }
  },
  render(data) {
    let str = ''
    data.forEach((item) => {
      str += `<li class="list-group-item">
              <div class="d-flex">
              <div class="form-check" data-action="complete" data-id="${item.id}">
              <input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''}>
              <label class="form-check-label ${item.completed ? 'completed' : ''}"> ${item.title}</label>
              </div>
              <button type="button" class="close ml-auto remove" aria-label="Close" data-action="remove" data-id="${item.id}">
              <span aria-hidden="true">&times;</span>
              </button>
              </div>
              </li>`
    })
    todoList.innerHTML = str
    taskCount.textContent = data.length
  }

}