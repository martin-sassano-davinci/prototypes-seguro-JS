//constructor

function Seguro(year, marca, tipo) {
  this.year = year;
  this.marca = marca;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
  let cantidad;
  const base = 2000;

  switch (marca.value) {
    case "1":
      cantidad = base * 1.15;
      console.log("americano");
      console.log(cantidad);
      break;
    case "2":
      cantidad = base * 1.05;
      console.log("asiatico");
      console.log(cantidad);
      break;

    case "3":
      cantidad = base * 1.35;
      console.log("europeo");
      console.log(cantidad);
      break;
    default:
      break;
  }
  console.log(year.value);

  const diferencia = new Date().getFullYear() - year.value;
  cantidad -= (diferencia * 3 * cantidad) / 100;
  console.log(cantidad);

  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }
  return cantidad;
};

function UI() {}

UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear();
  const min = max - 22;

  const year = document.getElementById("year");
  for (let index = max; index > min; index--) {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = index;
    year.appendChild(option);
  }
};

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }
  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  const form = document.querySelector("#cotizar-seguro");
  form.insertBefore(div, document.getElementById("resultado"));

  setInterval(() => {
    div.remove();
  }, 3000);
};

UI.prototype.mostrarResultado = (total, seguro) => {
  const div = document.createElement("div");
  div.classList.add("mt-10");

  let marcaRes;
  switch (marca.value) {
    case "1":
      marcaRes = "Americano";
      break;
    case "2":
      marcaRes = "Asiatico";
      break;
    case "3":
      marcaRes = "Europeo";
      break;
    default:
      break;
  }

  div.innerHTML = `
    <p class='header'> Tu Resumen</p>
    <p class='font-bold'> Marca: <span class="font-normal"> ${marcaRes} </span>  </p>
    <p class='font-bold'> Año: <span class="font-normal"> ${year.value} </span> </p>  
    <p class='font-bold'> Tipo:<span class="font-normal capitalize"> ${seguro.tipo} </span> </p>
    <p class='font-bold'> Precio: <span class="font-normal"> $ ${total} </span> </p>
    `;

  const resultadoDiv = document.querySelector("#resultado");
  

  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    resultadoDiv.appendChild(div);
  }, 3000);

    
};

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones();
});

const form = document.querySelector("#cotizar-seguro");

form.addEventListener("submit", cotizarSeguro);

function cotizarSeguro(e) {
  const marca = document.querySelector("#marca").value;
  console.log(marca);
  const year = document.querySelector("#year").value;
  console.log(year);
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  console.log(tipo);
  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  }
  ui.mostrarMensaje("Cotizando...", "correcto");

  const resultado = document.querySelector('#resultado div');

  if (resultado != null) {
    resultado.remove();
  }

  const seguro = new Seguro(year, marca, tipo);
  const total = seguro.cotizarSeguro();

  ui.mostrarResultado(total, seguro);
}
