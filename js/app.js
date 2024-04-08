// Variables y Selectores


const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul')





// Eventos

addEventListener();
function addEventListener() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto)
}






// Classes

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto); // Number se encarga manejarlo
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        console.log('gasto -->', this.gastos);
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

    imprimirAlerta(mensaje, tipoMensaje){
        // Crear el div de la alerta
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        // Validación tipo de alerta
        if(tipoMensaje === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mnesaje de error
        divMensaje.textContent = mensaje;

        // Insertar el mensaje en el HTML
        document.querySelector('.primario').insertBefore(divMensaje, formulario)

        // Quitar alerta del HTML
        setTimeout(() => {
            divMensaje.remove();
        }, 3000)
    }

    agregarGastoListado(gastos) {
        // Elimina el HTML previo para evitar duplicidad
        this.limpiarHTML();

        // console.log('agregarGastoListado -->',gastos);

        // iterar sobre los gastos
        gastos.forEach(gasto => {

            const { cantidad, nombre, id } = gasto;

            // Crear li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            // nuevoGasto.setAttribute('data-id', id); // vieja verión
            nuevoGasto.dataset.id = id; // nueva versión
            console.log(nuevoGasto);

            // Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> ${cantidad}</span>`;

            // Button para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times'
            nuevoGasto.appendChild(btnBorrar)

            // Agregar al HTML
            gastoListado.appendChild(nuevoGasto)
        })
    };

    limpiarHTML() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild)
        }
    };
}

// Instanciar
const ui = new UI(); // de forma global para acceder a las funciones
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
    // console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto); // pasamos todo el objeto completo dle presupuesto
}

// Añade gastos
function agregarGasto(e) {
    e.preventDefault();

    // Leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    // Validación formulario
    if (nombre === '' || cantidad === '') {
        console.log('Error...');
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');

        return;
    } else if( cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('No es una cantidad válida', 'error');

        return;
    }

    // Generar un object literal con el gasto
    const gasto = { nombre, cantidad, id: Date.now( ) }

    // Añade un nuevo gasto
    presupuesto.nuevoGasto( gasto );

    // Mensaje success!
    ui.imprimirAlerta('Gasto agregado correctamente');

    // Imprimir los gastos
    const { gastos } = presupuesto
    ui.agregarGastoListado( gastos );

    // Reinicia el formulario
    formulario.reset();
}