document.getElementById("btn-start-login").addEventListener("click",login);
document.getElementById("btn-start-register").addEventListener("click",register);

//var
var containerForm = document.querySelector(".container-login-register");
var formLogin = document.querySelector(".form-login");
var formRegister = document.querySelector(".form-register");
///
var backBoxLogin = document.querySelector(".backlogin");
var backBoxRegister = document.querySelector(".backregister");




function login (){
    formRegister.style.display ="none";
    containerForm.style.left = "10px";
    formLogin.style.display = "block";
    backBoxRegister.style.opacity = "1";
    backBoxLogin.style.opacity = "0";

}

function register (){
    formRegister.style.display ="block";
    containerForm.style.left = "390px";
    formLogin.style.display = "none";
    backBoxRegister.style.opacity = "0";
    backBoxLogin.style.opacity = "1";

}