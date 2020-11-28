const validadorDatosEntrada = require('./validadorDatosEntrada');

const validarCamposGeneralesUsuario = ( usuario ) => {
    if( !validadorDatosEntrada.esTextoSoloLetrasValido(usuario.nombre) ) throw "El nombre no puede contener valores númericos o estar vacío";
    if( !validadorDatosEntrada.esTextoSoloLetrasValido(usuario.apellido) ) throw "El apellido no puede contener valores númericos o estar vacío";
    if( !validadorDatosEntrada.esTextoSoloLetrasValido(usuario.sexo) ) throw "El sexo no puede contener valores númericos o estar vacío";
    if( !validadorDatosEntrada.esNumeroValido(usuario.edad) ) throw "La edad no puede contener letras o estar vacía";
    if( !validadorDatosEntrada.esTextoSoloLetrasValido(usuario.departamento) ) throw "El Departamento no puede contener valores númericos o estar vacío";
    if( !validadorDatosEntrada.esNumeroValido(usuario.telefono) ) throw "La edad no puede contener letras o estar vacío";
    if( !validadorDatosEntrada.esEmailValido(usuario.email) ) throw "El email debe tener un formato válido y no puede estar vacío";
    if( !validadorDatosEntrada.esTextoSoloLetrasValido(usuario.tipoDocumento) ) throw "El tipo de documento no puede contener valores númericos o estar vacío";
    if( !validadorDatosEntrada.esNumeroValido(usuario.numeroDocumento) ) throw "El número de documento no puede contener letras o estar vacío";
}

const validarCamposEmpresario = ( usuarioEmpresario )=>{
    if( !validadorDatosEntrada.esTextoSoloLetrasValido(usuarioEmpresario.razonSocial) ) throw "La razón social no puede contener valores númericos o estar vacío";
    if( !validadorDatosEntrada.esNumeroValido(usuarioEmpresario.nit) ) throw "El nit no puede contener letras o estar vacío";
}

const validarCamposInversionista = ( usuarioInversionista )=>{
    if( !validadorDatosEntrada.esNumeroValido(usuarioInversionista.balance) ) throw "El balance no puede contener letras o estar vacío";
    if( !validadorDatosEntrada.esNumeroValido(usuarioInversionista.activos) ) throw "Los activos no pueden contener letras o estar vacíos";
    if( !validadorDatosEntrada.esNumeroValido(usuarioInversionista.pasivos) ) throw "Los pasivos no pueden contener letras o estar vacíos";
    if( !validadorDatosEntrada.esNumeroValido(usuarioInversionista.patrimonio) ) throw "El patrimonio no puede contener letras o estar vacío";
}

const validarLoginEmailYPassword = (email, password)=>{

    if ( !validadorDatosEntrada.esEmailValido( email )) throw "El email no es válido o no ha insertado un valor";
    if ( !validadorDatosEntrada.hayAlgunPassword( password )) throw "No hay contraseña insertada";

}

module.exports = {
    validarLoginEmailYPassword,
    validarCamposInversionista,
    validarCamposEmpresario,
    validarCamposGeneralesUsuario
}