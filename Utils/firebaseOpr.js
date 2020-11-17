var opr = {
    storeTasks:function(){
        fireStore.collection("tasks").add({storedTasks:JSON.stringify(todoOpr.tasks)})
        .then(()=>alert("Records uploaded"));
    }
    ,
    fetchTasks(){
        fireStore.collection("tasks").get()
        .then((querySnapShot)=>console.log(querySnapShot))
        .catch((err)=>console.log(err))
    }
}