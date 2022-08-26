fetch('../data.json')
    .then((resp) => resp.json())
    .then((data) => inicio(data))

function inicio(listaLibros) {
    
    let carrito = [];
    const DOMitems = document.getElementById('items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

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


    // Evento para añadir un producto al carrito de la compra

    function agregarProductoAlCarrito(e) {
        carrito.push(e.target.getAttribute('marcador'))
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }


    // Aparece los productos guardados en el carrito

    function renderizarCarrito() {
        DOMcarrito.innerText = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = listaLibros.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);

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

            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });

        DOMtotal.innerText = `$${calcularTotal()}`;

    }


    // Evento para borrar un elemento del carrito

    function borrarItemCarrito(e) {
        const id = e.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
        guardarCarritoEnLocalStorage();

    }

    // Calcula el precio total teniendo en cuenta los productos repetidos

    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = listaLibros.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);

    }

    // Varia el carrito y vuelve a dibujarlo

    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        localStorage.removeItem('carrito');

    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function guardarCompraEnLocalStorage() {
        let compra = JSON.parse(localStorage.getItem('compra'));
        console.log(compra)
        if (compra) {
            compra.push({
                compraNumero: compra[compra.length - 1].compraNumero + 1,
                compra: carrito,
                total: calcularTotal()
            })
            localStorage.setItem('compra', JSON.stringify(compra));
        } else {
            localStorage.setItem('compra', JSON.stringify(
                [{
                    compraNumero: 0,
                    compra: carrito,
                    total: calcularTotal()
                }]
            ));
        }
    }

    function cargarCarritoDeLocalStorage() {
        if (localStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }
    }


    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    let botonComprar = document.getElementById('boton-comprar');
    if (botonComprar.addEventListener('click', comprarLibros)) {
        comprarLibros();
    }

    function comprarLibros() {
        Swal.fire({
            title: 'Aprobado!',
            text: 'Felicitaciones por su compra!',
            icon: 'success'
        })
        guardarCompraEnLocalStorage();
    }

    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();



}
