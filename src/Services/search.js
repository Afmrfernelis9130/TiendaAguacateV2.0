

//Variables
const btnSearh = document.querySelector(".btn-search"); //Boton
const searhMenu = document.querySelector(".search-menu");//Barra de busqueda
const results = document.querySelector(".results");//Resultados de la busqueda
const cover = document.querySelector(".cover");//Pantalla de fondo oscura
const inputFind = document.querySelector(".input-find");// Input para el buscador



btnSearh.addEventListener('click',()=>{
    searhMenu.style.top = "70px";
    cover.style.display = "block";
    inputFind.focus();


})


cover.addEventListener('click', ()=>{
    searhMenu.style.top = "-80px";
    cover.style.display = "none";
    inputFind.value = "";
    results.style.display = "none";
})