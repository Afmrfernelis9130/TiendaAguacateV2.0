// import {validInput} from "./inputValid2.js"


const API = "/src/Model/user.json"


//LOGIN INPUTS
const inputLEmail= document.getElementById("login-email");
const inputLPassword= document.getElementById("login-password");

//REGISTER INPUTS
const inputREmail= document.getElementById("register-email");
const inputRName= document.getElementById("register-fullname");
const inputRUsername= document.getElementById("register-username");
const inputRPassword= document.getElementById("register-password");
const inputRPassword2= document.getElementById("register-password2");


//BUTTONS
const btnLogin= document.getElementById("btn-login");
const btnRegister= document.getElementById("btn-register");


let isLogged=false

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    fetchDataLogin()

} );

btnRegister.addEventListener("click", (e) => {
    e.preventDefault();


} );


const fetchDataLogin = async () => {

    try {
        const response = await fetch(API);
        const data = await response.json();

        login(data);


    }catch (e) {

        console.log(e)

    }

}

function login(data){

    const EMAIL = inputLEmail.value;
    const PASSWORD = inputLPassword.value;


    data.forEach(element => {
        // const valid = new validInput();

        if (element.username === EMAIL && element.pass === PASSWORD) {
            console.log("Login Successful")
            window.location = "home.html";
            isLogged = true;


        } else if (element.username !== EMAIL && element.pass !== PASSWORD && !isLogged) {

            console.log("Login Failed")
        } else if (EMAIL === "") {
            setErrorFor(inputLEmail, "The username field is required");
            console.log("Username is empty")

        }
        else if (PASSWORD === "" && !isLogged) {
            setErrorFor(inputLPassword, "The password field is required");
            console.log("Passwords is empty")

        } else if (!setErrorForEmail(EMAIL && !isLogged)) {
            setErrorFor(inputLEmail, "The email is not valid")

        }
        else if (setErrorForEmail(EMAIL)) {
            setSuccessFor(inputLEmail);
        }
        isLogged = true;
    })



}


function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setErrorForEmail(email) {
    let regax = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    return regax.test(email);
}