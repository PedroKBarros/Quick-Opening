function showBody(){
    if(isNewNavigator()){
      showBodyNewNavigator()
    }else{
      console.log("ola")
    }
  }

  function showBodyNewNavigator(){
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
            '<button type="button" id="btn-add-group" class="btn btn-outline-primary btn-lg mt-3 mb-5" style="width: 150px; height: 150px;" onclick="addGroup()">+ Add Group</button>' +
          '</div>' +
      '</div>'
            
    mainContainer.innerHTML = htmlStr
    
  }
  function isNewNavigator(){
    return window.localStorage.getItem("qoGroups") == null
  }

  function addGroup(){
    window.location.href = "./add-group.html"
  }