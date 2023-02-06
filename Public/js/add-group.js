function backHomePage(){
    window.location.href = "./index.html"    
}

function addGroup(){
    let groupName = document.getElementById("input-name")
    let mainContainer = document.getElementById("main-container")
    let groups = []
    if(window.localStorage.getItem("qoGroups") != null)
        groups = JSON.parse(window.localStorage.getItem("qoGroups"))
    
    if(groups.includes(groupName.value.toUpperCase())){
        window.alert("Group already exists.")
    }else{
        groups.push(groupName.value.toUpperCase())
        window.localStorage.setItem("qoGroups", JSON.stringify(groups))
        console.log("Adicionado")
        backHomePage()
    }


}