const maxLabelLink = 40

function loadGroupPage(){
    let groupName = getGroupNameByUrl()
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
        '<input type="text" class="form-control" id="input-link" placeholder="https://www.facebook.com/">' +
      '</div>' +
      '<div class="col-6 d-flex justify-content-left text-left">' +
        '<button type="button" class="btn btn-outline-primary" onClick="addLink()">Add</button>' +
      '</div>' +
    '</div>'
    if(groupUrls.length == 0){
        mainContainer.innerHTML = mainContainer.innerHTML +
        '<div id="links-container" class="containe shadow-sm mt-5 rounded-3 border border-1">' +
            '<div class="row d-flex align-items-left text-left">' +
                '<div class="col-12 d-flex justify-content-left text-left">' +
                    '<h4 class="display-9 mx-3 mt-2"> LINKS </h4>' +
                    '<button type="button" class="btn btn-outline-primary mx-3 mt-2" disabled>Open All</button>' +
                    '<button type="button" class="btn btn-outline-primary mt-2" disabled>Open Selected</button>' +
                '</div>' +
            '</div>' +
            '<div class="row d-flex align-items-left text-left">' +
                '<h5 class="display-9 fw-normal mx-3 my-4"> This group has no links :( </h4>' +
            '</div>' +
        '</div>'
    }else{
      mainContainer.innerHTML = mainContainer.innerHTML +
      '<div id="links-container" class="containe shadow-sm mt-5 rounded-3 border border-1">' +
        '<div class="row d-flex align-items-left text-left">' +
          '<div class="col-12 d-flex justify-content-left text-left mb-3">' +
              '<h4 class="display-9 mx-3 mt-2"> LINKS </h4>' +
              '<button type="button" class="btn btn-outline-primary mx-3 mt-2" onClick="openAllLinks()">Open All</button>' +
              '<button type="button" class="btn btn-outline-primary mt-2">Open Selected</button>' +
            '</div>' +
          '</div>' +
            getLinksShowHtml(groupUrls) +
      '</div>'

    }
 
  }

  function getLinksShowHtml(groupUrls){
    let linksHtml = ""
    let linkLabel = ""

    linksHtml+= 
      '<div class="row d-flex align-items-left text-left mx-4 my-4">' +
          '<ul class=list-group>'
    for(let i = 0;i < groupUrls.length;i++){
      if (groupUrls[i].length <= maxLabelLink)
        linkLabel = groupUrls[i]
      else
        linkLabel = groupUrls[i].substring(0, maxLabelLink + 1) + "..."

      linksHtml+= 
          '<li class="list-group-item">' +
            '<input class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
              '<a href="' + group.urls[i] + '" class="list-group-item list-group-item-action link-primary" target="_blank">' + linkLabel + '</a>' +
            '</li>'
    }
    linksHtml +=
    '</ul>' +
    '</div>'
    console.log(linksHtml)
    return linksHtml
  }

  function getGroupNameByUrl(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get('group')
  }

  function addLink(){
    let inputLink = document.getElementById('input-link')
    if(inputLink.value == ""){
      window.alert("No links have been released. Please enter the desired link and click the <Add> button to add it to the group.")
      return false

    }

    if(!isValidUrl(inputLink.value)){
      window.alert("The link is not valid. Check the provided link and try again.")
      return false
    }

    let groupName = getGroupNameByUrl()
    let groups = getJSONGroups()
    let index = getIndexGroup(groupName)
    groups[index].urls.push(inputLink.value)
    window.localStorage.setItem("qoGroups", JSON.stringify(groups))
    window.location.reload()
    return true

  }

  function openAllLinks(){
    let groupName = getGroupNameByUrl()
    links = getJSONGroups()[getIndexGroup(groupName)].urls

    for(i = 0;i < links.length;i++){
      window.open(links[i], '_blank')
    }
  }

  function isValidUrl(urlString){
    try {
      let url = new URL(urlString)
      return true
    } catch(err) {
        return false
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
    group = getJSONGroups()[getIndexGroup(groupName)]

    if (group == null)
      return null

    return group.urls
  }

  function getIndexGroup(groupName){
    groups = getJSONGroups()

    for(let i = 0;i < groups.length;i++){
        if(groups[i].name == groupName)
            return i
    }

    return -1
  }