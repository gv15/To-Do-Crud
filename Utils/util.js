function* generateId(){
    if(localStorage.lastTaskId){
    var initialId =Number(localStorage.lastTaskId)+1;
    }
    else{
        var initialId = config.initialId;
    }
    while(true){
        yield initialId;
        initialId++;
    }

}
var idGenerator = generateId();
lastId = {
    
}