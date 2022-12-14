import {price} from "./inputValid2.js" ;


const API = 'https://platzi-avo.vercel.app';

const stringItem = localStorage.getItem('item')
const itemObject = JSON.parse(stringItem);


let array = JSON.parse(sessionStorage.getItem("cart"))//buscar datos en el sessonStorage


//Formato de precio
const priceFormat = new price();
// //Seleccionar el contenedor***
const container = document.querySelector(".container");
//Seleccionar el contenedor de los atributos


document.addEventListener("DOMContentLoaded", () => {

    amount.innerHTML = array.length;


})

const containerAttributes = document.querySelector(".containerAttributes");
const amount = document.querySelector('.amount');//cantidad de productos

const detailCard = async () => await fetch(`${API}/api/avo`).then(prueba => prueba.json())
    .then(data => {
        const precio = itemObject.price;
        let arry = data.data.find(id => id.id === '2zd33b8c');

        //Crear una carta
        const card = document.createElement("div");
        card.classList.add("card");


        //Crear div para la cantidad y el boton
        const containerChild = document.createElement("div");
        containerChild.classList.add("addAmount");


        //Ananimos la imagen de aguacate en la carta
        const img = document.createElement("img");
        img.classList.add("img-descripcion");
        img.src = `${API}${itemObject.image}`;

        //Anadimos el nombre del aguacate
        const name = document.createElement("h1");
        name.classList.add("name-description");
        name.textContent = `${itemObject.name}`

        //Anadimos la descripcion
        const description = document.createElement("p");
        description.classList.add("desc-description");
        description.textContent = `${itemObject.attributes.description}`;

        //Anadimos el precio
        const price = document.createElement("p");
        price.classList.add("price-description");
        price.textContent = priceFormat.formatPrice(itemObject.price);

        //Anadimos el boton
        const button = document.createElement("button");
        button.classList.add("btn-description");
        button.textContent = "Add to card";

        //Anadimos input para la cantidad
        const input = document.createElement("input");
        input.classList.add("input-description");
        input.setAttribute("type", "number");


        //Anadimos los atributos

        //-----------------------------------------------
        const pShape = document.createElement("p");
        pShape.classList.add("pshape");
        pShape.textContent = `${itemObject.attributes.shape}`;

        //----------------------------------------------
        const pHardiness = document.createElement("p");
        pHardiness.classList.add("phardiness");
        pHardiness.textContent = `${itemObject.attributes.hardiness}`;

        //---------------------------------------------
        const pTaste = document.createElement("p");
        pTaste.classList.add("ptaste");
        pTaste.textContent = `${itemObject.attributes.taste}`;


        //Insertamos los elementos
        container.appendChild(card);
        card.append(img, name, description, price); //**Insertar imagen/desc/name/precio a la carta */
        card.appendChild(containerChild);
        containerAttributes.append(pShape, pHardiness, pTaste);
        card.appendChild(containerAttributes);
        containerChild.append(input, button);


        // Eventos

        button.addEventListener("click", () => {

            addToCart(itemObject, input, price, precio)

        })

        viewDetails(itemObject, input, price, precio)


    });

detailCard();


function addToCart(data, inputNumber, tagPrice, objPrice) {


    array.forEach(items => {


        if (items.id === data.id) {


            tagPrice.innerText = `$` + Math.round(objPrice * inputNumber.value)


        }


    })


} //agrega producro al carrito

function viewDetails(data, inputNumber, tagPrice, objPrice) {



    array.forEach(items => {




            if (items.id === data.id) {


                inputNumber.value = items.quantity

                tagPrice.innerText = `$` + Math.round(objPrice * items.quantity)


            }
            // else {
            //     const  wrongFoundError = TypeError("this article does not exist")
            //
            //     alert(wrongFoundError)
            // }






    })


} //te muestra el precio y la cantidad del producto






          
        
