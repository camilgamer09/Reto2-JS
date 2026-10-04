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

function validarEntradas(nombre, c1, c2, c3) {
  if (!nombre) {
    mensajeError.textContent = 'Por favor, ingresa un nombre válido.';
    return false;
  }
  const notasValidas = [c1, c2, c3].every(n => !isNaN(n) && n >= 1 && n <= 100);
  if (!notasValidas) {
    mensajeError.textContent = 'Las notas deben ser números entre 1 y 100.';
    return false;
  }
  return true;
}

const calcularPromedioArreglo = (arr) => 
  arr.length ? arr.reduce((acc, curr) => acc + curr, 0) / arr.length : 0;

function obtenerPromedioAlumno(index) {
  return calcularPromedioArreglo(notas[index]);
}

function obtenerPromedioCertamen(numCertamen) {
  const notasCertamen = notas.map(fila => fila[numCertamen]);
  return calcularPromedioArreglo(notasCertamen);
}

function obtenerPromedioGeneral() {
  const promediosAlumnos = nombres.map((_, i) => obtenerPromedioAlumno(i));
  return calcularPromedioArreglo(promediosAlumnos);
}

function obtenerAprobadosYReprobados() {
  const promedios = nombres.map((_, i) => obtenerPromedioAlumno(i));
  const aprobados = promedios.filter(prom => prom >= NOTA_MINIMA_APROBACION).length;
  const reprobados = promedios.length - aprobados;
  return { aprobados, reprobados };
}

function obtenerAlumnosOrdenados() {
  const lista = nombres.map((nombre, i) => ({
    nombre: nombre,
    promedio: obtenerPromedioAlumno(i)
  }));
  return lista.sort((a, b) => b.promedio - a.promedio);
}

