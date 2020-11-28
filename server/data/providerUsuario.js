const hashesMetodos = require('../core/utilidades/hashesMetodos');

const insertarDataUsuarioGeneralYRegresarID = async ( cliente , usuarioAInsertar, tipoPersona ) => {
  usuarioAInsertar.password = hashesMetodos.hashearPasswordDeUsuario( usuarioAInsertar.password ); // HASH THE PASSWORD WITH BCRYPT

  let idResponse = await cliente.query(`INSERT INTO USUARIO (nombre, apellido, sexo, edad, ciudad, departamento, telefono, email, personatipo, tipodocumento, numerodocumento, contraseña) VALUES ('${usuarioAInsertar.nombre}',
  '${usuarioAInsertar.apellido}','${usuarioAInsertar.sexo}',${usuarioAInsertar.edad},${usuarioAInsertar.ciudad}'','${usuarioAInsertar.departamento}',${usuarioAInsertar.telefono},
  '${usuarioAInsertar.email}',${tipoPersona},'${usuarioAInsertar.tipoDocumento}','${usuarioAInsertar.numeroDocumento}','${usuarioAInsertar.password}') RETURNING id`);

  let id = idResponse.rows[0]["id"]

  return id

}
 
const insertarInversionistaDB = async ( cliente , inversionistaAInsertar ) => {

  let idUsuarioGeneralInsertado = await insertarDataUsuarioGeneralYRegresarID( cliente, inversionistaAInsertar, "2" );
   
   return cliente.query(`INSERT INTO INVERSIONISTA (balance,activos,pasivos,patrimonio,usuarioid) VALUES (${inversionistaAInsertar.balance},
    ${inversionistaAInsertar.activos},${inversionistaAInsertar.pasivos},${inversionistaAInsertar.patrimonio},${idUsuarioGeneralInsertado})`);

}

 
const insertarEmpresarioDB = async ( cliente , empresarioAInsertar ) => {

  let idUsuarioGeneralInsertado = await insertarDataUsuarioGeneralYRegresarID( cliente, empresarioAInsertar, "1" );
   
  return cliente.query(`INSERT INTO EMPRESARIO (razonsocial , nit , usuarioid) VALUES ('${empresarioAInsertar.razonSocial}',
    ${empresarioAInsertar.nit},${idUsuarioGeneralInsertado})`);

}

const obtenerUsuarioPorEmail = async ( client , email) => { 

  let respuesta = await client.query(`SELECT * FROM USUARIO WHERE email = '${email.toLowerCase()}'`);

  let usuarioObtenido = respuesta.rows[0];

  if( usuarioObtenido == null) throw "No se encontró un usuario registrado con el email o contraseña dados";

  return usuarioObtenido;

}


module.exports = {
  insertarInversionistaDB,
  insertarEmpresarioDB,
  obtenerUsuarioPorEmail
};