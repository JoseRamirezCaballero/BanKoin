const user = sessionStorage.getItem('user');
if (!user) {
  window.location.href = 'login.html';
}

let userData = JSON.parse(user)
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
  // Contenedores tarjeta
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('w-100', 'd-flex', 'justify-content-center');
  cardWrapper.id = `card${index + 1}`;

  cardWrapper.classList.add(index === 0 ? 'd-block' : 'd-none');

  const cardSection = document.createElement('section');
  cardSection.classList.add('tarjeta');
  cardSection.id = 'tarjeta';
  cardWrapper.appendChild(cardSection);

  const cardFront = document.createElement('div');
  cardFront.classList.add('delantera');
  cardSection.appendChild(cardFront);

  // Imagenes
  const logoBrand = document.createElement('div');
  logoBrand.classList.add('logo-marca');
  logoBrand.id = 'logo-marca';
  const logoImg = document.createElement('img');
  logoImg.src = './assets/img/mastercard.png';
  logoImg.alt = 'bank';
  logoBrand.appendChild(logoImg);
  cardFront.appendChild(logoBrand);

  const chipImg = document.createElement('img');
  chipImg.classList.add('chip');
  chipImg.src = './assets/img/chip-tarjeta.png';
  chipImg.alt = 'chip';
  cardFront.appendChild(chipImg);

  // Datos de la tarjeta
  const cardData = document.createElement('div');
  cardData.classList.add('datos');
  cardFront.appendChild(cardData);

  const cardNumberGroup = document.createElement('div');
  cardNumberGroup.classList.add('grupo');
  cardNumberGroup.id = 'numero';
  const cardNumberLabel = document.createElement('p');
  cardNumberLabel.classList.add('label');
  cardNumberLabel.textContent = `Número de Tarjeta de ${card.type}`;
  const cardNumberText = document.createElement('p');
  cardNumberText.classList.add('numero');
  cardNumberText.textContent = card.number;
  cardNumberGroup.appendChild(cardNumberLabel);
  cardNumberGroup.appendChild(cardNumberText);
  cardData.appendChild(cardNumberGroup);

  const flexbox = document.createElement('div');
  flexbox.classList.add('flexbox');
  cardData.appendChild(flexbox);

  const cardHolderGroup = document.createElement('div');
  cardHolderGroup.classList.add('grupo');
  cardHolderGroup.id = 'nombre';
  const cardHolderLabel = document.createElement('p');
  cardHolderLabel.classList.add('label');
  cardHolderLabel.textContent = 'Nombre Tarjeta';
  const cardHolderText = document.createElement('p');
  cardHolderText.classList.add('nombre');
  cardHolderText.textContent = card.holder;
  cardHolderGroup.appendChild(cardHolderLabel);
  cardHolderGroup.appendChild(cardHolderText);
  flexbox.appendChild(cardHolderGroup);

  const cardExpirationGroup = document.createElement('div');
  cardExpirationGroup.classList.add('grupo');
  cardExpirationGroup.id = 'expiracion';
  const cardExpirationLabel = document.createElement('p');
  cardExpirationLabel.classList.add('label');
  cardExpirationLabel.textContent = 'Expiracion';
  const cardExpirationText = document.createElement('p');
  cardExpirationText.classList.add('expiracion');
  const expirationMonth = document.createElement('span');
  expirationMonth.classList.add('mes');
  expirationMonth.textContent = card.expiration;
  cardExpirationText.appendChild(expirationMonth);
  cardExpirationGroup.appendChild(cardExpirationLabel);
  cardExpirationGroup.appendChild(cardExpirationText);
  flexbox.appendChild(cardExpirationGroup);

  // Colocar tarjeta
  cardContainer.appendChild(cardWrapper);
});



// Botones de navegacion
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
  mostrarInfoTarjeta();
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
  mostrarInfoTarjeta();
}

btnSiguiente.addEventListener('click', mostrarTarjetaSiguiente);
btnAnterior.addEventListener('click', mostrarTarjetaAnterior);

//Info de la tarjeta
const extraInfo = document.querySelector('#extraInfo');

const contenidoHTML = `
  <div class="card-header py-1">
    <ul class="nav nav-pills card-header-pills small-list">
      <li class="nav-item">
        <a class="nav-link small active" href="#" onclick="mostrarInfoTarjeta()">Información de la Tarjeta</a>
      </li>
      <li class="nav-item">
        <a class="nav-link small" href="#" onclick="mostrarRetiro()">Retirar</a>
      </li>
      <li class="nav-item">
        <a class="nav-link small" href="#" onclick="mostrarDeposito()">Deposito</a>
      </li>
      <li class="nav-item">
        <a class="nav-link small" href="#" onclick="mostrarTransferencia()">Transferir</a>
      </li>
    </ul>
  </div>
  <div class="card-body overflow-card">
    <div class="card-content overflow-x-hidden overflow-y-hidden" id="contenidoTabs"
    </div>
  </div>
`;

extraInfo.innerHTML = contenidoHTML;

const contenidoTabs = document.getElementById("contenidoTabs")

function mostrarInfoTarjeta() {
  const cardData = userData.cards[index - 1];

  contenidoTabs.innerHTML = `
    <h5 class="card-title">Su saldo es de: $${cardData.balance}</h5>
  `;
}
mostrarInfoTarjeta();

function mostrarRetiro() {
  contenidoTabs.innerHTML = `
  <form class="row g-3" onsubmit="retirar(event)">
    <div class="col-auto">
      <label for="inputCantidad2" class="visually-hidden">Cantidad</label>
      <input type="number" class="form-control" id="inputCantidad2" placeholder="Cantidad">
    </div>
    <div class="col-auto">
      <label for="inputAsunto" class="visually-hidden">Asunto</label>
      <input type="text" class="form-control" id="inputAsunto" placeholder="Asunto">
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary mb-3">Retirar cantidad</button>
    </div>
  </form>
  `;
}

function retirar(event) {
  event.preventDefault()
  const asunto = document.getElementById("inputAsunto").value;
  const cantidad = parseFloat(document.getElementById("inputCantidad2").value);
  const data = userData.cards[index - 1]
  if (cantidad > 30000 || cantidad > data.balance) {
    alert('No fue posible retirar la cantidad')
  } else {
    const cardBalance = data.balance - cantidad;
    data.balance = cardBalance
    userData.movimientos.push({ type: 'retiro', amount: cantidad, asunto: asunto })
    alert(`Ha retirado $${cantidad}.\nSu saldo actualizado es de: $${cardBalance}`)
  }
}

function mostrarTransferencia() {
  contenidoTabs.innerHTML = `
    <form class="row g-3" onsubmit="transferir(event)">
      <div class="col-auto">
        <label for="inputTarjeta2" class="visually-hidden">Tarjeta</label>
        <input type="text" class="form-control form-control-sm" id="inputTarjeta2" placeholder="Numero de Tarjeta">
      </div>
      <div class="col-auto">
        <label for="inputCantidad2" class="visually-hidden">Cantidad</label>
        <input type="number" class="form-control form-control-sm" id="inputCantidad2" placeholder="Cantidad">
      </div>
      <div class="col-auto">
        <label for="inputAsunto" class="visually-hidden">Asunto</label>
        <input type="text" class="form-control form-control-sm" id="inputAsunto" placeholder="Asunto">
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary mb-3">Transferir</button>
      </div>
  </form>
  `;
}

function transferir(event) {
  event.preventDefault()
  const tarjeta = document.getElementById("inputTarjeta2").value;
  const asunto = document.getElementById("inputAsunto").value;
  const cantidad = parseFloat(document.getElementById("inputCantidad2").value);
  const myData = userData.cards[index - 1]
  if (cantidad > 50000 || cantidad > myData.balance) {
    alert('No fue posible transferir la cantidad')
  } else {
    
    fetch('/api/users.json')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const userTarjeta = data.find(obj => obj.cards.some(card => card.number === tarjeta))
        console.log('noc',userTarjeta)
        if (userTarjeta) {
          const dataTarjeta = userTarjeta.cards.find(card => card.number === tarjeta);
          dataTarjeta.balance = dataTarjeta.balance + cantidad
          myData.balance = myData.balance - cantidad
          userData.movimientos.push({ type: 'transferencia', amount: cantidad, asunto: asunto })
          alert(`Ha depositado $${cantidad} a ${userTarjeta.username}.\nSu saldo actualizado es de: $${myData.balance}`)
        }
      })
      .catch(error => {
        alert('No fue posible transferir al numero de tarjeta')
      });
  }
}

function mostrarDeposito() {
  contenidoTabs.innerHTML = `
  <form class="row g-3" onsubmit="depositar(event)">
    <div class="col-auto">
      <label for="inputCantidad2" class="visually-hidden">Cantidad</label>
      <input type="number" class="form-control" id="inputCantidad2" placeholder="Cantidad">
    </div>
    <div class="col-auto">
      <label for="inputAsunto" class="visually-hidden">Asunto</label>
      <input type="text" class="form-control" id="inputAsunto" placeholder="Asunto">
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary mb-3">Depositar cantidad</button>
    </div>
  </form>
  `;
}

function depositar(event) {
  event.preventDefault()
  const asunto = document.getElementById("inputAsunto").value;
  const cantidad = parseFloat(document.getElementById("inputCantidad2").value);
  const data = userData.cards[index - 1]
  if (cantidad > 50000 || cantidad > data.balance) {
    alert('No fue posible depositar la cantidad')
  } else {
    console.log(data.balance)
    console.log(cantidad)
    const cardBalance = data.balance + cantidad;
    data.balance = cardBalance
    userData.movimientos.push({ type: 'deposito', amount: cantidad, asunto: asunto })
    alert(`Ha depositado $${cantidad}.\nSu saldo actualizado es de: $${cardBalance}`)
  }
}

function mostrarHistorial() {
  let mensaje = '';
  userData.movimientos.forEach(function (movimiento) {
    mensaje += 'Tipo: ' + movimiento.type + '\n' +
      'Cantidad: ' + movimiento.amount + '\n' +
      'Asunto: ' + movimiento.asunto + '\n\n';
  });

  alert(mensaje);
}