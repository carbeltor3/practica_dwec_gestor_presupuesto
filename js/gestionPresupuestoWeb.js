import { agruparGastos, calcularBalance, calcularTotalGastos } from "./gestionPresupuesto.js";
import * as gestion from "./gestionPresupuesto.js" ;
function mostrarDatoEnId(idElemento, valor) {

    let divPresupuesto = document.createElement('div');
    divPresupuesto.id = idElemento;
    divPresupuesto.textContent = valor;
    document.body.appendChild(divPresupuesto);
}

function mostrarGastoWeb(idElemento, gastos) {


    for (let gasto of gastos) {
        //creo el div y le agrego la clase idElemento
        let divGasto = document.createElement('div');
        divGasto.id = idElemento;
        document.body.appendChild(divGasto);

        let gastoDiv = document.createElement('div');
        gastoDiv.classList.add('gasto');
        divGasto.appendChild(gastoDiv);

        //creo el div con la clase gasto-descripcion, le añado el texto descripcion y lo añado al div gasto
        let GastoDescripcion = document.createElement('div');
        GastoDescripcion.classList.add('gasto-descripcion');
        GastoDescripcion.textContent = gasto.descripcion;
        gastoDiv.appendChild(GastoDescripcion);

        //creo el div con la clase gasto-fecha, le añado la fecha y lo añado al div gasto
        let GastoFecha = document.createElement('div');
        GastoFecha.classList.add('gasto-fecha');
        GastoFecha.textContent = gasto.fecha;
        gastoDiv.appendChild(GastoFecha);

        //creo el div con la clase gasto-valor, le añado su valor y lo añado al div gasto
        let GastoValor = document.createElement('div');
        GastoValor.classList.add('gasto-valor');
        GastoValor.textContent = gasto.valor;
        gastoDiv.appendChild(GastoValor);

        //creo el div con la clase gasto-etiquetas
        let GastoEtiquetas = document.createElement('div');
        GastoEtiquetas.classList.add('gasto-etiquetas');
        // GastoEtiquetas.textContent = gasto.etiquetas;
        gastoDiv.appendChild(GastoEtiquetas);

        //recorro las etiquetas y creo una clase gasto-etiquetas-etiquetas, añado su valor y lo añadimos a gasto-etiquetas
        for (let etiqueta of gasto.etiquetas) {
            let etiquetaSpan = document.createElement('span');
            etiquetaSpan.classList.add('gasto-etiquetas-etiqueta');
            etiquetaSpan.textContent = etiqueta;
            GastoEtiquetas.appendChild(etiquetaSpan);
        }


        //por ultimo añadimos GastoEtiquetas a divGasto
        // GastoValor.appendChild(GastoEtiquetas);
    }
}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // let per = obtenerPeriodoAgrupacion(periodo);
    //creo el contenedor principal
    let elemento = document.createElement('div');
    elemento.id = idElemento;
    document.body.appendChild(elemento);

    let divAgrupacion = document.createElement('div');
    divAgrupacion.classList.add("agrupacion");
    elemento.appendChild(divAgrupacion);

    //creo el encabezado con su descripcion y lo añado al contenedor principal
    let encabezado = document.createElement('h1');
    encabezado.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(encabezado);

    //recorremos las propiedades de agrup
    // Object.entries(agrup).forEach(([clave,valor])=>{
    Object.entries(agrup).forEach(([clave, valor]) => {

        let divAgrupDato = document.createElement('div');
        divAgrupDato.classList.add("agrupacion-dato");
        divAgrupacion.appendChild(divAgrupDato);

        let spanDatoClave = document.createElement('span');
        spanDatoClave.classList.add("agrupacion-dato-clave");
        spanDatoClave.textContent = clave;
        divAgrupDato.appendChild(spanDatoClave);

        let spanDatoValor = document.createElement('span');
        spanDatoValor.classList.add("agrupacion-dato-valor");
        spanDatoClave.textContent = valor;
        divAgrupDato.appendChild(spanDatoValor);

        // divAgrupacion.appendChild(divAgrupDato);
    });
    elemento.appendChild(divAgrupacion);


}

function repintar(){
    //limpiamos los contenido de #listado-gastos-completo
    let viejoListadoGastos = document.querySelectorAll('#listado-gastos-completo');
    viejoListadoGastos.forEach(function(div){
        div.innerHTML=""});

    mostrarDatoEnId('presupuesto',gestion.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales',Math.trunc(gestion.calcularTotalGastos()));
    mostrarDatoEnId('balance-total',Math.trunc(gestion.calcularBalance()));
    
    mostrarDatoEnId('listado-gastos-completo',mostrarGastoWeb('listado-gastos-completo',gestion.filtrarGastos({fechaDesde:"",fechaHasta:""})));
}

function actualizarPresupuestoWeb(){
    let viejoPresupuesto = document.getElementById('presupuesto');
    viejoPresupuesto.remove();
    let viejoGasto = document.getElementById('gastos-totales');
    viejoGasto.remove();
    let viejoBalance = document.getElementById('balance-total');
    viejoBalance.remove();
    let presupuesto = parseInt(prompt("introduzca el presupuesto"));
    console.log ("el valor introducido es : " + presupuesto);
    let nuevoPresupuesto = gestion.actualizarPresupuesto(presupuesto);
    console.log(`Tu presupuesto actual es de : ${nuevoPresupuesto}`);
    gestion.mostrarPresupuesto(nuevoPresupuesto);
    gestion.calcularBalance();
    repintar();
}

function nuevoGastoWeb(){
    const descripcion = prompt("introduzca la descripcion del gasto");
    console.log(descripcion);
    const valor = Number(prompt("introduzca el importe del gasto"),10);
    console.log(valor);
    const fecha = Date.parse(prompt("introduzca la fecha del gasto en formato yyyy-mm-dd"));
    console.log(fecha);
    const etiqueta = prompt("introduzca las etiquetas separadas por comas");
    console.log(etiqueta);
    const etiquetas = etiqueta.split(',');
    console.log(etiquetas);
    const gasto1 = new gestion.CrearGasto(descripcion, valor, fecha, etiquetas);
    gestion.anyadirGasto(gasto1);
    let viejoPresupuesto = document.getElementById('presupuesto');
    viejoPresupuesto.remove();
    let viejoGasto = document.getElementById('gastos-totales');
    viejoGasto.remove();
    let viejoBalance = document.getElementById('balance-total');
    viejoBalance.remove();
    repintar();
    


}




export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
    
}


