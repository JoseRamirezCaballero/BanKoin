const btnSiguiente = document.getElementById('siguiente');
const btnAnterior = document.getElementById('anterior');
let index = 1;

function mostrarTarjetaSiguiente(event) {
    event.preventDefault();
    const tarjetaActual = document.getElementById('card' + index);
    
    index++;
    if (index > 3) index = 1;
    
    const nuevaTarjeta = document.getElementById('card' + index);
    if(!nuevaTarjeta) {
        index--
        return
    }
    tarjetaActual.classList.add('d-none');
    nuevaTarjeta.classList.remove('d-none');
    nuevaTarjeta.classList.add('d-block');
}

function mostrarTarjetaAnterior(event) {
    event.preventDefault();
    const tarjetaActual = document.getElementById('card' + index);

    index--;
    if (index < 1) index = 3;

    const nuevaTarjeta = document.getElementById('card' + index);
    if(!nuevaTarjeta) {
        index++
        return
    }
    tarjetaActual.classList.add('d-none');
    nuevaTarjeta.classList.remove('d-none');
    nuevaTarjeta.classList.add('d-block');
}

btnSiguiente.addEventListener('click', mostrarTarjetaSiguiente);
btnAnterior.addEventListener('click', mostrarTarjetaAnterior);
