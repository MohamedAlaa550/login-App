// js code 

var signupPage = document.getElementById("signup")
var loginPage = document.getElementById("login")
var homePage = document.getElementById("home")
var welcomeUser = ""
var passwordIcon = document.querySelector(".toggle-password")
var passwordIconLogin=  document.querySelector(".toggle-password-login")
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var signupBtn = document.getElementById("signupBtn")
var loginBtn = document.getElementById("loginBtn")
var signupForm = document.querySelector("#signup form")
var loginForm = document.querySelector("#login form")



var usersList = [];
if (localStorage.getItem("users") !== null) {
    usersList = JSON.parse(localStorage.getItem("users"))
}

signupBtn.addEventListener("click", function () {
    addUsers()
    clearInputs();
})




document.querySelector("#signup p a").addEventListener("click", function (e) {
    e.preventDefault();
    switchPage(signupPage, loginPage);
});


document.querySelector("#login p a").addEventListener("click", function (e) {
    e.preventDefault();
    switchPage(loginPage, signupPage);
});

document.querySelector("#home nav button").addEventListener("click", function(){
   switchPage(homePage,loginPage)
})

passwordIcon.addEventListener("click", function(){
    if(signupPassword.getAttribute("type") === "password"){
        signupPassword.setAttribute("type","text")
        passwordIcon.classList.replace("fa-eye","fa-eye-slash")
    }
    else{
        signupPassword.setAttribute("type","password")
        passwordIcon.classList.replace("fa-eye-slash","fa-eye")

    }
})

passwordIconLogin.addEventListener("click", function(){
    if(loginPassword.getAttribute("type") === "password"){
        loginPassword.setAttribute("type","text")
        passwordIconLogin.classList.replace("fa-eye","fa-eye-slash")
    }
    else{
        loginPassword.setAttribute("type","password")
        passwordIconLogin.classList.replace("fa-eye-slash","fa-eye")

    }
})

signupName.addEventListener("input", function () {
    validation("signupName","msgName")

})

signupEmail.addEventListener("input", function () {
    validation("signupEmail","msgEmail")

})

signupPassword.addEventListener("input", function () {
    validation("signupPassword","msgPassword")
})

signupForm.addEventListener("submit", function (e) {
    e.preventDefault()
})
loginForm.addEventListener("submit", function (e) {
    e.preventDefault()
})

loginBtn.addEventListener("click", function () {
    var flag = false
   for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].email == loginEmail.value && usersList[i].password == loginPassword.value) {
            loginPage.classList.add("d-none")
            homePage.classList.remove("d-none")
            welcomeUser = usersList[i].code
            document.querySelector("#home h1").innerHTML= `Welcome ${welcomeUser}`
            flag = true
            break
        }
    }
    if(!flag){
        Swal.fire("In-valid Email Or Password");
    }
    clearInputs()
})



function addUsers() {

    var flag = false
    for(var i =0; i<usersList.length; i++){
        if(usersList[i].email === signupEmail.value){
            flag= true
            break
        }
    }

    if(flag){
        Swal.fire("This email is already registered. Please use another email.");
    }
    else{
        if (validation("signupName") && validation("signupEmail") && validation("signupPassword")) {
            var user = {
                code: signupName.value,
                email: signupEmail.value,
                password: signupPassword.value
            }
            usersList.push(user)
            localStorage.setItem("users", JSON.stringify(usersList))
            signupPage.classList.add("d-none")
            loginPage.classList.remove("d-none")
            welcomeUser = user.code
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    }

    


}


function validation(id, msg) {
    var myElement = document.getElementById(id);
    var text = myElement.value;
    var msgFalse = document.getElementById(msg);
    var regex = {
        signupName: /^[a-zA-Z][\w ]{2,20}$/,
        signupEmail: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
        signupPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    };

    if (regex[id].test(text)) {
        myElement.classList.add("is-valid");
        myElement.classList.remove("is-invalid");
        if (msgFalse) msgFalse.classList.add("d-none");
        return true;
    } else {
        myElement.classList.add("is-invalid");
        myElement.classList.remove("is-valid");
        if (msgFalse) msgFalse.classList.remove("d-none");
        return false;
    }
}



function clearInputs(){
var inputs =Array.from(document.querySelectorAll("input"));
for(var i = 0; i < inputs.length; i++ ){
    inputs[i].value = null
    inputs[i].classList.remove("is-valid")
}
}

function switchPage(hidePage, showPage) {
    hidePage.classList.add("d-none");
    showPage.classList.remove("d-none");
}




// console.log(signupName, signupEmail, signupPassword, loginEmail, loginPassword);




