// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
valor = prompt("introduzca un valor");

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    
    if(valor>=0){
        presupuesto = valor;
    }else{
        alert("numero menor que 0");
        presupuesto = -1;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    // TODO
    let texto;
    texto = `Tu presupuesto actual es de ${presupuesto} €`;
    return texto;
    
}

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
