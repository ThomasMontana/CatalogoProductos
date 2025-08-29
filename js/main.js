// PRODUCTOS json
let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProd(productos);
    });



let indiceActual = 0;   // desde qué producto empezar
const cantidadPorPagina = 8;  // cuántos productos mostrar por click


/* contenedores de producto */
const contenedorProductos = document.querySelector("#contenedor-productos");
const btnCargarMas = document.querySelector("#btn-cargar-mas");


function cargarProd(){

    //contenedorProductos.innerHTML="";
    // mostrar desde indiceActual hasta indiceActual + cantidadPorPagina
    
    const productosAMostrar = productos.slice(indiceActual, indiceActual + cantidadPorPagina);

    productosAMostrar.forEach(producto =>{
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <p class="nombre">${producto.titulo}</p>
        `;
        contenedorProductos.append(div);
        
    })

    // actualizar índice
    indiceActual += cantidadPorPagina;

    // ocultar botón si ya no hay más productos
    if (indiceActual >= productos.length) {
        btnCargarMas.style.display = "none";
    }

}

/* evento del botón */
btnCargarMas.addEventListener("click", () => {
    cargarProd();
});


// cargar por categoria

function cargarProdCat(productosElegidos){

    contenedorProductos.innerHTML="";

    productosElegidos.forEach(producto =>{
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <p class="nombre">${producto.titulo}</p>
        `;
        contenedorProductos.append(div);
    })

}


/* categorias */

const botonesCategorias = document.querySelectorAll(".botones-categorias");

botonesCategorias.forEach(boton =>{
    boton.addEventListener("click",(e)=>{

        if(e.currentTarget.id != "todos"){
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProdCat(productosBoton);
            
            
        }else{
            contenedorProductos.innerHTML="";
            indiceActual = 0;   // desde qué producto empezar
            cargarProd();
        }
        
    })
})



/* nav responsive */
const nav = document.querySelector('.breadcrumb-nav');
const menu_btn = document.querySelector('.menu-btn');
const menu = document.querySelector('.sidebar');

    window.addEventListener('scroll', function(){
        nav.classList.toggle('active',window.scrollY >0)

    })

    menu_btn.addEventListener('click',() => {
        menu.classList.toggle('active')
    })
