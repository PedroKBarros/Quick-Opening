const maxColumns = 12
const maxGroups = 6
const maxGroupsPerRow = 4

const widthMd = 768
const sizePerColumnMd = 3
const widthSm = 576
const sizePerColumnSm = 4
const widthXs = 575
const sizePerColumnXs = 6

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
  '</div>' +
    getGroupsShowHtml()
          
  mainContainer.innerHTML = htmlStr  
}

function getGroupsShowHtml(){
  let htmlGroups = '<div class="row d-flex align-items-center text-center">'
  let groupName = ""
  let groups = getJSONGroups()
  let groupPerRowCount = 0
  for(let i = 0;i < groups.length;i++){
      groupName = groups[i].name
      htmlGroups = htmlGroups + 
      '<div class="col-md-' + sizePerColumnMd + ' col-sm-' + sizePerColumnSm + ' col-xs-' + sizePerColumnXs + '">' +
        '<button id=group-' + i + ' type="button" class="btn btn-outline-primary btn-lg mt-3 shadow rounded-3 border border-4 border-primary text-truncate" data-bs-toggle="tooltip" data-bs-placement="top" title="' + groupName + '" style="width: 160px; height: 200px; font-size: 15px;" onClick="redirectGroupUrl(this)">' + 
          groupName +
        '</button>' +
        '<button id="' + groupName + '" type="button" class="btn-close position-static top-50 start-100" aria-label="Close" onClick="removeGroup(this)"></button>' + 
      '</div>'
      groupPerRowCount++
      console.log(getMaxGroupsPerRow())
      if(groupPerRowCount == getMaxGroupsPerRow()){
        groupPerRowCount = 0
        htmlGroups += '</div>'
        if(i < groups.length - 1){
          htmlGroups += '<div class="row d-flex align-items-center text-center">'
        }
      }
  }

  if(groupPerRowCount > 0){ //Significa que uma linha ficou com qtd de grupos menor do que sua capacidade
    htmlGroups += '</div>'
  }
  
  return htmlGroups
}

function removeGroup(groupHTMLButton){
  let groups = getJSONGroups()

  if(window.confirm("Group " + groupHTMLButton.id + " will be permanently removed. Do you wish to continue?")){
    removeGroupJSON(groups, groupHTMLButton.id)
  }
}

function removeGroupJSON(groups, groupName){
  if(groups == null || groupName == null)
    return false
  
  if(groupName == "")
    return false

  for(let i = 0;i<groups.length;i++){
    if(groups[i].name == groupName){
      groups.splice(i, 1)
      break
    }
  }
  window.localStorage.setItem("qoGroups", JSON.stringify(groups))
  window.location.reload()
  return true
}

function redirectGroupUrl(groupButton){
  window.location.href = "./view-group.html?group=" + groupButton.textContent
}

function getMaxGroupsPerRow(){
  let screenWidth = getScreenSize().width

  if (screenWidth >= widthMd)
    return 12 / sizePerColumnMd
  
  if(screenWidth >= widthSm)
    return 12 / sizePerColumnSm

  return 12 / sizePerColumnXs
}


function getScreenSize(){
  //Retorna o tamanho da janela e n??o da tela, pois o usu??rio, no desktop, pode alterar o tamanho da janela
  return {"width": screen.width, "height": screen.height}
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

