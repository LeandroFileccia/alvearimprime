let nombreLibroA = "Atlas de Anatomia Humana Netter"
let precioLibroA = 2000
let stockLibroA = 50

let nombreLibroB = "Anatomia Humana Latarjet"
let precioLibroB = 2800
let stockLibroB = 50

let nombreLibroC = "Histologia Texto y Atlas Ross"
let precioLibroC = 3200
let stockLibroC = 50

let nombreLibroD = "Tratado de Fisiologia Medica - Guyton y Hall"
let precioLibroD = 3000
let stockLibroD = 50

let cantidadCompras = prompt("Ingrese la cantidad de productos distintos que quiere comprar: \n- Atlas de Anatomia Humana Netter \n- Anatomia Humana Latarjet \n- Histologia Texto y Atlas Ross \n- Tratado de Fisiologia Medica - Guyton y Hall")
let precioTotal = 0;

function calculoPrecio(cantidad, precio){
    precioTotal += cantidad * precio
}

function calculoStock (cantidad, stock, precio){
    if(stock>= cantidad){
        calculoPrecio(cantidad, precio)
        alert("El precio total es de: $" + (cantidad* precio))
    }
    else{
        alert("No disponemos de esa cantidad en stock. Nuestro stock actual es de: " + stock + " unidades")
    }
}

for(let i =0; i< cantidadCompras; i++){
    let compra1 = prompt("Ingrese la opcion del libro que quiere comprar : \n1- Atlas de Anatomia Humana Netter \n2- Anatomia Humana Latarjet \n3- Histologia Texto y Atlas Ross \n4- Tratado de Fisiologia Medica - Guyton y Hall")
    let cantidad1 = prompt("Ingrese la cantidad del libro que quiere comprar: ")

    if(compra1 == "1"){
            calculoStock(cantidad1, stockLibroA, precioLibroA)
        }
        else if(compra1 == "2"){
            calculoStock(cantidad1, stockLibroB, precioLibroB)
        }
        else if(compra1 == "3"){
            calculoStock(cantidad1, stockLibroC, precioLibroC)
        }
        else if(compra1 == "4"){
            calculoStock(cantidad1, stockLibroD, precioLibroD)
        }
        else{
            alert("No tenemos ese libro.")
        }
    }

    function sumaIva (precio){
        return precio * 1.21
    }
    
    let precioTotalConImpuestos = sumaIva(precioTotal)
    
    alert("Este es el precio total final con impuestos de tu compra: $" + precioTotalConImpuestos)