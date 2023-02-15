function backHomePage(){
    window.location.href = "./index.html"    
}

function addGroup(){
    let groupName = document.getElementById("input-name")
    let mainContainer = document.getElementById("main-container")
    let groups = []

    if(groupName.value == ""){
        window.alert("Group name not specified.")
        return false
    }

    if(getTotalGroups() == 0){
        groups.push({"name": groupName.value.toUpperCase(), "urls": []})
        window.localStorage.setItem("qoGroups", JSON.stringify(groups))
        console.log("Adicionado")
        backHomePage()
        return true
    }else{
        groups = JSON.parse(window.localStorage.getItem("qoGroups"))
        if(!isNewGroup(groups, groupName.value)){
            window.alert("Group already exists.")
            return false
        }else{
            groups.push({"name": groupName.value.toUpperCase(), "urls": []})
            window.localStorage.setItem("qoGroups", JSON.stringify(groups))
            console.log("Adicionado")
            backHomePage()
            return true
        }
    }

}

function isNewGroup(groups, groupName){

    console.log(groups.length)
    for(let i=0;i<groups.length;i++){
        if(groups[i].name == groupName.toUpperCase())
            return false
    }
    return true

}

function getTotalGroups(){
    let groups = []
    if(window.localStorage.getItem("qoGroups") != null){
        groups = JSON.parse(window.localStorage.getItem("qoGroups"))
        return groups.length
    }else{
        return 0;
    }
        
}