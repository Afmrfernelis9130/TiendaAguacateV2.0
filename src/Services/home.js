import {price} from "./inputValid2.js" ;

//Crear variable para agregar al carrito
//  var Turbolinks = require ("turbolinks");
//  Turbolinks.start();

let cart = [];
let cantidad;

//Api para el aguacate
const API = 'https://platzi-avo.vercel.app';
//Instanciamos la clave para el formato de moneda
const priceFormat = new price();

//FUNCION PARA VER LA CANTIDAD DE PRODUCTOS EN EL CARRITO
const amount = document.getElementById('amount');

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
    const id = e.target.dataset.id; //Obtenemos el id del aguacate
    const product = data.data.find(product => product.id === id);

    //Verificamos si el aguacate ya esta en el carrito
    if (!cart.includes(product)) {

        cart.push(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                sku: product.sku,
                image: product.image,
                attributes: product.attributes,
                quantity: cantidad

            }
        );


        amount.innerText = cart.length;

    } else {

        cart.push(
            {

                quantity: cantidad++
            }
        );


        alert("El producto ya esta en el carrito");
    }

}

//FUNCION PARA VER EL DETALLE DEL PRODUCTO
function viewProduct(e) {
    if (e.target.classList.contains('card') || e.target.classList.contains('name-aguacate')) {
        const id = e.target.dataset.id;
        fetch(`${API}/api/avo/${id}`).then(prueba => prueba.json())
            .then(data => {
                    e.preventDefault();
                    localStorage.setItem('item', JSON.stringify(data));
                    window.location.href = '/public/details.html';


                    // Turbolinks.visit =('/public/details.html');


                }
            ).catch(err => {
            console.log(err)
        });


    }


}

fillCart();