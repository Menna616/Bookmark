
var siteNameInput = document.getElementById('site-name');
var siteUrlInput = document.getElementById('site-url');
var submitBtn = document.getElementById('submitBtn');
var nameAlert = document.getElementById('name-alert');
var nameExist = document.getElementById('name-exist');
var urlAlert = document.getElementById('url-alert');
var siteList;

if(localStorage.getItem('siteList')==null){
    siteList = [];
}
else{
    siteList = JSON.parse(localStorage.getItem('siteList'));
    display();
}
submitBtn.onclick=function(){
    if(validationOfName()==true && validationOfUrl()==true){
        addSite();
    }else{
        alert('Site name must start with an uppercase letter followed by 3 to 10 lowercase letters and Site URL must start with https')
    }
   
}
// ADD
function addSite(){
    if(siteNameValidation()==true & urlValidation()==true){
        var site = {
            siteName:siteNameInput.value,
            siteUrl:siteUrlInput.value
        }
        siteList.push(site);
        locatStorage();
        display();
        reset();
    } 
}

// DISPLAY
function display(){
    var cartoona = ``;
    for(i=0;i<siteList.length;i++){
        cartoona+=`<tr>
        <td>${i+1}</td>
        <td>${siteList[i].siteName}</td>
        <td><a href="${siteUrlInput.value}" target="_blank" class="btn btn1 text-white"><i class="fa-regular fa-eye me-2"></i>Visit</a></td>
        <td><button class="btn btn2 text-white" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
    </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartoona;
}
// Delete
function deleteSite(siteIndex){
    siteList.splice(siteIndex,1);
    locatStorage();
    display();
}
// RESER
function reset(){
    siteNameInput.value = "";
    siteUrlInput.value = "";
}
// Local Storage
function locatStorage(){
  localStorage.setItem('siteList',JSON.stringify(siteList));
}
// Name Validation
function siteNameValidation(){
    if(siteNameInput.value == ""){
        nameAlert.classList.remove('d-none');
        nameExist.classList.add('d-none');
        return false;
    }
    else{
        var isExist =true;
        for(i=0;i<siteList.length;i++){
            if(siteList[i].siteName===siteNameInput.value){
                isExist = false;
                break;   
            }
        }
        if(isExist== false){
            nameExist.classList.remove('d-none');
            return false;
        }
        else{
            nameExist.classList.add('d-none');
        }
        nameAlert.classList.add('d-none')
        nameExist.classList.add('d-none');
        return true;
    }
}
// URL Validation
function urlValidation(){
    if(siteUrlInput.value == ""){
        urlAlert.classList.remove('d-none')
        return false;
    }
    else{
        urlAlert.classList.add('d-none')
        return true;
    }
}

// Name Regex
function validationOfName(){
    var NameRegex=/^[A-Z][a-z]{3,9}$/;
    var siteNameValue = siteNameInput.value;
    if(NameRegex.test(siteNameValue)){
        return true;
    }
    else{
        return false;
    }
}
// URL Regex
function validationOfUrl() {
    var urlRegex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    var siteUrlValue = siteUrlInput.value;
    if(!urlRegex .test(siteUrlValue)) {
      return false;
    } else {
      return true;
    }
  }