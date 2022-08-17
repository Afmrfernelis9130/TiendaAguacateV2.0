// import {validInput} from "./inputValid2.js"


//API
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

//VARIABLES DE CONTROL
let isLogged=false
let isNotSave = false;


//EVENTOS   DE CONTROL
btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    fetchDataLogin()

} );
btnRegister.addEventListener("click", (e) => {
    e.preventDefault();

    fetchDataRegister()

    register()

} );

//LLAMADA A LA API DE LOGIN_REGISTER
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
            alert("The username field is required");
            console.log("Username is empty")

        }
        else if (PASSWORD === "" && !isLogged) {
            alert("The password field is required");
            console.log("Passwords is empty")

        }
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
        alert('Username must be at least 8 characters');

    }
    if (USERNAME==="") {
        alert( 'Username is required');
        isNotSave = true;

    }
    if (USERNAME === USERNAME.toUpperCase() && !EMAIL==="") {
        alert('Username must be in UpperCase');
        isNotSave = true;

    }
    if(EMAIL === "") {
        alert('Email is required');
        isNotSave = true;

    }

    if(PASSWORD === "") {
        alert('Password is required');
        isNotSave = true;

    }
    if(PASSWORD2 === "") {
      alert( 'Password is required');
        isNotSave = true;

    }
    if(PASSWORD2 !== PASSWORD) {
     alert('not match');
        isNotSave = true;

    }


}

function addRegister(data) {
    // const USERNAME = inputRUsername.value.trim();
    // const NAME = inputRName.value.trim();
    // const EMAIL = inputREmail.value.trim();
    // const PASSWORD = inputRPassword.value.trim();
    // const PASSWORD2 = inputRPassword2.value.trim();

    data.push({
        user: inputRUsername.value,
        email:inputREmail.value,
        name: inputRName.value,
        password: inputRPassword.value,
        password2: inputRPassword2.value,
    });

    console.log(data);


}