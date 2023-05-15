const btnSiguiente = document.getElementById('siguiente');
const btnAtras = document.getElementById('atras');
let index = 1;

function mostrarTarjeta(event) {
    event.preventDefault();
    const tarjetaActual = document.getElementById('card' + index);
    tarjetaActual.classList.add('d-none');

    index++;
    if (index > 3) index = 1;

    const nuevaTarjeta = document.getElementById('card' + index);
    nuevaTarjeta.classList.remove('d-none');
    nuevaTarjeta.classList.add('d-block');
}

btnSiguiente.addEventListener('click', mostrarTarjeta);
btnAtras.addEventListener('click', mostrarTarjeta);
