let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

//Se pone como "const" aunque luego lo modifiquemos porque los objetos en JavaScript actuan como "let"
const cita = {
  id: '', 
  nombre: '',
  fecha: '',
  servicios: []
}

//Se ejecuta cuando todo el contenido del DOM esta cargado
document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion(); //Muestra y oculta las secciones
  tabs(); //Cambia las seccion cuando se presionen los tabs
  botonesPaginador(); //Agrega o quita los botones del paginador
  paginaAnterior(); //Vuelve a la pagina(paso) anterior a traves del tab
  paginaSiguiente(); //Pasa a la siguiente pagina(paso) a traves del tab

  consultarAPI(); //Consulta la API en el backend de PHP

  idCliente(); //Añade el id del cliente al objeto
  nombreCliente(); //Añade el nombre del cliente al objeto de cita
  seleccionarFecha(); //Añade la fecha de la cita al objeto
  seleccionarHora(); //Añade la hora de la cita al objeto

  mostrarResumen(); //Muestra el resumen de la cita
}

function mostrarSeccion() {
  //Ocultar la seccion que tenga la clase de mostrar
  const seccionAnterior = document.querySelector(".mostrar"); // el . solo va en el selector
  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrar");
  }

  //Seleccionar la seccion con el paso...
  const pasoSelector = `#paso-${paso}`;
  const seccion = document.querySelector(pasoSelector);
  seccion.classList.add("mostrar");

  //Quita la clase "actual" al tab anterior
  const tabAnterior = document.querySelector(".actual");
  if (tabAnterior) {
    tabAnterior.classList.remove("actual");
  }

  //Resalta el tab actual
  const tab = document.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add("actual");
}

//add.EventListener no se puede utilizar con el querySelectorAll
function tabs() {
  const botones = document.querySelectorAll(".tabs button");

  botones.forEach((boton) => {
    boton.addEventListener("click", function (e) {
      //console.log(e.target.dataset.paso); //con esto accedemos a los atributos que creamos
      paso = parseInt(e.target.dataset.paso);

      //Aca llamo a las funciones que quiero que se ejecuten cuando presiono algún tab
      mostrarSeccion();
      botonesPaginador();
    });
  });
}

function botonesPaginador() {
  const paginadorAnterior = document.querySelector("#anterior");
  const paginadorSiguiente = document.querySelector("#siguiente");

  if (paso === 1) {
    paginadorAnterior.classList.add("ocultar");
    paginadorSiguiente.classList.remove("ocultar");
  } else if (paso === 3) {
    paginadorAnterior.classList.remove("ocultar");
    paginadorSiguiente.classList.add("ocultar");

    //muestra el resumen al llegar a traves del paginador
    mostrarResumen();
  } else {
    paginadorAnterior.classList.remove("ocultar");
    paginadorSiguiente.classList.remove("ocultar");
  }

  mostrarSeccion();
}

function paginaAnterior() {
  const paginaAnterior = document.querySelector("#anterior");

  paginaAnterior.addEventListener("click", function () {
    if (paso <= pasoInicial) return;
    paso--;

    botonesPaginador();
  });
}

function paginaSiguiente() {
  const paginaSiguiente = document.querySelector("#siguiente");

  paginaSiguiente.addEventListener("click", function () {
    if (paso >= pasoFinal) return;
    paso++;

    botonesPaginador();
  });
}


//El "async" permite que otras funciones se ejecuten mientras se ejecuta esta
//El "await" detiene todas las lineas de codigo que esten dentro del él, hasta que se termine de ejecutar
async function consultarAPI() {
  try {
    const url = '/api/servicios'; //lo deja asi ya que el proyecto, el backend y estos archivos de JS en el mismo dominio -- Si no poner `${location.origin}/api/servicios`
    const resultado = await fetch(url); //se utiliza "fetch()" para consumir la API
    const servicios = await resultado.json();
    mostrarServicios(servicios);
  } catch (error) {
    console.log(error);
  }
}

function mostrarServicios(servicios) {
  servicios.forEach((servicio) => {
    //con "destructuring" extraemos el valor y crea la variable al mismo tiempo
    const { id, nombre, precio } = servicio;

    const nombreServicio = document.createElement("P"); //elemento en MAYÚSCULA
    nombreServicio.classList.add("nombre-servicio");
    nombreServicio.textContent = nombre;

    const precioServicio = document.createElement("P");
    precioServicio.classList.add("precio-servicio");
    precioServicio.textContent = `$${precio}`;

    const servicioDiv = document.createElement("DIV");
    servicioDiv.classList.add("servicio");
    //el "dataset" crea un nuevo atributo
    servicioDiv.dataset.idServicio = id;
    servicioDiv.onclick = function () {
      seleccionarServicio(servicio);
    };

    //con esto agrego dentro del div los 2 parrafos
    servicioDiv.appendChild(nombreServicio);
    servicioDiv.appendChild(precioServicio);

    //selecciono el elemento y luego le agrego el contenido
    document.querySelector("#servicios").appendChild(servicioDiv);
  });
}

function seleccionarServicio(servicio) {
  const { id } = servicio;
  const { servicios } = cita;

  //Identificar el elemento al que se le da click
  const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

  //Comprobar si un servicio ya fue agregado
  //el "agregado.id" es lo que esta en memoria ya guardado y el "servicio.id" es lo que yo voy seleccionando
  if (servicios.some((agregado) => agregado.id === /*servicio.*/ id)) {
    //este "some" itera por todo el arreglo y devuelve un true o false si el elemento existe o no
    //Eliminarlo
    cita.servicios = servicios.filter((agregado) => agregado.id != id);
    divServicio.classList.remove("seleccionado");
  } else {
    //Agregarlo
    cita.servicios = [...servicios, servicio]; //los 3 puntos toman una copia de lo que hay en "servicios"
    divServicio.classList.add("seleccionado");
  }
}

function idCliente() {
  cita.id = document.querySelector("#id").value;
}

function nombreCliente() {
  cita.nombre = document.querySelector("#nombre").value;
}

function seleccionarFecha() {
  const inputFecha = document.querySelector("#fecha");
  inputFecha.addEventListener("input", function (e) {
    //Esto trae el numero de dia de la semana (empezando por el domingo que es 0)
    const dia = new Date(e.target.value).getUTCDay();

    //aca se coloca el numero de dia que quiero deshabilitar
    if ([6, 0].includes(dia)) {
      e.target.value = '';
      mostrarAlerta('error', 'Fines de semana no permitidos', '.formulario');
    } else {
      cita.fecha = e.target.value;
    }

  });
}

function seleccionarHora() {
  const inputHora = document.querySelector('#hora')
  inputHora.addEventListener("input", function (e) {

    const horaCita = e.target.value;
    const hora = horaCita.split(":")[0]; //separa 2 strings
    
    if(hora < 8 || hora > 21) {
      e.target.value = '';
      mostrarAlerta('error', 'Horario no válido', '.formulario')
    } else {
      cita.hora = e.target.value;
    }

  })
}


function mostrarAlerta(tipo, mensaje, elemento, desaparece = true) {
  //Previene que se genere mas de una alerta
  const alertaPrevia = document.querySelector('.alerta');
  if(alertaPrevia) {
    alertaPrevia.remove();
  }

  //Scripting para crear la alerta
  const alerta = document.createElement('DIV');
  alerta.textContent = mensaje;
  alerta.classList.add('alerta');
  alerta.classList.add(tipo);

  const referencia = document.querySelector(elemento)
  referencia.appendChild(alerta);

  if(desaparece) {
    //Eliminar alerta
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }

}


function mostrarResumen() {
  const resumen = document.querySelector('.contenido-resumen');

  //Limpiar el contenido de resumen
  while(resumen.firstChild) {
    resumen.removeChild(resumen.firstChild);
  }

  //Iteramos en el objeto de "cita" y luego revisamos si hay algun string vacio
  if(Object.values(cita).includes('') || cita.servicios.length === 0) {
    mostrarAlerta('error', 'Faltan datos de Servicios, Fecha u Hora', '.contenido-resumen', false);

    return;
  } 

  //Formatear el div de resumen
  const {nombre, fecha, hora, servicios} = cita;

  //Heading para Servicios en Resumen
  const headingServicios = document.createElement('H3');
  headingServicios.textContent = 'Resumen de Servicios';
  resumen.appendChild(headingServicios);

  //Iterando y mostrando los servicios
  servicios.forEach(servicio => {
    const {id, precio, nombre} = servicio;

    const contenedorServicio = document.createElement('DIV');
    contenedorServicio.classList.add('contenedor-servicio');

    //este es el nombre del servicio
    const textoServicio = document.createElement('P');
    textoServicio.textContent = nombre;

    //este es el precio del servicio
    const precioServicio = document.createElement('P');
    precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

    //agrego el nombre y precio al contenedor
    contenedorServicio.appendChild(textoServicio);
    contenedorServicio.appendChild(precioServicio);

    //agrego todo en el "resumen" para mostrarlo en el html
    resumen.appendChild(contenedorServicio);
  })

  //Heading para Cita en Resumen
  const headingCita = document.createElement('H3');
  headingCita.textContent = 'Resumen de Cita';
  resumen.appendChild(headingCita);

  const nombreCliente = document.createElement('P');
  nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

  //Formatear la fecha en español
  //Cada vez que use el "new Date" los meses y dias me restan 1 porque empiezan de 0. Ej: elijo el 13 va a salir el 12
  const fechaObj = new Date(fecha);
  //esta vez es +2 porque lo uso 2 veces al "new Date"
  const dia = fechaObj.getDate() + 2; //este me retorna el dia del mes, en vez "getDay" te retorna el dia de la semana
  const mes = fechaObj.getMonth();
  const year = fechaObj.getFullYear();

  const fechaUTC = new Date(Date.UTC(year, mes, dia));

  const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
  //convierto la fecha en un string y en el pais que deseo
  const fechaFormateada = fechaUTC.toLocaleDateString('es-AR', opciones);

  const fechaCita = document.createElement('P');
  fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

  const horaCita = document.createElement('P');
  horaCita.innerHTML = `<span>Hora:</span> ${hora} Hs`;

  //Boton para Crear una Cita
  const botonReservar = document.createElement('BUTTON');
  botonReservar.classList.add('boton');
  botonReservar.textContent = 'Reservar Cita';
  botonReservar.onclick = reservarCita;

  resumen.appendChild(nombreCliente);
  resumen.appendChild(fechaCita);
  resumen.appendChild(horaCita);

  resumen.appendChild(botonReservar);
}


async function reservarCita() {
  const {nombre, fecha, hora, servicios, id} = cita;

  //el "foreach" solamente itera, mientras que el "map" a la concidencias las va agregando a la variable
  const idServicios = servicios.map(servicio => servicio.id) 

  const datos = new FormData();
  //con append agregamos la informacion al "FormData"
  datos.append('fecha', fecha);
  datos.append('hora', hora);
  datos.append('usuarioId', id);
  datos.append('servicios', idServicios);

  try {
    //Petición hacia la api
    const url = '/api/citas' //lo deja asi ya que el proyecto, el backend y estos archivos de JS en el mismo dominio -- Si no poner `${location.origin}/api/servicios`

    const respuesta = await fetch(url, {
      method: 'POST', //Esto se pone si o si cuando el metodo es POST
      body: datos //Es el cuerpo de la peticion que vamos a enviar
    });

    const resultado = await respuesta.json();

    if(resultado.resultado) {
      Swal.fire({
        icon: 'success',
        title: 'Cita Creada',
        text: 'Tu cita fue creada correctamente',
        button: 'OK'
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un error al guardar la cita"
    });
  }
  
}