// Variables y Selectores


const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#astos ul')





// Eventos

addEventListener();
function addEventListener() {
    document.addEventListener('DOMContentLoaded', preguntarpresupuesto());
}






// Classes










// Funciones

function preguntarpresupuesto() {
    const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');
    console.log(parseFloat(presupuestoUsuario));

    // Validación para no saltar la alerta
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ) {
        window.location.reload();
    }
}
