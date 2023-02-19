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
        '<input type="text" class="form-control" id="input-link" placeholder="https://www.facebook.com/" maxlength=500>' +
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
                    '<button type="button" class="btn btn-outline-success mx-3 mt-2" disabled>Open All</button>' +
                    '<button type="button" class="btn btn-outline-success mt-2" disabled>Open Selected</button>' +
                    '<button type="button" class="btn btn-outline-danger mx-3 mt-2" disabled>Remove Selected</button>' +
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
              '<button type="button" class="btn btn-outline-success mx-3 mt-2" onClick="openAllLinks()">Open All</button>' +
              '<button type="button" class="btn btn-outline-success mt-2" onClick="openSelectedLinks()">Open Selected</button>' +
              '<button type="button" class="btn btn-outline-danger mx-3 mt-2" onClick="removeSelectedLinks()">Remove Selected</button>' +
            '</div>' +
        '</div>' + 
        '<div class="row d-flex align-items-left text-left">' +
          '<div class="col-12 d-flex justify-content-left text-left">' +
            '<input id="select-all-checkbox" class="form-check-input me-1 mx-4" type="checkbox" value="" aria-label="..." onClick="selectAllCheckboxs()">' +
            '<label for="general-checkbox" class="form-label mx-1">Select All</label>' +
          '</div>' +
        '</div>' +
            getLinksShowHtml(groupUrls) +
      '</div>'

    }
 
  }

  function selectAllCheckboxs(){
    listGroupItems = document.getElementsByName("li-link-item")
    checkBoxSelectAll = document.getElementById("select-all-checkbox")

    for(let i = 0;i < listGroupItems.length;i++)
      listGroupItems[i].children[0].checked = checkBoxSelectAll.checked
  }

  function getLinksShowHtml(groupUrls){
    let linksHtml = ""
    let linkLabel = ""

    linksHtml+= 
      '<div class="row d-flex align-items-left text-left mx-4 my-1">' +
          '<ul class=list-group>'
    for(let i = 0;i < groupUrls.length;i++){
      linkLabel = groupUrls[i]
      linksHtml+= 
          '<li name="li-link-item" class="list-group-item data-bs-toggle="tooltip" data-bs-placement="top" title="' + linkLabel + '">' +
            '<input class="form-check-input me-1" type="checkbox" value="" aria-label="...">' +
              '<a href="' + group.urls[i] + '" class="list-group-item list-group-item-action link-primary text-truncate" target="_blank">' + linkLabel + '</a>' +
            '</li>'
    }
    linksHtml +=
    '</ul>' +
    '</div>'
    return linksHtml
  }

  function openSelectedLinks(){
    listGroupItems = document.getElementsByName("li-link-item")

    for(let i = 0;i < listGroupItems.length;i++){
      if(listGroupItems[i].children[0].checked)
        window.open(listGroupItems[i].children[1].href, '_blank')
    }
  }

  function removeSelectedLinks(){
    let removeLinksCount = 0
    let removeLinks = ""
    let removeLinksIndex = []
    let link
    listGroupItems = document.getElementsByName("li-link-item")

    for(let i = 0;i < listGroupItems.length;i++){
      if(listGroupItems[i].children[0].checked){
        link = listGroupItems[i].children[1].href
        removeLinks += "-" + link + '\n'
        removeLinksIndex.push(i)
        removeLinksCount++
      }
    }

    if (removeLinksCount == 0)
      return false

    if(window.confirm("The following " + removeLinksCount + " links will be permanently removed. Do you wish to continue?\n\n" + removeLinks)){
      removeLinksJSON(removeLinksIndex)
    }
  }
  
  function removeLinksJSON(linksIndex){
    let groupName = getGroupNameByUrl()
    let groups = getJSONGroups()
    let index = getIndexGroup(groupName)

    console.log(linksIndex)
    for(let i = 0; i < linksIndex.length;i++){
      groups[index].urls.splice(linksIndex[i], linksIndex.length)
    }
    console.log(groups[index].urls)
    window.localStorage.setItem("qoGroups", JSON.stringify(groups))
    window.location.reload()
    return true
  }

  function getGroupNameByUrl(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get('group')
  }

  function addLink(){
    let inputLink = document.getElementById('input-link')
    let groupName = getGroupNameByUrl()
    let groups = getJSONGroups()
    let index = getIndexGroup(groupName)

    if(inputLink.value == ""){
      window.alert("No links have been released. Please enter the desired link and click the <Add> button to add it to the group.")
      return false

    }

    if(!isValidUrl(inputLink.value)){
      window.alert("The link is not valid. Check the provided link and try again.")
      return false
    }

    if(existsLink(groups[index], inputLink.value)){
      window.alert("Link already exists.")
      return false
    }

    groups[index].urls.push(inputLink.value)
    window.localStorage.setItem("qoGroups", JSON.stringify(groups))
    window.location.reload()
    return true

  }

  function existsLink(group, link){
    link = link.toUpperCase()
    for(let i = 0;i < group.urls.length;i++){
      if(group.urls[i].toUpperCase() == link)
        return true
    }
    return false
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