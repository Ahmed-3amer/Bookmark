
let siteName = document.getElementById('inputName');
let siteLink = document.getElementById('inputSite');
let btn = document.getElementById('btn');
let siteList = [];

if(localStorage.getItem('list' !== null)){
    siteList = JSON.parse(localStorage.setItem('list'))
    display();
}

// Create--

function createSite(){
    if(validURL() == true){
        let siteInfo = {
            name: siteName.value,
            link: siteLink.value
        }
        siteList.push(siteInfo);
        display();
        clearInput();
        localStorage.setItem('list',JSON.stringify(siteList))
    }
    else{
        Swal.fire("please enter a valid url!");
    }
}
btn.addEventListener('click',createSite);

// display--

function display(){
   let bookmarks = ``;
    for(let i = 0; i < siteList.length; i++){
        bookmarks += `
        <tr>
        <td>${i+1}</td>
        <td>${siteList[i].name}</td>
        <td><a href="${siteList[i].link}" target="_blank"><button class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `
    }
    document.getElementById('infoTable').innerHTML = bookmarks;
}

// Clear Input--

function clearInput(){
    siteName.value = "";
    siteLink.value = "";
}

// Delete--

function deleteSite(index){
siteList.splice(index,1);
localStorage.setItem('list',JSON.stringify(siteList))
display();
}

// Validation--
let urlRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
function validURL(){
    if(urlRegex.test(siteLink.value) == true){
        return true;
    }
    else{
        return false;
    }
}