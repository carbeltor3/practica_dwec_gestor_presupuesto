// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// valor = prompt("introduzca un valor");

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO

    if ((isNaN(valor)) || (valor < 0)) {
        return -1;
    } else {
        presupuesto = valor;
    }
    return presupuesto;
}



function mostrarPresupuesto() {
    // TODO
    
    return `Tu presupuesto actual es de ${presupuesto} €`;


}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.descripcion = descripcion;

    if ((isNaN(valor)) || (valor < 0)) {
        this.valor = 0;
    } else {
        this.valor = valor;
    }

    if (!fecha) {
        this.fecha = new Date().toISOString();
    } else {
        this.fecha = Date.parse(fecha);
    }

    this.etiquetas = etiquetas.length ? etiquetas : [];




    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
    }

    this.actualizarDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function (valor) {
        if (valor >= 0) {
            this.valor = valor;
        }
    }

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        nuevasEtiquetas.forEach(etiqueta => {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        })
    }

    this.mostrarGastoCompleto = function () {
        const fechaLocal = new Date(fecha).toLocaleString();
        const salida = this.etiquetas.map(etiqueta => `- ${etiqueta}\n`).join('');

        return `Gasto correspondiente a ${descripcion} con valor ${valor} €.\n` +
            `Fecha: ${fechaLocal}\n` +
            `Etiquetas:\n${salida}`;

    }

    this.actualizarFecha = function (fecha) {
        const nuevaFecha = Date.parse(fecha);
        if (!isNaN(nuevaFecha)) {
            this.fecha = nuevaFecha;
        }
    }

    this.borrarEtiquetas = function (...borrarEtiquetas) {

        this.etiquetas = this.etiquetas.filter(etiqueta => !borrarEtiquetas.includes(etiqueta));

    }

}

CrearGasto.prototype.obtenerPeriodoAgrupacion = function (periodo) {
    var fecha = new Date(this.fecha)
    let fechaDevuelta;
    let mes = (fecha.getMonth() + 1);
    let dia = fecha.getDate();
    switch (periodo) {
        case ('anyo'):
            fechaDevuelta = fecha.getFullYear();
            return fechaDevuelta;
            break;
        case ('dia'):
            if (mes < 10 && dia < 10) {
                fechaDevuelta = fecha.getFullYear() + "-0" + mes + "-0" + dia;
            } else if (mes < 10 && dia >= 10) {
                fechaDevuelta = fecha.getFullYear() + "-0" + mes + "-" + dia;
            } else if (mes >= 10 && dia < 10) {
                fechaDevuelta = fecha.getFullYear() + "-" + mes + "-0" + dia;
            } else if (mes >= 10 && dia >= 10) {
                fechaDevuelta = fecha.getFullYear() + "-" + mes + "-" + dia;
            }
            return fechaDevuelta;
            break;
        case ('mes'):
        default:
            if (mes < 10) {
                fechaDevuelta = fecha.getFullYear() + "-0" + mes;
            } else {
                fechaDevuelta = fecha.getFullYear() + "-" + mes;
            }
            // fechaDevuelta = fecha.toISOString().substr(0,7);
            return fechaDevuelta;
            break;
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gastos.push(gasto);
    gasto.id = idGasto;
    idGasto++;
}

function borrarGasto(id) {
    gastos = gastos.filter(gasto => gasto.id !== id);
}

function calcularTotalGastos() {
    let totalGasto = 0;
    for (let gasto of gastos) {
        totalGasto += gasto.valor;
    }
    return totalGasto;
}

function calcularBalance() {

    let balance = presupuesto - calcularTotalGastos();
    return balance;
}
function filtrarGastos(parametros) {
    return gastos.filter(function (filtro) {
        var resultado = true;

        if (parametros.fechaDesde) {
            var fecha = Date.parse(parametros.fechaDesde);
            resultado = resultado && (filtro.fecha >= fecha);
        }

        if (parametros.fechaHasta) {
            var fecha = Date.parse(parametros.fechaHasta);
            resultado = resultado && (filtro.fecha <= fecha);
        }

        if (parametros.valorMinimo) {
            resultado = resultado && (filtro.valor >= parametros.valorMinimo);
        }

        if (parametros.valorMaximo) {
            resultado = resultado && (filtro.valor <= parametros.valorMaximo);
        }
        if (parametros.descripcionContiene) {
            // resultado = resultado && (filtro.descripcion.indexOf(parametros.descripcionContiene.toLowerCase()) > -1);
            resultado = resultado && (filtro.descripcion.toLowerCase().includes(parametros.descripcionContiene.toLowerCase()));
        }

        if (parametros.etiquetasTiene) {
            let etisi = false;
            for (let etiqueta of parametros.etiquetasTiene) {
                if (filtro.etiquetas.indexOf(etiqueta) > -1) {
                    etisi = true;
                }
            }
            resultado = resultado && etisi;
        }
        return resultado;
    })

}

function agruparGastos(periodo, etiquetasTiene, fechaDesde, fechaHasta) {
    let gastos_filtrados = filtrarGastos({ etiquetasTiene, fechaDesde, fechaHasta });

    return gastos_filtrados.reduce(function (acumulador, gasto) {
        let per = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acumulador[per]) {
            acumulador[per] = acumulador[per] + gasto.valor;
        } else {
            acumulador[per] = gasto.valor;
        }
        return acumulador;
    }, {})
}

 
function transformarListadoEtiquetas(cadena) {
    // Expresión regular que detecta cualquier combinación de los separadores ",", ".", ":", ";", y espacio.
    // La expresión sustituye cualquier secuencia de estos separadores por un solo espacio.
    return cadena
        .split(/[\s,.;:]+/)   // Dividimos por uno o más de los caracteres separadores mencionados
        .map(etiqueta => etiqueta.trim())  // Eliminar posibles espacios antes o después de cada etiqueta
        .filter(etiqueta => etiqueta.length > 0);  // Filtrar cualquier entrada vacía
}

function cargarGastos(gastosAlmacenamiento){
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
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
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}











