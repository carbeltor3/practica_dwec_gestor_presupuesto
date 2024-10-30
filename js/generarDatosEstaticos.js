import * as gestion from "./gestionPresupuesto.js";
import * as gestionWeb from "./gestionPresupuestoWeb.js";


let presupuesto = gestion.actualizarPresupuesto(1500);
let mostrarPresupuesto = gestion.mostrarPresupuesto();



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

let gastosTotales = Math.trunc(gestion.calcularTotalGastos());
let balance = Math.trunc(gestion.calcularBalance());


gestionWeb.mostrarDatoEnId('presupuesto',mostrarPresupuesto);
gestionWeb.mostrarDatoEnId('gastos-totales',gastosTotales);
gestionWeb.mostrarDatoEnId('balance-total',balance);

gestionWeb.mostrarGastoWeb('listado-gastos-completo',gestion.filtrarGastos({fechaDesde:"",fechaHasta:""}));
gestionWeb.mostrarGastoWeb('listado-gastos-filtrado-1',gestion.filtrarGastos({fechaDesde: "2021-09-01",fechaHasta: "2021-09-30"}));
gestionWeb.mostrarGastoWeb('listado-gastos-filtrado-2',gestion.filtrarGastos({valorMinimo : 50}));
gestionWeb.mostrarGastoWeb('listado-gastos-filtrado-3',gestion.filtrarGastos({etiquetasTiene: ["seguros", ],valorMinimo: 200}));
gestionWeb.mostrarGastoWeb('listado-gastos-filtrado-4',gestion.filtrarGastos({etiquetasTiene: ["comida","transporte" ],valorMaximo:50}));

gestionWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gestion.agruparGastos("dia", ["casa","comida","supermercado","transporte","seguros"], "2020-05-26", "2021-10-08"),'día');