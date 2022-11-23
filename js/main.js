// Libreria: SweetAlert2
(async () => {
    const { value: pais } = await Swal.fire({
        title: `Bienvenido!`,
        text: `Selecciona tu pais`,
        confirmButtonText: `Seleccionar`,
        confirmButtonAriaLbel: `Confirmar`,

        backdrop: true,

        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,

        input: `select`,
        inputPlaceholder: `Pais`,
        inputValue: ``,
        inputOptions: {
            argentina: `Argentina`,
            mexico: `Mexico`,
            chile: `Chile`,
            brasil: `Brasil`
        }
    });

    if (pais) {
        Swal.fire({
            title: `Seleccionaste ${pais}`
        });
    }
})();

// Creamos una clase con las caracteristicas de los objetos.

class Auto {
    constructor(id, marca, modelo, kilometraje, anio, precio, img1, img2, img3, img4) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.kilometraje = kilometraje;
        this.anio = anio;
        this.precio = precio;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
        this.img4 = img4;
        this.cantidad = 1;
    }
}

// Creamos los objetos.

const audi = new Auto(1, "Audi", "Q7 3.0 Ttfsi 333hp", "0Km", 2021, 158000, "img/audi/q7-01.jpg", "img/audi/q7-02.jpg", "img/audi/q7-03.jpg", "img/audi/q7-04.jpg");
const ford = new Auto(2, "Ford", "Maverick Xlt 4x2 At 253hp", "1000Km", 2022, 32900, "img/ford/maverick-01.jpg", "img/ford/maverick-02.jpg", "img/ford/maverick-03.jpg", "img/ford/maverick-04.jpg");
const nissan = new Auto(3, "Nissan", "Frontier 2.3bt 4x4 At 190hp", "0Km", 2022, 48600, "img/nissan/frontier-01.jpg", "img/nissan/frontier-02.jpg", "img/nissan/frontier-03.jpg", "img/nissan/frontier-04.jpg");
const peugeot = new Auto(4, "Peugeot", "308 1.6 S Gti 270hp", "49.000Km", 2018, 29990, "img/peugeot/308-01.jpg", "img/peugeot/308-02.jpg", "img/peugeot/308-03.jpg", "img/peugeot/308-04.jpg");
const renault = new Auto(5, "Renault", "Alaskan Iconic 4x4 AT 190hp", "0Km", 2022, 37000, "img/renault/alaskan-01.jpg", "img/renault/alaskan-02.jpg", "img/renault/alaskan-03.jpg", "img/renault/alaskan-04.jpg");
const volkswagen = new Auto(6, "Volkswagen", "Amarok 3.0 V6 224hp", "0Km", 2022, 54000, "img/volkswagen/amarok-01.jpg", "img/volkswagen/amarok-02.jpg", "img/volkswagen/amarok-03.jpg", "img/volkswagen/amarok-04.jpg");

// Creamos un array con todo el catalago de autos.

const autos = [audi, ford, nissan, peugeot, renault, volkswagen];

// Creamos el array carrito.

let carrito = [];

// Si hay algo en el localStorage, lo cargamos en el carrito.

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

// Modificamos el DOM mostrando los productos.

const contenedorAutos = document.getElementById("contenedorAutos");

// Creamos una funcion para mostrar los autos.

const mostrarAutos = () => {
    autos.forEach((auto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
            
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${auto.img1}" class="card-img-top" alt="${auto.modelo}">
                </div>
                <div class="carousel-item">
                    <img src="${auto.img2}" class="card-img-top" alt="${auto.modelo}">
                </div>
                <div class="carousel-item">
                    <img src="${auto.img3}" class="card-img-top" alt="${auto.modelo}">
                </div>
                <div class="carousel-item">
                    <img src="${auto.img4}" class="card-img-top" alt="${auto.modelo}">
                </div>
            </div>
        </div>

                <div class="card-body">
                    <h5 class="card-title"> ${auto.marca} ${auto.modelo} </h5>
                    <p class="card-text"> ${auto.anio} / ${auto.kilometraje} </p>
                    <p class="card-text"> USD$${auto.precio} </p>
                    <button class="btn colorBoton" id="boton${auto.id}"> Comprar </button>
                </div>

            </div>
        `

        contenedorAutos.appendChild(card);

        // Agregar autos al carrito.
        const boton = document.getElementById(`boton${auto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(auto.id);
        })
    })
}

// Funcion agregar al carrito.

const agregarAlCarrito = (id) => {
    const auto = autos.find((auto) => auto.id === id);
    const autoEnCarrito = carrito.find((auto) => auto.id === id);
    if (autoEnCarrito) {
        autoEnCarrito.cantidad++;
    } else {
        carrito.push(auto);
        // Trabajamos con el localStorage:
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    calcularTotal();
}

// Mostramos los autos.

mostrarAutos();

// Mostramos el carrito.

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

// Funcion para mostrar el carrito.

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((auto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${auto.img1}" class="card-img-top" alt="${auto.modelo}">
                <div class="card-body">
                    <h5 class="card-title"> ${auto.marca} ${auto.modelo} </h5>
                    <p class="card-text"> ${auto.anio} / ${auto.kilometraje} </p>
                    <p class="card-text"> USD$${auto.precio} </p>
                    <p class="card-text"> ${auto.cantidad} </p>
                    <button class="btn colorBoton" id="eliminar${auto.id}"> Eliminar auto </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        // Eliminar productos del carrito.
        const boton = document.getElementById(`eliminar${auto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(auto.id);
        })
    })
    calcularTotal();
}

// Función que elimina el producto del carrito.

const eliminarDelCarrito = (id) => {
    const auto = carrito.find((auto) => auto.id === id);
    const indice = carrito.indexOf(auto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    // localStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciamos todo el carrito de compras.

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

// Funcion para eliminar todo el carrito.

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    // Limpiamos el localStorage.
    localStorage.clear();
}

// Mostramos un mensaje con el total de la compra.

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((auto) => {
        totalCompra += auto.precio * auto.cantidad;
    })
    total.innerHTML = `USD$${totalCompra}`;
}

// Rutas relativas / Fetch()

const listado = document.getElementById("listado");
const listadoProductos = "json/juguetes.json";

fetch(listadoProductos)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach(juguete => {
            const card = document.createElement("div");
            card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
            card.innerHTML = `
                <div class="card">
                    <img src="${juguete.img}" class="card-img-top imgJuguete" alt="${juguete.modelo}">
                    <div class="card-body">
                        <h5 class="card-title"> ${juguete.marca} ${juguete.modelo} </h5>
                        <p class="card-text"> ${juguete.anio} / ${juguete.kilometraje} </p>
                        <p class="card-text"> USD$${juguete.precio} </p>
                        <button class="btn colorBoton" id="boton${juguete.id}"> Comprar </button>
                    </div>
                </div>
            `
            listado.appendChild(card);
        })
    })
    .catch(error => console.log(error))
    .finally(() => console.log("Proceso Finalizado"))

