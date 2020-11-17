window.addEventListener('load', bindEvents);
window.addEventListener('load', updateTasksInfo);
window.addEventListener('load', printTaskId);
window.addEventListener('load',
 ()=>document.querySelector("#searchBox").classList.add("hide"));
 window.addEventListener('load',printSavedTasks);
function bindEvents(){
    document.querySelector("#addbtn").addEventListener('click', addTask);
    document.querySelector("#deletebtn").addEventListener('click', deleteMarked);
    document.querySelector("#clear").addEventListener('click', clearAll);
    document.querySelector("#searchbtn").addEventListener('click', toggleHide);
    document.querySelector("#searchTask").addEventListener('keyup', filterTask);
    document.querySelector("#updatebtn").addEventListener('click', update);
    document.querySelector("#sortbtn").addEventListener('click', sort);
    document.querySelector("#refresh").addEventListener('click', refresh);
    document.querySelector("#savedb").addEventListener('click', uploadRecords);
    document.querySelector("#loaddb").addEventListener('click', downloadAndPrint);
}

function uploadRecords(){
    opr.storeTasks();
}
function downloadAndPrint(){
    opr.fetchTasks();
}
function printSavedTasks(){
    if(localStorage.tasks){
    var savedTasks = JSON.parse(localStorage.tasks);
    }
    else{
        return;
    }
    if(savedTasks.length!=0){
        todoOpr.tasks = savedTasks;
        printTaskArray(savedTasks);
    }
}
function printTaskId(){
    document.getElementById("taskid").innerHTML = idGenerator.next().value;
}
function saveTask(){
    localStorage.tasks = JSON.stringify(todoOpr.getTasks());
    localStorage.lastTaskId = document.getElementById("taskid").innerText;
    //doubt
}
function addTask(){
    let id = document.querySelector("#taskid").innerText;
    if(todoOpr.searchTaskById(id)){
        alert('tasks Already Exists please click on update to update your task');
        return;
    }
    let name = document.querySelector("#nameinput");
    let desc = document.querySelector("#description");
    if(id&&name.value&&desc.value){
    let taskObj = todoOpr.add(id, name.value, desc.value, false);
   saveTask();
   printTask(taskObj)
   name.value = '';
   desc.value = '';
    }
    printTaskId();
}
function printTaskArray(taskArray){
    document.querySelector("#tBody").innerHTML = '';
    taskArray.forEach((task)=>printTask(task));
}
function printTask(obj){
    let tBody = document.getElementById('tBody');
    let tableRow = document.createElement('tr');
    for(let key in obj){
        if(key!= "isMark"){
       let cell = document.createElement('td');
       cell.innerText = obj[key];
       tableRow.appendChild(cell);
    }
    }
    let opr= tableRow.insertCell(3);
    opr.appendChild(addOprButtons('edit', obj.id, edit));
    opr.appendChild(addOprButtons('done', obj.id, mark));
    tBody.appendChild(tableRow)
    updateTasksInfo();
}
function mark(){
    this.parentNode.parentNode.classList.toggle("alert-danger");
    todoOpr.markTask(this.getAttribute("idAttribute"));
    updateTasksInfo();
}
function edit(){
    lastId.id = document.querySelector("#taskid").innerText;
   let result= todoOpr.searchTaskById(this.getAttribute("idAttribute"));
    document.querySelector("#taskid").innerText = result.id;
    document.querySelector("#nameinput").value = result.name;
    document.querySelector("#description").value = result.description;

}
function deleteMarked(){
    if(todoOpr.getMarkedRec()==0){
        alert("No tasks marked");
        return;
}
    todoOpr.deleteMarked();
    document.getElementById("tBody").innerHTML='';
     printTaskArray(todoOpr.tasks);
     saveTask();
     updateTasksInfo();
}

function updateTasksInfo(){
    // document.querySelector("#info").innerText = `Total records:${todoOpr.tasks.length} marked records:${todoOpr.tasks.length}
    //  Unmark records:${todoOpr.tasks.length}`;
    document.querySelector("#total").innerText = todoOpr.getTasksLength();
    document.querySelector("#marked").innerText = todoOpr.getMarkedRec();
    document.querySelector("#unmarked").innerText = todoOpr.getunmarkedRecords();
}
function addOprButtons(buttonName, id, fn){
    let fontIcon = document.createElement('i');
    fontIcon.classList.add(config.fontIcons.base);
    fontIcon.classList.add(config.fontIcons[buttonName]);
    fontIcon.classList.add(config.margin.mar);
    fontIcon.classList.add('pointer');
    fontIcon.setAttribute("IdAttribute", id);
    fontIcon.addEventListener('click', fn);
    return fontIcon;
}
function clearAll(){
    if(todoOpr.getTasks().length!=0){
    todoOpr.clearAllTask();
    document.querySelector("#tBody").innerHTML = "";
    saveTask();
    updateTasksInfo();
    }
    else{
        alert("No records to clear")
    }
}
const toggleHide = ()=>{
    document.getElementById("searchBox").classList.toggle("hide");
}

function filterTask(){
    let value = document.querySelector("#searchTask").value;
    let result = todoOpr.search(value);
    if(result.length!=0){
        printTaskArray(result);
    }
   
}
function update(){
    let task = todoOpr.searchTaskById(document.querySelector("#taskid").innerText)
    
    let updatedName = document.getElementById("nameinput").value;
    let updatedDescription = document.getElementById("description").value;
    if(updatedName&&updatedDescription){
        task.name = updatedName;
        task.description = updatedDescription;
        alert("task updated succesfully")
        document.getElementById("nameinput").value =
        document.getElementById("description").value = '';
        document.getElementById("taskid").innerText = lastId.id;
        printTaskArray(todoOpr.getTasks());
       saveTask();
    }
    else{
        alert("the task you're trying to update has not been created yet")
    }
}
function sort(){
    printTaskArray(todoOpr.sortTasks());

}
function refresh(){
    if(confirm("Are you Sure??All the data would be lost and could not be recovered!!!!")){
        localStorage.clear();
        location.reload();
    }
}