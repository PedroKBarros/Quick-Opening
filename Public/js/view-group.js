function loadGroupPage(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const groupName = urlParams.get('group')
    let mainContainer = document.getElementById("main-container")
    const groupUrls = getGroupUrls(groupName)
    mainContainer.innerHTML = ""
    mainContainer.innerHTML = mainContainer.innerHTML +
    '<div class="row d-flex align-items-center text-center">' +
      '<div class="col-xs-12">' +
        '<h2 class="display-6">' + groupName + ' GROUP</h2>' +
      '</div>' +
    '</div>' +
    '<div class="row d-flex align-items-left text-left">' +
        '<div class="col-xs-12">' +
            '<label for="input-name" class="form-label mt-4">Enter a full link to add it to the group:</label>' +
        '</div>' +
    '</div>' +
    '<div class="row">' +
      '<div class="col-6 d-flex justify-content-right text-right">' +
        '<input type="text" class="form-control" id="input-name" placeholder="https://www.facebook.com/">' +
      '</div>' +
      '<div class="col-6 d-flex justify-content-left text-left">' +
        '<button type="button" class="btn btn-outline-primary">Add</button>' +
      '</div>' +
    '</div>'
    if(groupUrls.length == 0){
        mainContainer.innerHTML = mainContainer.innerHTML +
        '<div id="links-container" class="containe shadow-sm mt-5 rounded-3 border border-1">' +
            '<div class="row d-flex align-items-left text-left">' +
                '<h4 class="display-9 p-3"> LINKS' + '</h4>' +
                '<h5 class="display-9 p-3 fw-normal"> This group has no links :(' + '</h4>' +
            '</div>'
        '</div>'
    }else{
        '<div id="links-container" class="containe shadow-sm mt-5 rounded-3 border border-1">' +
            '<div class="row d-flex align-items-left text-left">' +
                '<h4 class="display-9 p-3"> LINKS' + '</h4>' +
                '<h5 class="display-9 p-3 fw-normal"> This group has links :)' + '</h4>' +
            '</div>'
        '</div>'
    }
 
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

  function getGroupUrls(groupName){
    groups = getJSONGroups()

    for(let i = 0;i < groups.length;i++){
        if(groups[i].name == groupName)
            return groups[i].urls
    }

    return null
  }