import * as gestion from "./gestionPresupuesto.js";
import * as gestionWeb from "./gestionPresupuestoWeb.js";

//introducimos los datos de la aplicacion
gestion.actualizarPresupuesto(1500);

let gasto1 = new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gestion.anyadirGasto(gasto1);
let gasto2 = new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gestion.anyadirGasto(gasto2);
let gasto3 = new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gestion.anyadirGasto(gasto3);
let gasto4 = new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gestion.anyadirGasto(gasto4);
let gasto5 = new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gestion.anyadirGasto(gasto5);
let gasto6 = new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
gestion.anyadirGasto(gasto6);

gestionWeb.repintar();

//definimos el boton y el manejador de eventos que llamara a actualizarPresupuestoWeb

let actualizarPresupuesto = document.getElementById('actualizarpresupuesto');
actualizarPresupuesto.addEventListener('click', gestionWeb.actualizarPresupuestoWeb);

let anyadirGasto = document.getElementById('anyadirgasto');
anyadirGasto.addEventListener('click', gestionWeb.nuevoGastoWeb);

let anyadirGastoFormulario = document.getElementById('anyadirgasto-formulario');
anyadirGastoFormulario.addEventListener('click', gestionWeb.nuevoGastoWebFormulario);

const formularioFiltrado = document.querySelector("#formulario-filtrado");
formularioFiltrado.addEventListener("submit", gestionWeb.filtrarGastosWeb);

const guardarGastos = document.querySelector("#guardar-gastos");
guardarGastos.addEventListener("click", gestionWeb.guardarGastosWeb);

const cargarGastos = document.querySelector("#cargar-gastos");
cargarGastos.addEventListener("click", gestionWeb.cargarGastosWeb);

document.querySelector('#cargar-gastos-api').addEventListener('click',gestionWeb.cargarGastosApi)



// gestionWeb.mostrarDatoEnId('presupuesto',gestion.mostrarPresupuesto());
// gestionWeb.mostrarDatoEnId('gastos-totales',Math.trunc(gestion.calcularTotalGastos()));
// gestionWeb.mostrarDatoEnId('balance-total',Math.trunc(gestion.calcularBalance()));

// gestionWeb.mostrarGastoWeb('listado-gastos-completo',gestion.filtrarGastos({fechaDesde:"",fechaHasta:""}));
// gestionWeb.mostrarGastoWeb('listado-gastos-filtrado-1',gestion.filtrarGastos({fechaDesde: "2021-09-01",fechaHasta: "2021-09-30"}));
// gestionWeb.mostrarGastoWeb('listado-gastos-filtrado-2',gestion.filtrarGastos({valorMinimo : 50}));
// gestionWeb.mostrarGastoWeb('listado-gastos-filtrado-3',gestion.filtrarGastos({etiquetasTiene: ["seguros", ],valorMinimo: 200}));
// gestionWeb.mostrarGastoWeb('listado-gastos-filtrado-4',gestion.filtrarGastos({etiquetasTiene: ["comida","transporte" ],valorMaximo:50}));

// gestionWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gestion.agruparGastos("dia", ["casa","comida","supermercado","transporte","seguros"], "2020-05-26", "2021-10-08"),'día');
// gestionWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',gestion.agruparGastos("mes", ["casa","comida","supermercado","transporte","seguros"], "2020-05-26", "2021-10-08"),'mes');
// gestionWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo',gestion.agruparGastos("anyo", ["casa","comida","supermercado","transporte","seguros"], "2020-05-26", "2021-10-08"),'año');