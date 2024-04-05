// Variables y Selectores


const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#astos ul')





// Eventos

addEventListener();
function addEventListener() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}






// Classes

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto); // Number se encarga manejarlo
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI {
    insertarPresupuesto( cantidad ){
        // Extrayendo los valores
        const {presupuesto, restante} = cantidad;

        // Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
}

// Instanciar
const ui = new UI();
let presupuesto; // variable global de presupuesto sin valor


// Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');
    // console.log(parseFloat(presupuestoUsuario));

    // Validación para no saltar la alerta
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ) {
        window.location.reload();
    }

    // Instanciando
    presupuesto = new Presupuesto(presupuestoUsuario); // una vez que tengamos un presupuesto asignamos ese valor
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}
