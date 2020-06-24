// 抓取 id 為 newTodo、addTodo、clearTask、todoList 與 taskCount 的 Element，為設定到相對應的常數中
const newTodo = document.getElementById('newTodo')
const addTodo = document.getElementById('addTodo')
const clearTask = document.getElementById('clearTask')
const todoList = document.getElementById('todoList')
const taskCount = document.getElementById('taskCount')

// 宣告 todoDatas 的陣列以存被 todo，其初始值為空陣列
let todoDatas = []

// 設定 addTodo、clearTask 與 todoList 的 click 監聽事件，當 click 發生時
// 執行相對應的動作
const clickListenerList = [addTodo, clearTask, todoList]
clickListenerList.forEach(element => {
  element.addEventListener("click", function (e) {
    const todoFunctionName = [element.id] + 'Func'
    actionFunctions[todoFunctionName](e)
  })
})

const actionFunctions = {
  // 新增 newTodo 到清單中
  addTodoFunc() {
    // 如果 newTodo 不為空時將此 todo 新增到 todoDatas 陣列中
    if (newTodo !== '') {
      todoDatas.push({
        id: Math.floor(Date.now()),
        title: newTodo.value.trim(),
        completed: false,
      })
      // 重新繪製畫面
      actionFunctions.render(todoDatas)
      // 將 newTodo 的值清空
      newTodo.value = ''
    }
  },
  // 移除各別 todo 或完成的 todo
  removeOrCompleteTodo(id, action) {
    if (action === 'remove') {
      // Remove
      // 如果是 remove 的動作，則從 todoDatas 中找到相對應的值並予以刪除
      let newIndex = 0
      todoDatas.forEach((item, key) => {
        if (id == item.id) {
          newIndex = key
        }
      })
      todoDatas.splice(newIndex, 1)
    } else if (action === 'complete') {
      // Complete
      // 如果是 complete 的動作，則從 todoDatas 中找到相對應的值並將其 completed 設成相反的值
      todoDatas.forEach((item) => {
        if (id == item.id) {
          item.completed = !item.completed
        }
      })
    }
    // 重新繪製畫面
    actionFunctions.render(todoDatas)
  },
  clearTaskFunc(e) {
    // 阻止元素發生預設的行為
    e.preventDefault()
    // 將 todoDatas 清空
    todoDatas = []
    // 重新繪製畫面
    actionFunctions.render(todoDatas)
  },
  todoListFunc(e) {
    // 依 remove 或 complete 來做相對應的行為
    const action = e.target.parentNode.dataset.action
    const id = e.target.parentNode.dataset.id
    actionFunctions.removeOrCompleteTodo(id, action)
  },
  render(data) {
    // 依 todoDatas 的值來繪製畫面
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