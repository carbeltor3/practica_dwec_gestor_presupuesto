import { agruparGastos, calcularBalance, calcularTotalGastos } from "./gestionPresupuesto.js";
import * as gestion from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    let miDiv = document.querySelector(`#${idElemento}`);
    if(!miDiv) {
        miDiv = document.createElement('div');
        miDiv.id = idElemento;
        document.body.appendChild(miDiv);
    }
    miDiv.textContent = valor;
}

function mostrarGastoWeb(idElemento, gastos) {
    let miDiv = document.querySelector(`#${idElemento}`);
    if(!miDiv) {
        miDiv = document.createElement('div');
        miDiv.id = idElemento;
        document.body.appendChild(miDiv);
    }
    for (let gasto of gastos) {

        let gastoDiv = document.createElement('div');
        gastoDiv.classList.add('gasto');

        //Mostrar descripcion
        let GastoDescripcion = document.createElement('div');
        GastoDescripcion.classList.add('gasto-descripcion');
        GastoDescripcion.textContent = gasto.descripcion;
        gastoDiv.appendChild(GastoDescripcion);

        //Mostrar la fecha
        let GastoFecha = document.createElement('div');
        GastoFecha.classList.add('gasto-fecha');
        GastoFecha.textContent = new Date(gasto.fecha).toLocaleDateString("es");
        gastoDiv.appendChild(GastoFecha);

        //Mostrar valor
        let GastoValor = document.createElement('div');
        GastoValor.classList.add('gasto-valor');
        GastoValor.textContent = gasto.valor;
        gastoDiv.appendChild(GastoValor);

        //Mostrar etiquetas
        let GastoEtiquetas = document.createElement('div');
        GastoEtiquetas.classList.add('gasto-etiquetas');

        //recorro las etiquetas y creo una clase gasto-etiquetas-etiquetas, añado su valor y lo añadimos a gasto-etiquetas
        for (let etiqueta of gasto.etiquetas) {
            let etiquetaSpan = document.createElement('span');
            etiquetaSpan.classList.add('gasto-etiquetas-etiqueta');
            etiquetaSpan.textContent = etiqueta;

            // GastoEtiquetas.appendChild(etiquetaSpan);

            let borrarEtiquetas = new BorrarEtiquetasHandle();
            borrarEtiquetas.datosGasto = gasto;
            borrarEtiquetas.datosEtiqueta = etiqueta;
            etiquetaSpan.addEventListener('click', borrarEtiquetas);

            GastoEtiquetas.appendChild(etiquetaSpan);
            GastoEtiquetas.appendChild(document.createTextNode("\u00a0"));
        }

        gastoDiv.appendChild(GastoEtiquetas);
        gastoDiv.appendChild(document.createElement('br'));

        //creamos un boton editar para cada gasto
        let editarBoton = document.createElement('button');
        // aplicamos el type button el texto Editar y la clase gasto-editar
        editarBoton.classList.add('gasto-editar');
        editarBoton.setAttribute("type", "button");
        editarBoton.textContent = "Editar";

        // let editarManejador = Object.create(editarHandle);
        let editarManejador = new editarHandle();
        editarManejador.datosGasto = gasto;

        // Añadimos el objeto manejador de eventos al botón
        editarBoton.addEventListener('click', editarManejador);
        gastoDiv.appendChild(editarBoton);

        //creamos el boton borrar
        let borrarBoton = document.createElement('button');
        borrarBoton.classList.add('gasto-borrar');
        borrarBoton.setAttribute("type", "button");
        borrarBoton.textContent = "Borrar";

        let borrarManejador = new BorrarHandle();

        borrarManejador.datosGasto = gasto;
        borrarBoton.addEventListener('click', borrarManejador);
        gastoDiv.appendChild(borrarBoton);

        //creamos el boton borrar-api
        let borrarBotonApi = document.createElement('button');
        borrarBotonApi.classList.add('gasto-borrar-api');
        borrarBotonApi.setAttribute("type","button");
        borrarBotonApi.textContent = "Borrar (API)";
        let borrarManejadorApi = new BorrarApiHandle();
        borrarManejadorApi.datosGasto = gasto;
        borrarBotonApi.addEventListener('click',borrarManejadorApi);
        gastoDiv.appendChild(borrarBotonApi);

        //creamos el boton editar (formulario)
        let editarFormularioBoton = document.createElement('button');
        editarFormularioBoton.classList.add('gasto-editar-formulario');
        editarFormularioBoton.setAttribute("type", "button");
        editarFormularioBoton.textContent = "Editar (formulario)";

        let editarFormularioManejador = new etitarFormularioHandle();
        editarFormularioManejador.datosGasto = gasto;
        editarFormularioBoton.addEventListener('click', editarFormularioManejador)

        gastoDiv.appendChild(editarFormularioBoton);

        //por ultimo añadimos GastoEtiquetas a divGasto
        // GastoValor.appendChild(GastoEtiquetas);
        miDiv.appendChild(gastoDiv);
    }
}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // let per = obtenerPeriodoAgrupacion(periodo);
    //creo el contenedor principal
    let elemento = document.createElement('div');
    elemento.id = idElemento;
    document.body.appendChild(elemento);
    
    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";
    

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


    // Estilos
    divP.style.width = "33%";
    divP.style.display = "inline-block";
    // Crear elemento <canvas> necesario para crear la gráfica
    // https://www.chartjs.org/docs/latest/getting-started/
    let chart = document.createElement("canvas");
    // Variable para indicar a la gráfica el período temporal del eje X
    // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
    let unit = "";
    switch (periodo) {
    case "anyo":
        unit = "year";
        break;
    case "mes":
        unit = "month";
        break;
    case "dia":
    default:
        unit = "day";
        break;
    }

    // Creación de la gráfica
    // La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
    const myChart = new Chart(chart.getContext("2d"), {
        // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
        type: 'bar',
        data: {
            datasets: [
                {
                    // Título de la gráfica
                    label: `Gastos por ${periodo}`,
                    // Color de fondo
                    backgroundColor: "#555555",
                    // Datos de la gráfica
                    // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                    data: agrup
                }
            ],
        },
        options: {
            scales: {
                x: {
                    // El eje X es de tipo temporal
                    type: 'time',
                    time: {
                        // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                        unit: unit
                    }
                },
                y: {
                    // Para que el eje Y empieza en 0
                    beginAtZero: true
                }
            }
        }
});
// Añadimos la gráfica a la capa
divP.append(chart);

}

function repintar() {
    let viejoListadoGastos = document.querySelectorAll('#listado-gastos-completo');
    viejoListadoGastos.forEach(function (div) {
        div.remove()
    });
    mostrarDatoEnId('presupuesto', gestion.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', Math.trunc(gestion.calcularTotalGastos()));

    mostrarDatoEnId('balance-total', Math.trunc(gestion.calcularBalance()));
    //limpiamos los contenido de #listado-gastos-completo
    mostrarGastoWeb('listado-gastos-completo', gestion.filtrarGastos({}));
    //mostramos la grafica
    mostrarGastosAgrupadosWeb('agrupacion-dia',gestion.agruparGastos("dia", ["casa","comida","supermercado","transporte","seguros"], "2020-05-26", "2021-10-08"),'día');
    mostrarGastosAgrupadosWeb('agrupacion-mes',gestion.agruparGastos("mes", ["casa","comida","supermercado","transporte","seguros"], "2020-05-26", "2021-10-08"),'mes');
    mostrarGastosAgrupadosWeb('agrupacion-anyo',gestion.agruparGastos("anyo", ["casa","comida","supermercado","transporte","seguros"], "2020-05-26", "2021-10-08"),'año');

}

function actualizarPresupuestoWeb() {
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

function nuevoGastoWeb() {
    

    
    let descripcion = prompt("introduzca la descripcion del gasto");
    
    let valor = Number(prompt("introduzca el importe del gasto"), 10);
    
    let fecha = prompt("introduzca la fecha del gasto en formato yyyy-mm-dd");
    
    let etiqueta = prompt("introduzca las etiquetas separadas por comas");

    let etiquetas = etiqueta.split(',');
    
    const gasto1 = new gestion.CrearGasto(descripcion, valor, fecha, etiquetas);
    gestion.anyadirGasto(gasto1);
    
    

    repintar();



}

function editarHandle() {
    this.handleEvent = function (gasto) {
        // this.datosGasto = gasto;
        let viejoPresupuesto = document.getElementById('presupuesto');
        viejoPresupuesto.remove();
        let viejoGasto = document.getElementById('gastos-totales');
        viejoGasto.remove();
        let viejoBalance = document.getElementById('balance-total');
        viejoBalance.remove();

        gasto = this.datosGasto;
        console.log("EditarHandle : " + this.datosGasto);

        let nuevaDescripcion = prompt("introduzca la descripcion del gasto", this.datosGasto.descripcion);
        let nuevoValor = Number(prompt("introduzca el importe del gasto", this.datosGasto.valor), 10);

        let nuevaFecha = prompt("introduzca la fecha del gasto en formato yyyy-mm-dd", this.datosGasto.fecha);

        let nuevasEtiquetas = prompt("introduzca las etiquetas separadas por comas", this.datosGasto.etiquetas);



        //actualizamos las propiedades del gasto utilizando las funciones correspondientes
        gasto.actualizarDescripcion(nuevaDescripcion);
        gasto.actualizarValor(nuevoValor);
        gasto.actualizarFecha(nuevaFecha);
        if (nuevasEtiquetas != "") {
            gasto.anyadirEtiquetas(nuevasEtiquetas.split(','));
        }


        repintar();
    }
}
function BorrarHandle() {
    this.handleEvent = function (gasto) {
        let viejoPresupuesto = document.getElementById('presupuesto');
        viejoPresupuesto.remove();
        let viejoGasto = document.getElementById('gastos-totales');
        viejoGasto.remove();
        let viejoBalance = document.getElementById('balance-total');
        viejoBalance.remove();
        // this.datosGasto = gasto;
        gasto = this.datosGasto;
        console.log("BorrarHandle : " + this.datosGasto);
        gestion.borrarGasto(gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (gasto, etiqueta) {
        console.log("se ha pulsado borrar etiquetas");
        gasto = this.datosGasto;
        // this.gasto = gasto;
        etiqueta = this.datosEtiqueta;
        // this.etiqueta = etiqueta;

        gasto.borrarEtiquetas(etiqueta);
        repintar();
    }
}

function BorrarApiHandle(){
    this.handleEvent = function (gasto){
        console.log("se ha pulsado borrar etiquetas");
        gasto = this.datosGasto;
        const usuario = document.querySelector('#nombre_usuario').value;
        console.log(gasto);
        const gastoId = gasto.gastoId;
        
        

        if (!usuario || !gastoId ) {
            console.error('El nombre de usuario o el gastoId son inválidos');
            return;
          }
        
        // Construir la URL de la API con el nombre de usuario y gastoId
        const url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${gastoId}`;

        // Realizar la solicitud DELETE
        fetch(url, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(response => {
            if (response.ok) {
            console.log(`Gasto con ID ${gastoId} borrado correctamente.`);
            // Llamar a la función cargarGastosApi para actualizar la lista de gastos
            cargarGastosApi();
            } else {
            console.error('Error al borrar el gasto.');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud DELETE:', error);
        });
    }
        

    }


function submitHandle() {
    this.handleEvent = function (event) {
        event.preventDefault();
        console.log("se ha entrado a submitHandle")

        //accedemos al elemento form
        var formulario = document.querySelector("form");

        let nuevaDescripcion = formulario.elements.descripcion.value;

        let nuevoValor = parseInt(formulario.elements.valor.value);

        let nuevaFecha = formulario.elements.fecha.value;

        let nuevasEtiquetas = formulario.elements.etiquetas.value;

        let gasto = new gestion.CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, nuevasEtiquetas);
        gestion.anyadirGasto(gasto);


        repintar();

        let anyadirGastoFormulario = document.getElementById('anyadirgasto-formulario');
        anyadirGastoFormulario.disabled = false;
    }
}

function etitarFormularioHandle() {
    this.handleEvent = function (evento) {

        let form = document.querySelector('form');
        if (form) form.remove();
        const elmBoton = evento.target;

        console.log(elmBoton);
        //creamos una copia del formulario y lo pintamos en interaccionHTML
        // this.datosGasto = gasto;

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

        elmBoton.parentElement.appendChild(plantillaFormulario);
        let btnEditarFormulario = elmBoton.parentElement.querySelector('.gasto-editar-formulario');
        btnEditarFormulario.disabled = true;






        let formulario = document.querySelector('form');
        // formulario.setAttribute('id', `form_${this.datosGasto.id}`);
        formulario.elements.descripcion.value = this.datosGasto.descripcion;
        formulario.elements.valor.value = this.datosGasto.valor;
        formulario.elements.fecha.value = this.datosGasto.fecha ;
        formulario.elements.etiquetas.value = this.datosGasto.etiquetas;

        // Boton Enviar
        //modificamos cualquier campo y mandamos a actualizar los datos
        let enviar = formulario.querySelector('button[type="submit"]');
        let enviarFormularioManejador = new submitHandleEditarFormulario();
        enviarFormularioManejador.datosGasto = this.datosGasto;
        enviar.addEventListener('click', enviarFormularioManejador)
        document.querySelector('form').addEventListener('submit', enviarFormularioManejador);

        //pulsamos al boton Enviar (Api)
        // modificamos cualquier campo y mandamos a actualizar los datos a la api
        let modificarApi = formulario.querySelector('.gasto-enviar-api');
        let enviarFormularioApiManejador = new EditarFormularioApiHandle();
        enviarFormularioApiManejador.datosGasto = this.datosGasto;
        modificarApi.addEventListener('click',enviarFormularioApiManejador);

        //pulsamos al boton Cancelar
        let cerrar = formulario.querySelector('button.cancelar');
        cerrar.addEventListener('click', function () {
            formulario.remove();
            //activar todos los botones del formulario
            btnEditarFormulario.disabled = false;
        })

        


    }
}

function EditarFormularioApiHandle(){
    
        this.handleEvent = function(event){
            const formulario = event.target.parentNode;
            const usuario = document.getElementById('nombre_usuario');
            const descripcion = formulario.elements.descripcion.value;
            console.log(descripcion);
            const valor = Number(formulario.elements.valor.value);
            console.log(valor);
            const fecha = formulario.elements.fecha.value;
            console.log(fecha);
            const etiquetas = (formulario.elements.etiquetas.value).split(',');
            console.log(etiquetas);
            const gastoId = this.datosGasto.gastoId;
            console.log(gastoId);
    
            const gasto = {
                // "gastoId" : gastoId,
                "valor": valor,
                "descripcion" : descripcion,
                // "usuario" : usuario,
                "fecha": fecha,
                "etiquetas":etiquetas
    
            }
    
            const url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/carlosbeltran/${gastoId}`;
    
            fetch(url, {
                method: 'PUT', // Método de la solicitud
                headers: {

                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify(gasto)
            })
            .then(response => {
                if (response.ok) {
                    alert('datos modificados correctamente');
                    // Si la respuesta es correcta, actualizar la lista de gastos
                    cargarGastosApi(); // Llamar a la función para cargar los gastos desde la API
                } else {
                    // Si la respuesta no es exitosa, mostrar un mensaje de error
                    alert('Hubo un error al modificar el gasto.');
                }
            })
    
        }
    }


function submitHandleEditarFormulario() {
    this.handleEvent = function (event) {
        console.log("enviar datos desde dentro de editar (fomulario)")
        event.preventDefault();

        var formulario = document.querySelector("form");
        let nuevaDescripcion = formulario.elements.descripcion.value;
        console.log(nuevaDescripcion);
        this.datosGasto.actualizarDescripcion(nuevaDescripcion);
        let nuevoValor = Number(formulario.elements.valor.value, 10);
        console.log(nuevoValor)
        this.datosGasto.actualizarValor(nuevoValor);
        let nuevaFecha = formulario.elements.fecha.value
        this.datosGasto.actualizarFecha(nuevaFecha);
        let nuevasEtiquetas = formulario.elements.etiquetas.value
        this.datosGasto.anyadirEtiquetas(nuevasEtiquetas);

        

        repintar();
    }
}


function nuevoGastoWebFormulario() {
    
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    document.body.append(document.createElement('br'));
    document.querySelector('#controlesprincipales').append(plantillaFormulario);

    //deshabilitamos el boton añadirGastoFormulario
    let anyadirGastoFormulario = document.getElementById('anyadirgasto-formulario');

    anyadirGastoFormulario.disabled = true;



    let submit = new submitHandle();

    document.querySelector('button[type="submit"]').addEventListener('click', submit);
    document.querySelector('form').addEventListener('submit', submit);
    //añadir gasto a la api
    let submitApi = new submitApiHandle();
    document.querySelector('button[class="gasto-enviar-api"]').addEventListener('click',submitApi);

    let cancelar = new cancelarHandle();
    document.querySelector('button[class="cancelar"]').addEventListener('click', cancelar);

}

function submitApiHandle(){
    this.handleEvent = function(event){
        const formulario = event.target.parentNode;
        const usuario = document.getElementById('nombre_usuario');
        const descripcion = formulario.elements.descripcion.value;
        console.log(descripcion);
        const valor = Number(formulario.elements.valor.value);
        console.log(valor);
        const fecha = formulario.elements.fecha.value;
        console.log(fecha);
        const etiquetas = (formulario.elements.etiquetas.value).split(',');
        console.log(etiquetas);

        const gasto = {
            "valor": valor,
            "descripcion" : descripcion,
            "usuario" : usuario,
            "fecha": fecha,
            "etiquetas":etiquetas

        }

        const url = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/carlosbeltran";

        fetch(url, {
            method: 'POST', // Método de la solicitud
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(gasto)
        })
        .then(response => {
            if (response.ok) {
                alert('datos insertados correctamente');
                // Si la respuesta es correcta, actualizar la lista de gastos
                cargarGastosApi(); // Llamar a la función para cargar los gastos desde la API
            } else {
                // Si la respuesta no es exitosa, mostrar un mensaje de error
                alert('Hubo un error al insertar el gasto.');
            }
        })

    }
}

function cancelarHandle() {
    this.handleEvent = function () {
        let form = document.querySelector('form');
        form.parentNode.removeChild(form);
        repintar();

        let anyadirGastoFormulario = document.getElementById('anyadirgasto-formulario');
        anyadirGastoFormulario.disabled = false;
    }
}



function filtrarGastosWeb(event) {
    // Prevenir el envío del formulario para evitar recargar la página
    event.preventDefault();

    // Recoger los valores del formulario
    const formulario = event.target; // El formulario que desencadenó el evento
    const descripcion = formulario.querySelector("#formulario-filtrado-descripcion").value;
    const valorMinimo = parseFloat(formulario.querySelector("#formulario-filtrado-valor-minimo").value);
    const valorMaximo = parseFloat(formulario.querySelector("#formulario-filtrado-valor-maximo").value);
    const fechaDesde = formulario.querySelector("#formulario-filtrado-fecha-desde").value;
    const fechaHasta = formulario.querySelector("#formulario-filtrado-fecha-hasta").value;
    const etiquetasCampo = formulario.querySelector("#formulario-filtrado-etiquetas-tiene").value;

    // Crear el objeto de filtros
    const filtros = {
        descripcionContiene: descripcion,
        valorMinimo: valorMinimo,
        valorMaximo: valorMaximo,
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
    };

    // Si hay etiquetas en el formulario, transformarlas
    if (etiquetasCampo.trim() !== "") {
        filtros.etiquetasTiene = gestion.transformarListadoEtiquetas(etiquetasCampo);
    }

    // Llamar a la función filtrarGastos con el objeto filtros
    // const gastosFiltrados = gestion.filtrarGastos(filtros);

    // Actualizar la lista de gastos en la interfaz
    let viejoListadoGastos = document.querySelectorAll('#listado-gastos-completo');
    viejoListadoGastos.forEach(function (div) {
        div.innerHTML = ""
    });


    mostrarGastoWeb('listado-gastos-completo', gestion.filtrarGastos(filtros));

}

function guardarGastosWeb() {

    const gastosJSON = JSON.stringify(gestion.listarGastos());
    localStorage.setItem('GestorGastosDWEC', gastosJSON);
}

function cargarGastosWeb() {

    const gastosJSON = localStorage.getItem('GestorGastosDWEC');
    let gastos = [];
    if (gastosJSON) {
        gastos = JSON.parse(gastosJSON);
    } else {
        gastos = [];
    }
    gestion.cargarGastos(gastos)
    repintar();
}

function cargarGastosApi(){
    let usuario = document.querySelector('#nombre_usuario').value;
    console.log(usuario);
    fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`)
        .then(response => {
            if(!response.ok){
                throw new Error('Error al obtener los gastos');
            }
            return response.json();
        })
        .then(data => {
            gestion.cargarGastos(data);
        repintar();
        console.log('gastos cargados');
        })
        .catch(error =>{
            console.error('Hubo un problema con la solicitud fetch:',error);
            alert('Hubo un problema al cargar los gastos.');
        });

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
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosApi
}


