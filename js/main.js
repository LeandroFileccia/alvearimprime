function Libro(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
}

const libro1 = new Libro('Atlas de Anatomia Humana Netter', 2000, 50);
const libro2 = new Libro('Anatomia Humana Latarjet', 2800, 50);
const libro3 = new Libro('Histologia Texto y Atlas Ross', 3200, 50);
const libro4 = new Libro('Tratado de Fisiologia Medica - Guyton y Hall', 3000, 50);

let listaLibros = [libro1, libro2, libro3, libro4]

const guardarLista = JSON.stringify(listaLibros);

localStorage.setItem("arrayLibros", guardarLista);

const traerLista = localStorage.getItem("arrayLibros");

const parsedArr = JSON.parse(traerLista)

for (let i = 0; i < parsedArr.length; i++) {
    let newRow = document.getElementById('tablaDeLibros').insertRow(-1);

    let newCell = newRow.insertCell(-1);
    newCell.innerHTML = '<label> Titulo: </label>';

    newCell = newRow.insertCell(-1);
    newCell.innerHTML = `<label> ${parsedArr[i].nombre} </label>`;

    newCell = newRow.insertCell(-1);
    newCell.innerHTML = '<label> Precio: </label>';

    newCell = newRow.insertCell(-1);
    newCell.innerHTML = `<label> ${parsedArr[i].precio} </label>`;

    newCell = newRow.insertCell(-1);
    newCell.innerHTML = '<label>Cantidad:</label>';

    newCell = newRow.insertCell(-1);
    newCell.innerHTML = `<input id='${parsedArr[i].nombre}' type='number' name='cantidad'  value='0' />`;

}

let botonAgregar = document.getElementById('comprarLibro');
botonAgregar.addEventListener('click', comprarLibro)

function comprarLibro() {

    Swal.fire({
        tittle: 'Aprobado!',
        text: 'Felicitaciones por su compra!',
        icon: 'success'
    })

    let total = 0;

    if (document.getElementById('tablaCompraDeLibros')) {
        document.getElementById('tablaCompraDeLibros').remove()
    };
    let table = document.createElement('table');
    table.id = 'tablaCompraDeLibros';

    for (let i = 0; i < parsedArr.length; i++) {

        let cantidad = document.getElementById(`${parsedArr[i].nombre}`).value;

        let newRow = table.insertRow(-1);

        newCell = newRow.insertCell(-1);
        newCell.innerHTML = '<label> Titulo: </label>';

        newCell = newRow.insertCell(-1);
        newCell.innerHTML = `<label> ${parsedArr[i].nombre} </label>`;

        newCell = newRow.insertCell(-1);
        newCell.innerHTML = '<label> Precio: </label>';

        newCell = newRow.insertCell(-1);
        newCell.innerHTML = `<label> ${parsedArr[i].precio} </label>`;

        newCell = newRow.insertCell(-1);
        newCell.innerHTML = '<label>Cantidad:</label>';

        if (parsedArr[i].stock < cantidad) {
            newCell = newRow.insertCell(-1);
            newCell.innerHTML = `<label>No tenemos sufiente stock, te debemos ${cantidad - parsedArr[i].stock} libros te puedo vender ${parsedArr[i].stock}</label>`;
            cantidad = parsedArr[i].stock
        } else {
            let newCell = newRow.insertCell(-1);
            newCell.innerHTML = `<label> ${cantidad} </label>`;
        }

        newCell = newRow.insertCell(-1);
        newCell.innerHTML = '<label>Total:</label>';

        newCell = newRow.insertCell(-1);
        newCell.innerHTML = `<label> ${cantidad * parsedArr[i].precio} </label>`;

        total += cantidad * parsedArr[i].precio;

    }

    let newRow = table.insertRow(-1);
    newCell = newRow.insertCell(-1);
    newCell.innerHTML = '<label>Total:</label>';

    newCell = newRow.insertCell(-1);
    newCell.innerHTML = `<label> ${total} </label>`;
    document.body.append(table);

}