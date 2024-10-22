// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// valor = prompt("introduzca un valor");

// TODO: Variable global
let presupuesto = 0;
let gastos =[];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    
    if ((isNaN(valor))||(valor<0)){
        return -1;
    }else{
        presupuesto = valor;
    }
    return presupuesto;
}
        
    

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
     
    
}

function CrearGasto(descripcion,valor,fecha,...etiquetas) {
    // TODO
    this.descripcion = descripcion;
        
        if ((isNaN(valor))||(valor<0)){
            this.valor =0;
        }else{
            this.valor = valor;
        }

        if(!fecha){
            this.fecha = new Date().toISOString();
        }else{
            this.fecha = Date.parse(fecha);
        }

        this.etiquetas = etiquetas.length ? etiquetas : [];

        
        
        
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

        this.anyadirEtiquetas = function(...nuevasEtiquetas){
            nuevasEtiquetas.forEach(etiqueta =>{
                if(!this.etiquetas.includes(etiqueta)){
                    this.etiquetas.push(etiqueta);
                }
            })
        }

        this.mostrarGastoCompleto = function(){
            const fechaLocal =new Date(fecha).toLocaleString();
            const salida = this.etiquetas.map(etiqueta => `- ${etiqueta}`).join('\n');
            
            return `Gasto correspondiente a ${descripcion} con valor ${valor} €.\n`+
            `Fecha: ${fechaLocal}\n`+
            `Etiquetas:\n${this.etiquetas.map(etiqueta => `- ${etiqueta}`).join('\n')}`;
        }

        this.actualizarFecha = function(fecha){
            const nuevaFecha = Date.parse(fecha);
            if (!isNaN(nuevaFecha)){
                this.fecha = nuevaFecha;
            }
        }
}

    function listarGastos(){
        return gastos;
    }
    
    function anyadirGasto(gasto){
        gastos.push(gasto);
        gasto.id =idGasto;
        idGasto++;
    }
    
    function borrarGasto(id){
        gastos = gastos.filter(gasto => gasto.id !==id);
    }
        
    function calcularTotalGastos(){
        let totalGasto = 0;
        for(let gasto of gastos){
            totalGasto += gasto.valor;
        }
        return totalGasto;
    }
        
    function calcularBalance(){
        
        let balance = presupuesto - calcularTotalGastos();
        return balance;
    }
        
    
    // NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
    // Las funciones y objetos deben tener los nombres que se indican en el enunciado
    // Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
    
    export {
        mostrarPresupuesto,
        actualizarPresupuesto,
        CrearGasto,
        listarGastos,
        anyadirGasto,
        borrarGasto,
        calcularTotalGastos,
        calcularBalance
    }
        

            
            
             
            
            

          
            

