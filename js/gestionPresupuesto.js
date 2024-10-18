// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// valor = prompt("introduzca un valor");

// TODO: Variable global
let presupuesto = 0;
let gastos ={};
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(valor>=0) {
        presupuesto = valor;
    }else if(valor<0){
        presupuesto = -1;
    }else{
      presupuesto = presupuesto;
    }
    return presupuesto;
}
        
    

function mostrarPresupuesto() {
    // TODO
    
    let texto;
    texto = `Tu presupuesto actual es de ${presupuesto} €`;
    return texto;
    
}

function CrearGasto(descripcion,valor) {
    // TODO
        if((typeof(valor) === "number")&& (valor>=0)){
            this.valor =valor;
            this.descripcion= descripcion;
        }
        else{
            this.valor = 0;
            this.descripcion = descripcion;
        }
        this.mostrarGasto = function(){
            return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
        }
        this.actualizarDescripcion = function(descripcion){
            this.descripcion = descripcion;
        }
        this.actualizarValor = function(valor){
            if(valor>=0){
                this.valor = valor;
            }
        }
}

        
    
    

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo

export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}

