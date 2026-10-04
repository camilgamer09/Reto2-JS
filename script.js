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

function renderizarResultados() {
  seccionResultados.style.display = 'block';

  let htmlAlumnos = '';
  nombres.forEach((nombre, idx) => {
    const c = notas[idx];
    const prom = obtenerPromedioAlumno(idx);
    htmlAlumnos += `
      <div class="alumno-block">
        <strong>Nombre ${idx + 1}: ${nombre}</strong><br>
        C1: ${c[0]}<br>
        C2: ${c[1]}<br>
        C3: ${c[2]}<br>
        Promedio: ${prom.toFixed(2)}
      </div>
    `;
  });
  listaAlumnosDiv.innerHTML = htmlAlumnos;

  const promC1 = obtenerPromedioCertamen(0);
  const promC2 = obtenerPromedioCertamen(1);
  const promC3 = obtenerPromedioCertamen(2);
  const promGeneral = obtenerPromedioGeneral();
  const { aprobados, reprobados } = obtenerAprobadosYReprobados();

  resumenCursoDiv.innerHTML = `
    <div class="resumen-block">
      Promedio del curso C1: ${promC1.toFixed(2)}<br>
      Promedio del curso C2: ${promC2.toFixed(2)}<br>
      Promedio del curso C3: ${promC3.toFixed(2)}<br>
      Promedio Final Curso: ${promGeneral.toFixed(2)}<br>
      Aprobados: ${aprobados}<br>
      Reprobados: ${reprobados}
    </div>
  `;

  const listaOrdenada = obtenerAlumnosOrdenados();
  let htmlOrdenados = '<strong>Alumnos Ordenados por Promedio:</strong><br>';
  listaOrdenada.forEach(item => {
    htmlOrdenados += `${item.nombre}: ${item.promedio.toFixed(2)}<br>`;
  });
  listaOrdenadaDiv.innerHTML = `<div class="ordenados-block">${htmlOrdenados}</div>`;
}