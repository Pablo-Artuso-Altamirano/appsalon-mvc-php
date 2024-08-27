document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp(){
    buscarPorFecha();
}

function buscarPorFecha() {
    const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('input', function(e) {
        const fechaSeleccionada = e.target.value;

        //redireccionamos al usuario y lo mandaoms por "query String" con la fecha que haya seleccionado
       window.location = `?fecha=${fechaSeleccionada}`;  
    });
}