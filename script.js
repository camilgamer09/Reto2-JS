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

