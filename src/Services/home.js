import {price} from "./inputValid2.js" ;


//LLAMADA A LA API PARA OBTENER LOS DATOS
const API = 'https://platzi-avo.vercel.app';

//variables para el carrito
export let cart = [];
let onclick = false;



//Instanciamos la clave para el formato de moneda
const priceFormat = new price();

//variables para el html
const amount = document.getElementById('amount');//cantidad de productos
let table = document.querySelector("table");//tabla de productos
let tableBody = document.createElement("tbody");//cuerpo de la tabla
const btn = document.getElementById('btn-cart');//BOTON OCULTAR CARRITO
const element = document.getElementById('element');//elemento para mostrar el carrito




document.addEventListener("DOMContentLoaded", (e) => {

    e.preventDefault();

    // element.style.visibility = "hidden";


    if (sessionStorage.getItem("cart")) {
        let data = JSON.parse(sessionStorage.getItem("cart"))
        printCarShop(data);


    } else {

        element.style.visibility = "hidden"

    }


});//DOMContentLoaded

btn.addEventListener('click', () => {


    if (!onclick) {
        element.style.visibility = "visible";
        onclick = true;
    } else if (onclick) {
        element.style.visibility = "hidden";
        onclick = false;
    }


});//PONE VISIBLE EL DETALLE DEL CARRITO


//FUNCION PARA PINTAR EL CARRITO
const fillCart = async () => await fetch(`${API}/api/avo`)
    .then(data => data.json())
    .then(data => {
            //Seleccionar el contenedor***
            const container = document.querySelector(".container");
            const value = document.querySelector('.value');
            data.data.forEach(element => {
                //Creamos las cartas que estaran dentro del container
                const cuerpo = document.createElement("div");
                cuerpo.classList.add("card");
                cuerpo.dataset.id = element.id;


                //Adanimos la imagen de aguacate en la carta
                const img = document.createElement("img");
                img.classList.add("img-aguacate");
                img.src = `${API}${element.image}`;
                img.dataset.id = element.id;

                //Adanimos el nombre del aguacate
                const name = document.createElement("h2");
                name.classList.add("name-aguacate");
                name.textContent = `${element.name}`;
                name.dataset.id = element.id;


                //Anadimos la descripcion del aguacate
                const description = document.createElement("small")
                description.classList.add("des-aguacate");
                description.textContent = (`${element.attributes.description}`);


                //Anadimos el precio del aguacate
                const price = document.createElement("p");
                price.classList.add("price-aguacate");
                price.textContent = priceFormat.formatPrice(element.price);

                //Anadimos el boton del aguacate
                const button = document.createElement("button");
                button.classList.add("btn-aguacate");
                button.textContent = "Add";
                button.dataset.id = element.id;



                //Lo inyectamos en el doc html
                container.appendChild(cuerpo);
                cuerpo.append(img, name, description, price, button);

                //Eventos con los botones
                cuerpo.addEventListener('click', (e) => {

                    viewProduct(e)
                });

                name.addEventListener('click', viewProduct);
                button.addEventListener('click', (e) => {

                    addToCart(e, data);
                });


            }).catch(Error => console.error(Error));


        }
    );

//Agregar al carrito
function addToCart(e, data) {

    onclick = true;
    const id = e.target.dataset.id; //Obtenemos el id del aguacate
    const product = data.data.find(product => product.id === id);//Obtenemos el aguacate
    const existing = cart.some(p => p.id === product.id);//Verificamos si el aguacate ya esta en el carrito


    if (existing) {

        cart.find(p => p.id === product.id).quantity++;//Si el aguacate ya esta en el carrito, aumentamos la cantidad

    } else {
        cart.push({...product, quantity: 1});//Si el aguacate no esta en el carrito, lo agregamos al carrito con una cantidad de 1
        amount.innerText = cart.length;

    }
    if (onclick) {

        element.style.visibility = "visible"

        sessionStorage.setItem("cart", JSON.stringify(cart));//Guardamos el carrito en el sessionStorage

        setTimeout(()=> {
            element.style.visibility = "hidden";

        }, 15000);



    }

    printCarShop(cart);//Pintamos el carrito




}

//FUNCION PARA VER EL DETALLE DEL PRODUCTO
function viewProduct(e) {
    if (e.target.classList.contains('card') || e.target.classList.contains('name-aguacate')) {
        const id = e.target.dataset.id;
        fetch(`${API}/api/avo/${id}`).then(prueba => prueba.json())
            .then(data => {
                    e.preventDefault();
                    localStorage.setItem('item', JSON.stringify(data));
                    window.location.href = 'details.html';


                    // Turbolinks.visit =('/public/details.html');


                }
            ).catch(err => {
            console.log(err)
        });


    }


}

//FUNCION PARA IMPRIMIR EL CARRITO
const printCarShop = (data) => {

    tableBody.innerHTML = "";


    data.forEach((item) => {
        let fila = document.createElement("tr");
        let image = document.createElement('img')
        let td = document.createElement("td");


        td.innerHTML = item.name;
        fila.appendChild(td);

        td = document.createElement("td");
        // image.src = item.image;
        image.src = `${API}${item.image}`;
        fila.appendChild(td);
        fila.appendChild(image);

        td = document.createElement("td");
        td.innerHTML = item.quantity;
        fila.appendChild(td);


        td = document.createElement("td");
        td.innerHTML = Math.round(item.price * item.quantity);
        fila.appendChild(td);

        tableBody.appendChild(fila);


    });

    table.appendChild(tableBody);


}

fillCart();




