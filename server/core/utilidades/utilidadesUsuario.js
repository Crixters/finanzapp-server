const jwt = require('jsonwebtoken');
require('../../config/config');

const crearTokenDeUsuario = ( usuarioCreado ) => {

    let token = jwt.sign({
        user: usuarioCreado
    }, process.env.SEED);
  
    return token;
  
  }
  
const obtenerUsuarioSiTokenVerificado = async ( token ) => {
  
   let usuarioObtenido = await jwt.verify( token, process.env.SEED , (err , Payload) => {
  
     if (err ) return null;
  
     return Payload.user;
  
   } );
  
   return usuarioObtenido;
  
  
  }

  
  
  module.exports = {
      crearTokenDeUsuario,
      obtenerUsuarioSiTokenVerificado 
  };