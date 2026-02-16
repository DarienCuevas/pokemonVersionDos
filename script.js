function mostrarInterfaz(id) {
  console.log("la id entró", id);
  const todasSecciones = document.querySelectorAll(".seccion");
  todasSecciones.forEach((element) => {
    element.style.display = "none";
  });
  const bloqueSeleccionado = document.getElementById(id);
  console.log("id encontrada", bloqueSeleccionado);
  bloqueSeleccionado.style.display = "block";
}

async function buscarPokemon(nombre) {
  const contenido = document.querySelector(".mensaje");

  reseteoPanel();

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

    if (!response.ok) {
      throw new Error("pokemon no encontrado, amiguito");
    }
    const data = await response.json();

    mostrarId(data);
    mostrarNombre(data);
    descripcionPokemon(data);
    habilidadesPokemon(data);
    tiposPokemon(data);
    imagenesPokemon(data);
    localizaciones(data);
    estadisticasPokemon(data);

    console.log("fetch general", data);
    return data;
  } catch (error) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "ese pokemon no existe papi";
    contenido.appendChild(mensaje);
  }
}

function reseteoPanel() {
  document.querySelector(".mensaje").innerHTML = "";
  document.querySelector(".id").innerHTML = "";
  document.querySelector(".nombre").innerHTML = "";
  document.querySelector(".localidad").innerHTML = "";
  document.querySelector(".habilidades").innerHTML = "";
  document.querySelector(".tipos").innerHTML = "";
  document.querySelector(".imagenes").innerHTML = "";
  document.querySelector(".estadisticas").innerHTML = "";
}

const input = document.querySelector(".input");
const boton = document.querySelector(".boton");
const botonReiniciar = document.querySelector(".reiniciar");

botonReiniciar.addEventListener("click", () => {
  reseteoPanel();
});

boton.addEventListener("click", () => {
  const contenedorMensaje = document.querySelector(".mensaje");
  contenedorMensaje.innerHTML = "";

  if (input.value.trim() === "") {
    reseteoPanel();
    const mensaje = document.createElement("p");
    mensaje.textContent = "ingresa el nombre de un pokemon";
    contenedorMensaje.appendChild(mensaje);
    return;
  }
  const nombrePokemon = input.value.toLowerCase();
  buscarPokemon(nombrePokemon);
  input.value = "";
});

function mostrarNombre(data) {
  const nombreMostrado = document.querySelector(".nombre");
  nombreMostrado.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.classList.add("titulo-dinamico");
  titulo.textContent = "NOMBRE DEL POKÉMON:";

  const parrafo = document.createElement("p");
  parrafo.classList.add("segundoTituloDinamico");
  parrafo.textContent = data.name;

  nombreMostrado.appendChild(titulo);
  nombreMostrado.appendChild(parrafo);
}

function mostrarId(data) {
  const idPokemon = document.querySelector(".id");
  idPokemon.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.classList.add("titulo-dinamico");
  titulo.textContent = "NÚMERO DE POKÉDEX:";

  const contenido = document.createElement("p");
  contenido.classList.add("segundoTituloDinamico");
  contenido.textContent = data.id;

  idPokemon.appendChild(titulo);
  idPokemon.appendChild(contenido);
}

async function habilidadesPokemon(data) {
  const habilidad = document.querySelector(".habilidades");
  habilidad.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.classList.add("titulo-dinamico");
  titulo.textContent = "HABILIDADES:";
  habilidad.appendChild(titulo);

  const ul = document.createElement("ul");
  habilidad.appendChild(ul);

  for (element of data.abilities) {
    const response = await fetch(element.ability.url);
    const abilityData = await response.json();
    console.log("habilidades", abilityData);

    const HabilidadEspañol = abilityData.names.find(
      (idioma) => idioma.language.name === "es",
    );
    const li = document.createElement("ul");
    li.classList.add("segundoTituloDinamico");
    li.textContent = HabilidadEspañol.name;
    ul.appendChild(li);

    const descripcionHabilidadEspañol = abilityData.flavor_text_entries.find(
      (descripcion) => descripcion.language.name === "es",
    );
    const p = document.createElement("p");
    p.textContent = descripcionHabilidadEspañol.flavor_text;
    ul.appendChild(p);
  }
}

async function tiposPokemon(data) {
  const tipos = document.querySelector(".tipos");
  tipos.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.classList.add("titulo-dinamico");
  titulo.textContent = "TIPOS:";
  tipos.appendChild(titulo);

  const ul = document.createElement("ul");
  tipos.appendChild(ul);

  for (const element of data.types) {
    const response = await fetch(element.type.url);
    const tipoData = await response.json();
    console.log("tipo de dato", tipoData);

    const nombreEspañol = tipoData.names.find(
      (idioma) => idioma.language.name === "es",
    );
    const li = document.createElement("ul");
    li.classList.add("segundoTituloDinamico");
    li.textContent = nombreEspañol.name;

    ul.appendChild(li);
  }
}

async function estadisticasPokemon(data) {
  const estadisticasContendor = document.querySelector(".estadisticas");
  const tituloContenedor = document.createElement("h3");
  tituloContenedor.classList.add("titulo-dinamico");
  tituloContenedor.textContent = "ESTADÍSTICAS:";
  estadisticasContendor.appendChild(tituloContenedor);
  for (const element of data.stats) {
    console.log("element", element);
    const response = await fetch(element.stat.url);
    const EstadisticaData = await response.json();
    console.log("estadisticas", EstadisticaData);

    const filtradoEstadisticasPokemon = EstadisticaData.names.find(
      (idioma) => idioma.language.name === "es",
    );
    console.log("filtrado", filtradoEstadisticasPokemon);

    const lista = document.createElement("p");

    estadisticasContendor.appendChild(lista);
    const span = document.createElement("span");
    span.classList.add("segundoTituloDinamico");
    span.textContent = filtradoEstadisticasPokemon.name + ":";
    console.log("span", span);
    lista.appendChild(span);

    const span2 = document.createElement("span");
    span2.textContent = "" + element.base_stat + ".";
    console.log(span2);
    lista.appendChild(span2);
  }
}

async function descripcionPokemon(data) {
  //almacenamiento
  const espacioAlmacen = document.querySelector(".nombre");
  const espacioGeneracion = document.querySelector(".localidad");
  espacioGeneracion.innerHTML = "";
  const contenedorEspacioGeneracion = document.createElement("h3");
  contenedorEspacioGeneracion.classList.add("titulo-dinamico");
  contenedorEspacioGeneracion.textContent = "REGIÓN Y GENERACIÓN:";
  espacioGeneracion.appendChild(contenedorEspacioGeneracion);
  //fetch especies
  const response = await fetch(data.species.url);
  const especiesData = await response.json();
  console.log("especies", especiesData);

  //fetch generation
  const responseGen = await fetch(especiesData.generation.url);
  const dataGen = await responseGen.json();
  console.log("generacion", dataGen);

  //fetch a region
  const responseRegion = await fetch(dataGen.main_region.url);
  const regionData = await responseRegion.json();
  console.log("region", regionData);

  const regionIngles = regionData.names.find(
    (idioma) => idioma.language.name === "en",
  );
  console.log("region ingles", regionIngles);

  const parrafoRegion = document.createElement("p");
  parrafoRegion.classList.add("segundoTituloDinamico");
  parrafoRegion.textContent = regionIngles.name;
  espacioGeneracion.appendChild(parrafoRegion);

  const generacionEspañol = dataGen.names.find(
    (idioma) => idioma.language.name === "es",
  );
  console.log("generacion español", generacionEspañol.name);

  const generacionParrafo = document.createElement("p");
  generacionParrafo.classList.add("segundoTituloDinamico");
  generacionParrafo.textContent = generacionEspañol.name;
  espacioGeneracion.appendChild(generacionParrafo);

  const descripcionNombreEspañol = especiesData.flavor_text_entries.find(
    (element) => element.language.name === "es",
  );
  const descripcionNombreIngles = especiesData.flavor_text_entries.find(
    (elementEn) => elementEn.language.name === "en",
  );
  const p = document.createElement("p");
  p.textContent =
    descripcionNombreEspañol?.flavor_text ||
    descripcionNombreIngles?.flavor_text + " (sin descripción en español)" ||
    "de plano sin descripcion";
  espacioAlmacen.appendChild(p);
}

function imagenesPokemon(data) {
  const imagenes = document.querySelector(".imagenes");
  imagenes.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.classList.add("titulo-dinamico");
  titulo.textContent = "IMÁGENES:";
  imagenes.appendChild(titulo);

  const divIndividual1 = document.createElement("div");
  const imgFrente = document.createElement("img");
  const figcaption1 = document.createElement("figcaption");
  figcaption1.textContent = "Normal";

  imgFrente.classList.add("imagenes");
  imgFrente.src = data.sprites.front_default;

  const divIndividual2 = document.createElement("div");
  const imgAtras = document.createElement("img");
  const figcaption2 = document.createElement("figcaption");
  figcaption2.textContent = "Shiny";

  imgAtras.classList.add("imagenes");
  imgAtras.src = data.sprites.front_shiny;

  divIndividual1.appendChild(imgFrente);
  divIndividual1.appendChild(figcaption1);
  divIndividual2.appendChild(imgAtras);
  divIndividual2.appendChild(figcaption2);

  titulo.appendChild(divIndividual1);
  titulo.appendChild(divIndividual2);

  imagenes.appendChild(titulo);
}

async function localizaciones(data) {
  const response = await fetch(data.location_area_encounters);
  const locationData = await response.json();
  console.log("location", locationData);
}
