const maxColumns = 12
const maxGroups = 6
const maxGroupsPerRow = 4

function showBody(){
    if(getTotalGroups() == 0){
      showInitialBody()
    }else{
      showSecondBody()
    }
  }

function showSecondBody(){
  let mainContainer = document.getElementById("main-container")
  let htmlStr = 
  '<div class="row d-flex align-items-center text-center">' +
    '<div class="col-12">' +
      '<h2 class="display-6">Groups</h2>' +
    '</div>' +
    '<div class="col-md-12">' +
          '<button type="button" class="btn btn-outline-primary btn-lg mt-3 mb-5" onclick="addGroup()">+ Add Group</button>' +
    '</div>' +
    getGroupsShowHtml() +
  '</div>'
          
  mainContainer.innerHTML = htmlStr  
}

function getGroupsShowHtml(){
  let htmlGroups = '<div class="row d-flex align-items-center text-center">'
  let groupName = ""
  let groups = getJSONGroups()
  let sizePerColumn = maxColumns / maxGroupsPerRow
  let groupPerRowCount = 0
  for(let i = 0;i < groups.length;i++){
      groupName = groups[i].name
      htmlGroups = htmlGroups + 
      '<div class="col-md-' + sizePerColumn + '">' +
      '<button id=group-' + i + ' type="button" class="btn btn-outline-primary btn-lg mt-3 mb-5" style="width: 100px; height: 100px;">' + groupName + '</button>' +
      '</div>'
      groupPerRowCount++
      if(groupPerRowCount == maxGroupsPerRow){
        groupPerRowCount = 0
        htmlGroups += '</div>'
        htmlGroups += '<div class="row d-flex align-items-center text-center">'
      }
  }

  if(groupPerRowCount > 0){ //Significa que uma linha ficou com qtd de grupos menor do que sua capacidade
    htmlGroups += '</div>'
    htmlGroups += '<div class="row d-flex align-items-center text-center">'
  }
  
  return htmlGroups
}

  function showInitialBody(){
    let mainContainer = document.getElementById("main-container")
    let htmlStr = 
    '<div class="row d-flex align-items-center text-center">' +
      '<div class="col-12">' +
        '<h2 class="display-6">Welcome to Quick Opening!</h2>' +
      '</div>' +
      '<div class="col-12">' +
        '<p class="lead">' +
          'Groups are places for you to store links so you can quickly open them. Create your first group.' +
        '</p>' +
        '</div>' +
          '<div class="col-md-12">' +
            '<button type="button" class="btn btn-outline-primary btn-lg mt-3 mb-5" style="width: 150px; height: 150px;" onclick="addGroup()">+ Add Group</button>' +
          '</div>' +
      '</div>'

    mainContainer.innerHTML = htmlStr
    
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

function getJSONGroups(){
  let groups = []
  if(getTotalGroups() > 0)
      return groups = JSON.parse(window.localStorage.getItem("qoGroups"))
  
  return null
}

  function addGroup(){
     window.location.href = "./add-group.html"
     
  }

