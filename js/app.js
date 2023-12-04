//import {Contacto, prueba} from "./classContacto.js";
import Contacto from "./classContacto.js";

//variables globales
//const contactoNuevo = new Contacto(1,'algun nombre', 'apellido', 'dsfdkdfd@.com', 4454566767);
const agenda = JSON.parse(localStorage.getItem('agendaKey')) || [];
const formularioContacto = document.querySelector("form");
const nombre = document.querySelector("#nombre"),
  apellido = document.querySelector("#apellido"),
  email = document.querySelector("#email"),
  telefono = document.querySelector("#telefono");
console.log(formularioContacto);

// funciones
const crearContacto = (e) => {
  e.preventDefault();
  console.log("desde la funcion crear Contacto");
  //crear el objeto con los datos del formulario
  const contactoNuevo = new Contacto(
    crypto.randomUUID(),
    nombre.value,
    apellido.value,
    email.value,
    telefono.value
  );
  //guardar el objeto en un array
  agenda.push(contactoNuevo);
  //guardar la agenda en localstorage
  guardarEnLocalstorage();
  console.log(agenda);
  limpiarFormulario();
  //dibujar fila
  crearFila(contactoNuevo, agenda.length);
};

const guardarEnLocalstorage = () =>{
    localStorage.setItem('agendaKey', JSON.stringify(agenda));
}

const limpiarFormulario = () =>{
    formularioContacto.reset();
}

const cargaInicial = () =>{
    if(agenda.length > 0){
        agenda.map((contacto, posicion)=> crearFila(contacto, posicion +1))
        
    }
}

const crearFila = (contacto, fila) =>{
    const tablaContacto = document.querySelector('#tablaContacto');
    tablaContacto.innerHTML += `<tr>
    <th scope="row">${fila}</th>
    <td>${contacto.nombre}</td>
    <td>${contacto.apellido}</td>
    <td>${contacto.email}</td>
    <td>${contacto.telefono}</td>
    <td>
    <a class="btn btn-primary">Ver mas</a>
    <button class="btn btn-warning">Editar</button>
    <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
  </td>
  </tr>`

}
window.borrarContacto = (idContacto)=>{
  console.log('desde la funcion borrar contacto')
  //buscar por id un contacto y obtener su posicion. findIndex
  const posicionContactoBuscado = agenda.findIndex((contacto)=> contcto.id === idContacto);
  console.log(posicionContactoBuscado);
  //borrarlo de un array - splice(posicion del elemento, cuantos quiero borrar)
  agenda.splice(posicionContactoBuscado, 1);
  //actualizar el localstorage
  guardarEnLocalstorage();
  //borrar la fila de la tabla
  const tablaContacto = document.querySelector('tbody');
  console.log(tablaContacto.children[posicionContactoBuscado])
  tablaContacto.removeChild(tablaContacto.children[posicionContactoBuscado]);
  //actualizar todos los td de la tabla con el numero de fila correcto
}

// logica
formularioContacto.addEventListener("submit", crearContacto);

cargaInicial();
