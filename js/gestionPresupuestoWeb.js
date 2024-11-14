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
        gastoDiv.appendChild(document.createElement('br'));

       

        //Mostrar descripcion
        let GastoDescripcion = document.createElement('div');
        GastoDescripcion.classList.add('gasto-descripcion');
        GastoDescripcion.textContent = gasto.descripcion;
        gastoDiv.appendChild(GastoDescripcion);

        //Mostrar la fecha
        let GastoFecha = document.createElement('div');
        GastoFecha.classList.add('gasto-fecha');
        GastoFecha.textContent = gasto.fecha;
        gastoDiv.appendChild(GastoFecha);

        //Mostrar valor
        let GastoValor = document.createElement('div');
        GastoValor.classList.add('gasto-valor');
        GastoValor.textContent = gasto.valor;
        gastoDiv.appendChild(GastoValor);

        //Mostrar etiquetas
        let GastoEtiquetas = document.createElement('div');
        GastoEtiquetas.classList.add('gasto-etiquetas');
        // GastoEtiquetas.textContent = gasto.etiquetas;
        // gastoDiv.appendChild(GastoEtiquetas);
        // gastoDiv.appendChild(document.createElement('br'));

        



        //recorro las etiquetas y creo una clase gasto-etiquetas-etiquetas, añado su valor y lo añadimos a gasto-etiquetas
        for (let etiqueta of gasto.etiquetas) {
            
            let etiquetaSpan = document.createElement('span');
            etiquetaSpan.classList.add('gasto-etiquetas-etiqueta');
            etiquetaSpan.textContent = etiqueta;

            // GastoEtiquetas.appendChild(etiquetaSpan);
            
            let borrarEtiquetas = new BorrarEtiquetasHandle();
            borrarEtiquetas.datosGasto = gasto;
            borrarEtiquetas.datosEtiqueta = etiqueta;
            

            
            etiquetaSpan.addEventListener('click',borrarEtiquetas);
            
            GastoEtiquetas.appendChild(etiquetaSpan);
            GastoEtiquetas.appendChild(document.createTextNode("\u00a0"))
            

        }
        gastoDiv.appendChild(GastoEtiquetas);
        gastoDiv.appendChild(document.createElement('br'));

        

        
        

        //creamos un boton editar para cada gasto
        let editarBoton = document.createElement('button');
        // aplicamos el type button el texto Editar y la clase gasto-editar
        editarBoton.classList.add('gasto-editar');
        editarBoton.setAttribute("type","button");
        editarBoton.textContent = "Editar";
        
        // let editarManejador = Object.create(editarHandle);
        let editarManejador = new editarHandle();
        editarManejador.datosGasto = gasto;
        
        // Añadimos el objeto manejador de eventos al botón
        editarBoton.addEventListener('click',editarManejador);

        gastoDiv.appendChild(editarBoton);
        


        //creamos el boton borrar
        let borrarBoton = document.createElement('button');
        borrarBoton.classList.add('gasto-borrar');
        borrarBoton.setAttribute("type","button");
        borrarBoton.textContent = "Borrar";
        
        let borrarManejador = new BorrarHandle();
        
        borrarManejador.datosGasto = gasto;
        borrarBoton.addEventListener('click',borrarManejador);
        gastoDiv.appendChild(borrarBoton);
        
        //creamos el boton editar (formulario)
        let editarFormularioBoton = document.createElement('button');
        editarFormularioBoton.classList.add('gasto-editar-formulario');
        editarFormularioBoton.setAttribute("type","button");
        editarFormularioBoton.textContent = "Editar (formulario)";
       
        let editarFormularioManejador = new etitarFormularioHandle();
        editarFormularioManejador.datosGasto = gasto;
        editarFormularioBoton.addEventListener('click',editarFormularioManejador)
        gastoDiv.appendChild(editarFormularioBoton);


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
    let viejoListadoGastos = document.querySelectorAll('#listado-gastos-completo');
    viejoListadoGastos.forEach(function(div){
        div.innerHTML=""});
    mostrarDatoEnId('presupuesto',gestion.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales',Math.trunc(gestion.calcularTotalGastos()));
    mostrarDatoEnId('balance-total',Math.trunc(gestion.calcularBalance()));
    //limpiamos los contenido de #listado-gastos-completo
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
    
    let nuevoPresupuesto = gestion.actualizarPresupuesto(presupuesto);
    
    gestion.mostrarPresupuesto(nuevoPresupuesto);
    gestion.calcularBalance();
    repintar();
}

function nuevoGastoWeb(){
    let descripcion = prompt("introduzca la descripcion del gasto");
    
    let valor = Number(prompt("introduzca el importe del gasto"),10);
    
    let fecha =prompt("introduzca la fecha del gasto en formato yyyy-mm-dd");
    
    let etiqueta = prompt("introduzca las etiquetas separadas por comas");
    
    let etiquetas = etiqueta.split(',');
    
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

function editarHandle() {
    this.handleEvent = function(gasto){
        // this.datosGasto = gasto;
        let viejoPresupuesto = document.getElementById('presupuesto');
        viejoPresupuesto.remove();
        let viejoGasto = document.getElementById('gastos-totales');
        viejoGasto.remove();
        let viejoBalance = document.getElementById('balance-total');
        viejoBalance.remove();

        gasto = this.datosGasto;
        console.log("EditarHandle : " +this.datosGasto);
        
        let nuevaDescripcion = prompt("introduzca la descripcion del gasto",this.datosGasto.descripcion);
        let nuevoValor = Number(prompt("introduzca el importe del gasto",this.datosGasto.valor),10);
        
        let nuevaFecha =prompt("introduzca la fecha del gasto en formato yyyy-mm-dd",this.datosGasto.fecha);
        
        let nuevasEtiquetas = prompt("introduzca las etiquetas separadas por comas",this.datosGasto.etiquetas);
        
        

        //actualizamos las propiedades del gasto utilizando las funciones correspondientes
        gasto.actualizarDescripcion(nuevaDescripcion);
        gasto.actualizarValor(nuevoValor);
        gasto.actualizarFecha(nuevaFecha);
        if(nuevasEtiquetas !=""){
            gasto.anyadirEtiquetas(nuevasEtiquetas.split(','));
        }
        
        
        repintar();
    }
} 
function BorrarHandle(){
    this.handleEvent = function(gasto){
        let viejoPresupuesto = document.getElementById('presupuesto');
        viejoPresupuesto.remove();
        let viejoGasto = document.getElementById('gastos-totales');
        viejoGasto.remove();
        let viejoBalance = document.getElementById('balance-total');
        viejoBalance.remove();
        // this.datosGasto = gasto;
        gasto = this.datosGasto;
        console.log("BorrarHandle : " +this.datosGasto);
        gestion.borrarGasto(gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(gasto,etiqueta){
        console.log("se ha pulsado borrar etiquetas");
        gasto = this.datosGasto;
        // this.gasto = gasto;
        etiqueta = this.datosEtiqueta;
        // this.etiqueta = etiqueta;
        
        gasto.borrarEtiquetas(etiqueta);
        repintar();
    }
}

function submitHandle(){
    this.handleEvent = function(event){
        event.preventDefault();
        console.log("se ha entrado a submitHandle")
        
        //accedemos al elemento form
        var formulario = document.querySelector("form");
        let nuevaDescripcion = formulario.elements.descripcion.value;
        
        let nuevoValor = parseInt(formulario.elements.valor.value);
        
        let nuevaFecha = formulario.elements.fecha.value;
        
        let nuevasEtiquetas = formulario.elements.etiquetas.value;
        
        let gasto = new gestion.CrearGasto(nuevaDescripcion,nuevoValor,nuevaFecha,nuevasEtiquetas);
        gestion.anyadirGasto(gasto);
        
        repintar();
        
        let anyadirGastoFormulario = document.getElementById('anyadirgasto-formulario');
        anyadirGastoFormulario.disabled = false;
}
}

function etitarFormularioHandle(){
    this.handleEvent = function(gasto){
        console.log("se ha entrado en editarFormularioHandle");
        
         //creamos una copia del formulario y lo pintamos en interaccionHTML
    // this.datosGasto = gasto;
    
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    document.body.appendChild(plantillaFormulario);
    gasto = this.datosGasto;
    console.log(gasto);
    let formulario = document.querySelector('form');
    formulario.elements.descripcion.value = this.datosGasto.descripcion;
    formulario.elements.valor.value = this.datosGasto.valor;
    formulario.elements.fecha.value = this.datosGasto.fecha;
    formulario.elements.etiquetas.value = this.datosGasto.etiquetas;

    let enviar = formulario.querySelector('button[type="submit"]');
    let submit = new submitHandle();
    
    document.querySelector('button[type="submit"]').addEventListener('click',submit);

    
    }
}

function nuevoGastoWebFormulario(){
    //limpiamos los gastos actuales
    let viejoPresupuesto = document.getElementById('presupuesto');
    viejoPresupuesto.remove();
    let viejoGasto = document.getElementById('gastos-totales');
    viejoGasto.remove();
    let viejoBalance = document.getElementById('balance-total');
    viejoBalance.remove();
    let viejoListadoGastos = document.querySelectorAll('#listado-gastos-completo');
    viejoListadoGastos.forEach(function(div){
        div.innerHTML=""});

    

    //creamos una copia del formulario y lo pintamos en interaccionHTML
    let controlesprincipales = document.createElement('div');
    controlesprincipales.id = "controlesprincipales";
    document.body.append(controlesprincipales);
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    document.body.append(document.createElement('br'));
    controlesprincipales.append(plantillaFormulario);
    
    //deshabilitamos el boton añadirGastoFormulario
    let anyadirGastoFormulario = document.getElementById('anyadirgasto-formulario');
    
    anyadirGastoFormulario.disabled = true;
        
    
    
    let submit = new submitHandle();
    document.querySelector('button[type="submit"]').addEventListener('click',submit);
    
    
    
    
    
    
    

}
    

    
    
    





export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    editarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario
}


