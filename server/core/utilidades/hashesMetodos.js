const bcrypt = require('bcryptjs');

const compararPasswordsHasheados = ( passwordAComparar , passwordEnDB ) => {
 
  let sonPasswordsIguales = bcrypt.compareSync( passwordAComparar, passwordEnDB );

  return sonPasswordsIguales;
   
}

const hashearPasswordDeUsuario = ( passwordAHashear ) => {
 
  let numeroDeVueltas = 10;

  let passwordHasheado = bcrypt.hashSync( passwordAHashear, numeroDeVueltas);

  return passwordHasheado;
  
}

module.exports = {
  compararPasswordsHasheados,
  hashearPasswordDeUsuario
};
