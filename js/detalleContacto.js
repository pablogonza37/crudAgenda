console.log(window.location.search);

const parametroURL = URLSearchParams(window.location.search)
const idContacto = parametroURL.get('id');

console.log(idContacto)

//buscar del localstorage

//buscar dentro del array el contacto que tiene el idConatcto. find()

//usando el DOM cargo los datos del objeto encontrado