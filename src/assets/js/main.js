const user = sessionStorage.getItem('user');
if (!user) {
    window.location.href = 'login.html';
}

const userData = JSON.parse(user)
console.log(userData)
const contenido = document.querySelector('body')
contenido.style.display = 'block';

const btnLogout = document.querySelector('#logout');
btnLogout.addEventListener('click', function (event) {
    event.preventDefault();
    sessionStorage.clear();
    window.location.href = 'login.html';
});

// Mostrar TARJETAS
const cardContainer = document.querySelector('#cardContainer');

userData.cards.forEach((card, index) => {
    // Crear el elemento de la tarjeta
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.id = `card${index + 1}`;

    // Aplicar las clases "d-block" y "d-none" según el índice
    cardElement.classList.add(index === 0 ? 'd-block' : 'd-none');

    // Crear el encabezado de la tarjeta
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.textContent = 'Tarjeta de Banco';
    cardElement.appendChild(cardHeader);

    // Crear el cuerpo de la tarjeta
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardElement.appendChild(cardBody);

    // Agregar el título del banco
    const bankTitle = document.createElement('h5');
    bankTitle.classList.add('card-title');
    bankTitle.textContent = card.bank;
    cardBody.appendChild(bankTitle);

    // Agregar el número de tarjeta
    const cardNumber = document.createElement('p');
    cardNumber.classList.add('card-text');
    cardNumber.textContent = `Número de tarjeta: ${card.number}`;
    cardBody.appendChild(cardNumber);

    // Agregar la fecha de vencimiento
    const expirationDate = document.createElement('p');
    expirationDate.classList.add('card-text');
    expirationDate.textContent = `Fecha de vencimiento: ${card.expiration}`;
    cardBody.appendChild(expirationDate);

    // Agregar el titular de la tarjeta
    const cardHolder = document.createElement('p');
    cardHolder.classList.add('card-text');
    cardHolder.textContent = `Titular de la tarjeta: ${card.holder}`;
    cardBody.appendChild(cardHolder);

    // Agregar el saldo
    const balance = document.createElement('p');
    balance.classList.add('card-text');
    balance.textContent = `Saldo: $${card.balance}`;
    cardBody.appendChild(balance);

    // Agregar el enlace de acciones
    const actionsLink = document.createElement('a');
    actionsLink.href = '#';
    actionsLink.classList.add('btn', 'btn-primary');
    actionsLink.textContent = 'Acciones';
    cardBody.appendChild(actionsLink);

    // Crear el pie de la tarjeta
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer', 'text-muted');
    cardFooter.textContent = `${card.bank} - Tarjeta de ${card.type}`;
    cardElement.appendChild(cardFooter);

    cardContainer.appendChild(cardElement);
});




const btnSiguiente = document.getElementById('siguiente');
const btnAnterior = document.getElementById('anterior');
let index = 1; 

const totalTarjetas = userData.cards.length;

function mostrarTarjetaSiguiente(event) {
  event.preventDefault();
  const tarjetaActual = document.getElementById('card' + index);

  index++;
  if (index > totalTarjetas) index = 1;

  const nuevaTarjeta = document.getElementById('card' + index);
  tarjetaActual.classList.add('d-none');
  nuevaTarjeta.classList.remove('d-none');
  nuevaTarjeta.classList.add('d-block');
}

function mostrarTarjetaAnterior(event) {
  event.preventDefault();
  const tarjetaActual = document.getElementById('card' + index);

  index--;
  if (index < 1) index = totalTarjetas;

  const nuevaTarjeta = document.getElementById('card' + index);
  tarjetaActual.classList.add('d-none');
  nuevaTarjeta.classList.remove('d-none');
  nuevaTarjeta.classList.add('d-block');
}

btnSiguiente.addEventListener('click', mostrarTarjetaSiguiente);
btnAnterior.addEventListener('click', mostrarTarjetaAnterior);