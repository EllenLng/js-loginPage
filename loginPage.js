if(!localStorage.getItem("users")){
    fetch("users.json")
    .then(res => res.json())                            //if there is no list of status, fetch list of users/password
    .then(data => {                                     //list of users and passwords and put it localstorage

        localStorage.setItem("users", JSON.stringify(data));

    })
}
if(!localStorage.getItem("status")){
    fetch("status.json")
    .then(res => res.json())                            //if there is no list of status, fetch list of status
    .then(data => {                                     //(logged in/out) and put it localstorage

        localStorage.setItem("status", JSON.stringify(data));

    })
}


let menu = document.getElementById("menu");
let content = document.getElementById("content");
let newUserBox = document.getElementById("newUserBox");
let createUserBtn = document.getElementById("createBtn");
let createUsername = document.getElementById("createUsername");
let createPassword = document.getElementById("createPassword");

let welcome =document.createElement("h1");
welcome.style.color="rgb(118, 77, 77)";

let wrongUser = document.createElement("p");
content.appendChild(wrongUser);
content.appendChild(welcome);


//------------------------------------------------
//-----------Statuscontroll logged in/out---------
//------------------------------------------------

function controllStatus(){
    
    const checkStatus = JSON.parse(localStorage.getItem("status"));
    let array = [];
    for (const status in checkStatus) {                                
        let inlog = checkStatus[status]; 
        array.push(inlog); 
    }  
    const found = array.find(element => element ==="in" );              //check if user is in 
    if (found)
    {
        console.log("inloggad");
        loggedIn();    
    }
    else{
        console.log("utloggad");
        loggedOut();
    }
}
//------------------------------------------------
//-----------Check if pass/username exist---------
//------------------------------------------------
function findLogin(userName, password){
    
        let users = JSON.parse(localStorage.getItem("users"));
        let nameCheck = users.find(user => user.user === userName);
        let passwordCheck = users.find(user => user.password === password);
        
            if (nameCheck && passwordCheck){

            let newInlog = {"name": userName, "status": "in"};
            localStorage.setItem("status", JSON.stringify(newInlog));           //if user exist login
            controllStatus();
            }
            else{
            removeInlog();
            wrongUser.innerHTML="";
            wrongUser.style.color="red";
            wrongUser.style.position= "absolute";                                //if user doesnt exist show text
            wrongUser.style.margin = "70px";
            wrongUser.innerHTML="Wrong username/password please try again!";
            }   
    
}
//------------------------------------------------
//--------------Appearance loggedout---------------
//------------------------------------------------
function loggedOut(){

    const inlogBox = document.createElement("div");         
    inlogBox.style.border= "1px solid rgba(79, 47, 47, 0.182)";
    inlogBox.style.height= "58px";
    inlogBox.style.width="300px";
    inlogBox.style.backgroundColor= "rgba(55, 47, 47, 0.182)";
    inlogBox.style.padding= "20px";
    inlogBox.style.marginRight= "0px";
    menu.appendChild(inlogBox); 

    const userLabel = document.createElement("label");
    userLabel.innerHTML= "Username: ";
    inlogBox.appendChild(userLabel);

    const userName = document.createElement("input");
    inlogBox.appendChild(userName);
    userName.style.border= "1px solid rgba(79, 47, 47, 0.182)";

    const passLabel = document.createElement("label");
    passLabel.innerHTML= "Password: ";
    inlogBox.appendChild(passLabel);

    const password = document.createElement("input");
    inlogBox.appendChild(password);
    password.style.border= "1px solid rgba(79, 47, 47, 0.182)";
    password.style.marginLeft = "3.5px";

    const loginBtn = document.createElement("button");
    loginBtn.innerHTML = "Login";
    loginBtn.style.border= "1px solid rgba(79, 47, 47, 0.182)";
    loginBtn.style.backgroundColor= "rgba(55, 47, 47, 0.180)";
    loginBtn.style.color = "rgba(55, 47, 47, 0.580)";
    inlogBox.appendChild(loginBtn);

    const createBtn = document.createElement("button");
    createBtn.innerHTML = "Create New User";
    createBtn.style.border= "1px solid rgba(79, 47, 47, 0.182)";
    createBtn.style.backgroundColor= "rgba(55, 47, 47, 0.180)";
    createBtn.style.color = "rgba(55, 47, 47, 0.580)";
    createBtn.style.marginLeft = "100px";
    inlogBox.appendChild(createBtn);

    welcome.innerHTML= "";
    welcome.innerHTML= "Please submit your username and password!";
    welcome.style.marginTop="250px";
    welcome.style.marginLeft= "500px";
    welcome.style.color="white";

    body.style.backgroundColor= "rgb(223, 174, 174)";
    newUserBox.style.display = "none";

    loginBtn.addEventListener("click", () => {
          
        if(!userName.value || !password.value){
            
            wrongUser.innerHTML="";
            wrongUser.style.color="red";
            wrongUser.style.position = "absolute";
            wrongUser.style.margin = "70px";
            wrongUser.innerHTML="Please fill inputs";    //check if inputs exist and user/pass exist in list 
            
        }
        
        else{
            inlogBox.style.display= "none";
            findLogin(userName.value, password.value);
            
        }
        
    })
    createBtn.addEventListener("click", () => {
        toggleBox();                                           //show/hide create user box
    })
}

function checkUser(){
    let status = JSON.parse(localStorage.getItem("status"));

    for (const name in status) {                                //get users name
        return status[name];
    }     
}

//------------------------------------------------
//--------------Appearance loggedin--------------
//------------------------------------------------
function loggedIn(){

    newUserBox.style.display = "none";
    wrongUser.innerHTML="";
    welcome.innerHTML= "";
    welcome.innerHTML="Nice to see you IN here " +checkUser();
    welcome.style.color="white";
    welcome.style.marginTop="250px";
    welcome.style.marginLeft= "600px";

    const logoutBtn = document.createElement("button");
    logoutBtn.innerHTML = "logout";

    menu.appendChild(logoutBtn);
    logoutBtn.style.backgroundColor= "rgba(55, 47, 47, 0.182)";
    logoutBtn.style.border= "1px solid rgba(79, 47, 47, 0.182)";
    logoutBtn.style.marginLeft="50px";
    logoutBtn.style.marginTop="40px";
    logoutBtn.style.color="rgba(55, 47, 47, 0.580)";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML="Delete user";
    menu.appendChild(deleteBtn);
    body.style.backgroundColor= "rgba(202, 166, 166, 0.929)";

    deleteBtn.addEventListener("click", () =>{

        wrongUser.innerHTML="";
        wrongUser.innerHTML="Your account has been deleted";
        wrongUser.style.position = "absolute";
        wrongUser.style.margin = "70px";
        wrongUser.style.color = "black";

        deleteUser();                                       //remove user
        deleteBtn.style.display = "none";               
    })

    logoutBtn.addEventListener("click", () => {              
        removeInlog();
        wrongUser.innerHTML="";
        deleteBtn.style.display = "none";
        logoutBtn.style.display= "none";                //remove login in localstorage
    })
}

//------------------------------------------------
//-----------Remove login when logging out--------
//------------------------------------------------
function removeInlog(){

    localStorage.removeItem("status");                  // empty localstorage status 
    controllStatus();
}

//------------------------------------------------
//-----------Create new user----------------------
//------------------------------------------------

function toggleBox() {
    
    if (newUserBox.style.display === "none") {
        newUserBox.style.display = "block";
    } else {                                                //show/hide createuserbox
        newUserBox.style.display = "none";
    }
  }

createUserBtn.addEventListener("click", () => {

    let newUser = {
        "user": createUsername.value,   
        "password": createPassword.value                            //get values from input and create new user
        }      
        let users = JSON.parse(localStorage.getItem("users"));
        let nameCheck = users.find(user => user.user === createUsername.value);
        
    if(createPassword.value==="" || createUsername.value===""){
        wrongUser.innerHTML="";
        wrongUser.style.color="red";
        wrongUser.innerHTML="Please fill inputs";

    }
    else if(nameCheck){
        
        wrongUser.innerHTML="";
        wrongUser.innerHTML= "Username already exist, try another one!";
        wrongUser.style.position = "absolute";
        wrongUser.style.margin = "70px";
        wrongUser.style.color = "red";
        
    }
    else{
        let usersList = JSON.parse(localStorage.getItem("users"));
    
        usersList.push(newUser);
    
        localStorage.setItem("users", JSON.stringify(usersList));          //push new user to userslist
    
        wrongUser.innerHTML="";
        wrongUser.innerHTML= "New user created!";
        wrongUser.style.position = "absolute";
        wrongUser.style.margin = "70px";
        wrongUser.style.color = "black";
        newUserBox.style.display = "none";
    }
})
//------------------------------------------------
//---------------Delete user----------------------
//------------------------------------------------

function deleteUser(){

    let users = JSON.parse(localStorage.getItem("users"));
    let newUsers = users.filter(user => user.user !== checkUser());     //remove user from userslist
    localStorage.setItem("users", JSON.stringify(newUsers));
 
}

//--------------controll status when page is loaded--------------
controllStatus();       







