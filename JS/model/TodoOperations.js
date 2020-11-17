var todoOpr = {
    tasks : [],
    add(id,name,description, isMark){
        var newTask = new ToDo(id, name, description, isMark)
        this.tasks.push(newTask);
        return newTask;
    },
    delete(){
        this.tasks.pop();
    },
    getTasks :()=>todoOpr.tasks,
   // getTaskslength:()=>this.tasks.length,
    getTasksLength:()=>todoOpr.tasks.length,
    getMarkedRec(){
        let count= 0;
        for(let task of this.tasks){
            count = task.isMark==true?count+1:count;
        }
        return count;
    },
    getunmarkedRecords(){
        return this.getTasksLength()-this.getMarkedRec();
    },
    markTask:function(id){
        let task = this.tasks.find((element)=>element.id===id);
        task.isMark = !task.isMark;
    },
    deleteMarked(){
      this.tasks = this.tasks.filter((element)=>element.isMark==false)
    },
    clearAllTask(){
        todoOpr.tasks.length = 0;
    },
    search(searchQuery){
       return todoOpr.tasks.filter((task)=>task.name.startsWith(searchQuery))
    },
    searchTaskById:(id)=>todoOpr.tasks.find((task)=>task.id==id),
    sortTasks:()=>todoOpr.tasks.sort((first, second)=>first.name.localeCompare(second.name))
}