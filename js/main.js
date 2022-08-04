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

for (var i = 0; i < listaLibros.length; i++) {
    var newRow = document.getElementById('tablaDeLibros').insertRow(-1);

    var newCell = newRow.insertCell(-1);
    newCell.innerHTML = '<label> Titulo: </label>';

    var newCell = newRow.insertCell(-1);
    newCell.innerHTML = `<label> ${listaLibros[i].nombre} </label>`;

    var newCell = newRow.insertCell(-1);
    newCell.innerHTML = '<label> Precio: </label>';

    var newCell = newRow.insertCell(-1);
    newCell.innerHTML = `<label> ${listaLibros[i].precio} </label>`;

    newCell = newRow.insertCell(-1);
    newCell.innerHTML = '<label>Cantidad:</label>';

    newCell = newRow.insertCell(-1);
    newCell.innerHTML = `<input id='${listaLibros[i].nombre}' type='number' name='cantidad'  value='0' />`;

}

var botonAgregar = document.getElementById('comprarLibro');
botonAgregar.addEventListener('click', comprarLibro)

function comprarLibro() {
    var total = 0;

    if (document.getElementById('tablaCompraDeLibros')) {
        document.getElementById('tablaCompraDeLibros').remove()
    };
    var table = document.createElement('table');
    table.id = 'tablaCompraDeLibros';

    for (var i = 0; i < listaLibros.length; i++) {

        let cantidad = document.getElementById(`${listaLibros[i].nombre}`).value;

        var newRow = table.insertRow(-1);

        var newCell = newRow.insertCell(-1);
        newCell.innerHTML = '<label> Titulo: </label>';

        var newCell = newRow.insertCell(-1);
        newCell.innerHTML = `<label> ${listaLibros[i].nombre} </label>`;

        var newCell = newRow.insertCell(-1);
        newCell.innerHTML = '<label> Precio: </label>';

        var newCell = newRow.insertCell(-1);
        newCell.innerHTML = `<label> ${listaLibros[i].precio} </label>`;

        newCell = newRow.insertCell(-1);
        newCell.innerHTML = '<label>Cantidad:</label>';

        if (listaLibros[i].stock < cantidad) {
            newCell = newRow.insertCell(-1);
            newCell.innerHTML = `<label>No tenemos sufiente stock, te debemos ${cantidad - listaLibros[i].stock} libros te puedo vender ${listaLibros[i].stock}</label>`;
            cantidad = listaLibros[i].stock
        } else {
            var newCell = newRow.insertCell(-1);
            newCell.innerHTML = `<label> ${cantidad} </label>`;
        }

        newCell = newRow.insertCell(-1);
        newCell.innerHTML = '<label>Total:</label>';

        var newCell = newRow.insertCell(-1);
        newCell.innerHTML = `<label> ${cantidad * listaLibros[i].precio} </label>`;

        total += cantidad * listaLibros[i].precio;
    }

    var newRow = table.insertRow(-1);
    newCell = newRow.insertCell(-1);
    newCell.innerHTML = '<label>Total:</label>';

    var newCell = newRow.insertCell(-1);
    newCell.innerHTML = `<label> ${total} </label>`;

    document.body.append(table);

}