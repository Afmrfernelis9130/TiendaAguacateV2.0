// import {validInput} from "./inputValid2.js"



const APIL = "/src/Model/user.json"
const APIR = "/src/Model/registerUser.json"


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
let isNotSave = false;

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    fetchDataLogin()

} );

btnRegister.addEventListener("click", (e) => {
    e.preventDefault();

    fetchDataRegister()

    register()

} );


const fetchDataLogin = async () => {

    try {
        const response = await fetch(APIL);
        const data = await response.json();

        login(data);


    }catch (e) {

        console.log(e)

    }

}

const fetchDataRegister = async () => {
    try {
        const response = await fetch(APIR);
        const data = await response.json();

        if (!isNotSave) {
            addRegister(data);
        }

    } catch (err) {
        console.log(err);
    }

}


//FUNCTION LOGIN
function login(data){

    const EMAIL = inputLEmail.value;
    const PASSWORD = inputLPassword.value;

//RECORRE EL ARRAY DE USUARIOS Y HACE LA VALIDACION
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



//FUNCTION REGISTER
function register() {

    //Capturar valor de los input y limpiar los espacios
    const USERNAME = inputRUsername.value.trim();
    const NAME = inputRName.value.trim();
    const EMAIL = inputREmail.value.trim();
    const PASSWORD = inputRPassword.value.trim();
    const PASSWORD2 = inputRPassword2.value.trim();

    console.log(USERNAME, NAME, EMAIL, PASSWORD, PASSWORD2)
    //Validar username

    if (NAME.length < 8) {
        setErrorFor(inputRUsername, 'Username must be at least 8 characters');

    }
    if (USERNAME.length > 8) {
        setSuccessFor(inputRUsername);

    }
    if (USERNAME==="") {
        setErrorFor(inputRUsername, 'Username is required');
        isNotSave = true;

    }
    if (USERNAME === USERNAME.toUpperCase() && !EMAIL==="") {
        setErrorFor(inputRUsername, 'Username must be in UpperCase');
        isNotSave = true;

    }
    if(EMAIL === "") {
        setErrorFor(inputREmail, 'Email is required');
        isNotSave = true;

    }
    else if(!setErrorForEmail(EMAIL)) {
        setErrorFor(inputREmail, 'Email is invalid');
        isNotSave = true;

    }
    else {
        setSuccessFor(inputLEmail);

    }
    if(PASSWORD === "") {
        setErrorFor(inputRPassword, 'Password is required');
        isNotSave = true;

    }
    if(PASSWORD2 === "") {
       setErrorFor(inputRPassword2, 'Password is required');
        isNotSave = true;

    }
    if(PASSWORD2 !== PASSWORD) {
        setErrorFor(inputRPassword2, 'not match');
        isNotSave = true;

    }


}

function addRegister(data) {
    const USERNAME = inputRUsername.value.trim();
    const NAME = inputRName.value.trim();
    const EMAIL = inputREmail.value.trim();
    const PASSWORD = inputRPassword.value.trim();
    const PASSWORD2 = inputRPassword2.value.trim();

    data.push({
        user: USERNAME,
        email: EMAIL,
        name: NAME,
        password: PASSWORD,
        password2: PASSWORD2,
    });

    console.log(data);

}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-register success';
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-register error';
    small.innerText = message;
}

function setErrorForEmail(email) {
    let regax = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    return regax.test(email);
}