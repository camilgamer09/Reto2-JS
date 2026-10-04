const MAX_ALUMNOS = 10;
const NOTA_MINIMA_APROBACION = 55;

const nombres = [];
const notas = [];

const form = document.getElementById('alumnoForm');
const inputNombre = document.getElementById('nombre');
const inputC1 = document.getElementById('certamen1');
const inputC2 = document.getElementById('certamen2');
const inputC3 = document.getElementById('certamen3');
const btnAgregar = document.getElementById('btnAgregar');
const mensajeError = document.getElementById('mensajeError');

const seccionResultados = document.getElementById('seccionResultados');
const listaAlumnosDiv = document.getElementById('listaAlumnos');
const resumenCursoDiv = document.getElementById('resumenCurso');
const listaOrdenadaDiv = document.getElementById('listaOrdenada');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  mensajeError.textContent = '';

  const nombreVal = inputNombre.value.trim();
  const c1Val = parseFloat(inputC1.value);
  const c2Val = parseFloat(inputC2.value);
  const c3Val = parseFloat(inputC3.value);

  if (!validarEntradas(nombreVal, c1Val, c2Val, c3Val)) {
    return;
  }

  nombres.push(nombreVal);
  notas.push([c1Val, c2Val, c3Val]);

  renderizarResultados();
  form.reset();
  inputNombre.focus();

  if (nombres.length >= MAX_ALUMNOS) {
    btnAgregar.disabled = true;
    btnAgregar.textContent = 'Límite alcanzado (10/10)';
  }
});

