let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');



//8 its basic job is to create an li tag and append it to the taskList innerHTML
function addListToDOM(task){
  const li = document.createElement('li')

  li.innerHTML=`<input type="checkbox" id="${task.id}" data-id="${task.id}" class="custom-checkbox" ${task.completed? 'checked':''}>
  <label for="${task.id}">${task.title}</label>
  <img src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" class="delete" data-id="${task.id}" />`
  
  taskList.append(li)
  //9
tasksCounter.innerHTML=tasks.length
}

//7 putting into dom or browser
function renderList () {
    taskList.innerHTML=''

    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        addListToDOM (element)
    }
}

//6
function markTaskAsComplete (taskID) {
    //iterate over the tasks array to get the required task with ID
    console.log(typeof(taskID))
   const checkTask = tasks.filter((task)=>{
        return task.id === Number(taskID)
    })

    //if returned task exists i.e., if length !=0
    if(checkTask.length > 0){
        const currTask = checkTask[0]
        currTask.completed = !currTask.completed
        renderList()
        showNotification('Task checked')
        return
    }
  
}

//5
function deleteTask (taskID) {
    //it takes all the remaining properties except te task ID
    let newTasksArray = tasks.filter((task)=>{
        return task.id !==Number(taskID)
    })
    tasks = newTasksArray
    renderList()
    showNotification('Task deleted')
    return
}
  
 //4
function addTask (task) {
    if(task){
        tasks.push(task)
        renderList()
        showNotification('Task added')
        return
    }
    else{
        showNotification('Task have not added yet')
        return
    }
}

function showNotification(title) {
    window.alert(title)
}


//2
function handleInputKey(event){
    if(event.key === 'Enter'){
        const title = event.target.value;
        console.log(title)
        
        if(!title){
            showNotification('Please enter the task')
            return
        }
        let task={
            title: title,
            id: Date.now(),
            completed: false
        }
        console.log(task)

        //3
        addTask(task)
        event.target.value=''
    }
}



//10 handling marking of task and delete function

function handleClickListener(event){
    if(event.target.className === 'delete'){
        deleteTask(event.target.dataset.id)
    }
    else if(event.target.className === 'custom-checkbox'){
        markTaskAsComplete(event.target.id)
    }
}


//12 get request
function fetchToDos(){
    fetch('https://jsonplaceholder.typicode.com/todos').then(function(response){
    return response.json()}).then(function(responseData){
        console.log(responseData) 
        tasks = responseData.slice(0,10);
        renderList()
    }
    ).catch(function(err){
        console.log('Some error has occured')
    })
}

function initializeApp(){
//11
fetchToDos()
//1
addTaskInput.addEventListener('keyup', handleInputKey)
document.addEventListener('click',handleClickListener)
}
initializeApp()