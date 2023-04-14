//definicion de las clases con su constructor
class Compra{
    constructor(titulo, cantEntradas, modo, precioFinal){
        this.titulo = titulo;
        this.cantEntradas = cantEntradas;
        this.modo = modo;
        this.precioFinal = precioFinal;
    }
}

class Pelicula{
    constructor(id, titulo, sinopsis, director, precio, img){
        this.id = id;
        this.titulo = titulo; 
        this.sinopsis = sinopsis;
        this.director= director;
        this.precio = precio;
        this.img = img;
    }
}


//Instancia de los objetos pelicula por defecto
let peliculas = [];
let peliAntman = new Pelicula(1,"AntMan", "El doctor Hank Pym anuncia que abandona S.H.I.E.L.D. tras descubrir que han tratado de apropiarse de la tecnología de su Ant-Man, que Pym considera altamente peligrosa.", "Peyton Reed", 750, "../images/antman.webp");
let peliEverything = new Pelicula(2,"Everything everywhere all at once", "Una heroína inesperada debe usar sus nuevos poderes para luchar contra los desconcertantes peligros del multiverso y así lograr salvar su mundo.", "Daniel Scheinert", 500, "../images/eeaao.jpg");
let peliAvatar = new Pelicula(3,"Avatar 2", "Jake Sully y Ney'tiri han formado una familia y hacen todo lo posible por permanecer juntos.", "James Cameron", 800, "../images/avatar.avif");
let peliMario = new Pelicula(4,"Mario Bros", "Un fontanero llamado Mario viaja por un laberinto subterráneo con su hermano, Luigi, intentando salvar a una princesa capturada.", "Aaron Horvath", 400, "../images/mario.jpg")
let peliJhonWick = new Pelicula(5,"Jhon Wick 4", "Una exploración de las aventuras, las desgarradoras experiencias y las hazañas del legendario asesino a sueldo, John Wick.", "Chad Stahelski", 450, "../images/jhonwick.jpg");
let peliArgentina = new Pelicula(6,"Argentina, 1985", "Durante la década de 1980, un grupo de abogados investiga y lleva a juicio a los responsables de la dictadura cívico-militar argentina.", "Santiago Mitre", 1050, "../images/argentina.jpg")
peliculas.push(peliAntman, peliEverything, peliAvatar, peliMario, peliJhonWick, peliArgentina);
console.log(peliculas);

//función que crea una card en el index.html por cada pelicula
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let main =document.querySelector('.main-box');
let cart = document.querySelector('.carrito');

function crearCard(){
    peliculas.forEach((peli) => {
        main.innerHTML += `<div class="card">
                                <div class="img-box">
                                    <img src="${peli.img}"></img>
                                </div>
                                <h1>${peli.titulo} </h1>
                                <p>${peli.sinopsis} </p>
                                <span>Precio por entrada: $${peli.precio}</span>
                                <button id="peli-${peli.id}">Agregar</button>
                            </div>`;
    });
    funcionarBotones();
};

//funcion que permite darle funcionalidad a los botones y contar para el carrito
function funcionarBotones(){
    peliculas.forEach((peli) => {
        document.getElementById(`peli-${peli.id}`).addEventListener('click', ()=>{
            agregarAlCarrito(peli);
        });
    });
};

//funcion que me permite agregar una peli al carrito e ir aumentando la cantidad
function agregarAlCarrito(peli){
    let existe = carrito.some((element) => element.id == peli.id);
    if (!existe){
        peli.cantidad = 1;
        carrito.push(peli);
    } else{
        let miPeli = carrito.find((element) => element.id == peli.id);
        miPeli.cantidad++;
    }
    localStorage.setItem('carrito',JSON.stringify(carrito));
    mostrarCarrito();
}

//funcion que muestra los datos de la pelicula con sus precios
function mostrarCarrito(){
    cart.innerHTML = '';
    let total = carrito.reduce((acc,ite) => acc + ite.precio * ite.cantidad, 0)
    carrito.forEach((peli) => {
        let subTotal = peli.cantidad * peli.precio;
        cart.innerHTML += `<div class="card">
                                <p>Película: ${peli.titulo}</p>
                                <p>Cantidad: ${peli.cantidad}</p>
                                <span>Subtotal: $${subTotal}</span>
                            </div>`
    });
    cart.innerHTML += `<p> El total de su compra es de: $${total}</p>`
}

//funcion que me permite borrar los datos almacenados en el carrito
function limpiarCarrito(){
    carrito = [];
    localStorage.setItem('carrito',JSON.stringify(carrito));
    mostrarCarrito();
}

document.getElementById(`borrar`).addEventListener('click', ()=>{
    limpiarCarrito();
});

crearCard();
mostrarCarrito();