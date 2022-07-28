function Libro (nombre, precio, stock){
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
}
    
const libro1 = new Libro ("Atlas de Anatomia Humana Netter", 2000, 50);
const libro2 = new Libro ("Anatomia Humana Latarjet", 2800, 50);
const libro3 = new Libro ("Histologia Texto y Atlas Ross", 3200, 50);
const libro4 = new Libro ("Tratado de Fisiologia Medica - Guyton y Hall", 3000, 50);

let listaLibros = [libro1, libro2, libro3, libro4]

let nombresLibros = listaLibros.map((libro) => libro.nombre)

let cantidadCompras = prompt("Indique la cantidad de libros distintos que quiere comprar: " + "\n "+nombresLibros.join("\n "))
let precioTotal = 0;

function calculoPrecio(cantidad, precio){
    precioTotal += cantidad * precio
}

function calculoStock (cantidad, libro){
    if(libro.stock>= cantidad){
        calculoPrecio(cantidad, libro.precio)
        alert("El precio total es de: $" + (cantidad* libro.precio))
        alert("Compraste: " + libro.nombre)
    }
    else{
        alert("No contamos con esa cantidad. Nuestro stock actual es de: " + stock + " unidades")
    }
}

function sumaIva(precio){
    return precio * 1.21
}

for(let i =0; i< cantidadCompras; i++){
    let compra1 = prompt("Ingrese la opcion del libro que quiere comprar : \n1- Atlas de Anatomia Humana Netter \n2- Anatomia Humana Latarjet \n3- Histologia Texto y Atlas Ross \n4- Tratado de Fisiologia Medica - Guyton y Hall")
    let cantidad1 = prompt("Ingrese la cantidad del libro que quiere comprar: ")

    if(compra1 == "1"){
            calculoStock(cantidad1, libro1)
        }
        else if(compra1 == "2"){
            calculoStock(cantidad1, libro2)
        }
        else if(compra1 == "3"){
            calculoStock(cantidad1, libro3)
        }
        else if(compra1 == "4"){
            calculoStock(cantidad1, libro4)
        }
        else{
            alert("No tenemos ese libro.")
        }
    }

    let precioTotalConImpuestos = sumaIva(precioTotal)
    alert("Este es el precio total final con impuestos de tu compra: $" + precioTotalConImpuestos)