document.addEventListener('DOMContentLoaded', () => {

    // Variables

    //let baseDeDatos = [];

    let carrito = [];
    const DOMitems = document.getElementById('items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');


    const listaLibros = [{
            id: 1,
            nombre: "Atlas deAnatomia Humana Netter",
            precio: 2000,
            stock: 50,
            img: 'galeria/libros/netter.jpg'
        },
        {
            id: 2,
            nombre: "Anatomia Humana Latarjet",
            precio: 2800,
            stock: 50,
            img: 'galeria/libros/latarjet.jpg'
        },
        {
            id: 3,
            nombre: "Histologia Texto y Atlas Ross",
            precio: 3200,
            stock: 50,
            img: 'galeria/libros/ross.jpg'
        },
        {
            id: 4,
            nombre: "Tratado de Fisiologia Medica - Guyton y Hall",
            precio: 3000,
            stock: 50,
            img: 'galeria/libros/guyton.jpg'
        },
    ]

    // Funciones
    function renderizarProductos() {
        listaLibros.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.innerText = info.nombre;
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.innerText = `$${info.precio}`;
            //Stock
            const miNodoStock = document.createElement('p');
            miNodoStock.classList.add('card-text');
            miNodoStock.innerText = `Stock: ${info.stock}`;
            //Imagen
            const miNodoImagen = document.createElement('img')
            miNodoImagen.classList.add('imagen')
            miNodoImagen.setAttribute('src', info.img)
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary', 'mt-2');
            miNodoBoton.innerText = 'Agregar al Carrito';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', agregarProductoAlCarrito);
            // Insertamos
            miNodoCardBody.append(miNodoTitle);
            miNodoCardBody.append(miNodoPrecio);
            miNodoCardBody.append(miNodoStock);
            miNodoCardBody.append(miNodoImagen)
            miNodoCardBody.append(miNodoBoton);
            miNodo.append(miNodoCardBody);
            DOMitems.append(miNodo);
        });
    }

    /**
     * Evento para añadir un producto al carrito de la compra
     */
    function agregarProductoAlCarrito(e) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(e.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    /**
     * Dibuja todos los productos guardados en el carrito
     */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.innerText = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = listaLibros.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.innerText = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-secondary', 'mx-5');
            miBoton.innerText = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);

        });
        // Renderizamos el precio total en el HTML
        DOMtotal.innerText = `$${calcularTotal()}`;

    }

    /**
     * Evento para borrar un elemento del carrito
     */
    function borrarItemCarrito(e) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = e.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = listaLibros.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total

            return total + miItem[0].precio;
        }, 0).toFixed(2);

    }

    /**
     * Varia el carrito y vuelve a dibujarlo
     */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.removeItem('carrito');

    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage() {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (localStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);


    let botonComprar = document.getElementById('boton-comprar');
    if (botonComprar.addEventListener('click', comprarLibros)) {
        comprarLibros();
    }


    function comprarLibros() {
        Swal.fire({
            tittle: 'Aprobado!',
            text: 'Felicitaciones por su compra!',
            icon: 'success'
        })

    }

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();

});

// Para Oferta o Publicidad
/* setTimeout(() =>{
    Swal.fire({
        icon: 'success',
        text: "Alerta!",
        timer: 2000
    })
}, 3000) */


// Para confirmar vaciar el carrito o la compra de los productos
/* function vaciarCarrito() {
    Swal.fire({
        icon: 'warning',
        text: "Estas seguro de vaciar el carrito?",
        showDenyButtonText: true,
        confirmButtonText: 'Vaciar',
        denyButtonText: 'No Vaciar',
    }).then(() => {
        if (result.isConfirmed) {
            Swal.fire('Vaciamos el carrito!', '', 'success')
            toDoList.innerHTML = ""
            localStorage.clear()
        }
        else if(result.isDismissed){
            Swal.fire('No supimos que hacer, asique no hicimos nada', '', 'succcess')
        }
    })

} */