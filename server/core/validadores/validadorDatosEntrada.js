
const esEmailValido = ( emailAVerificar ) => {

    if( emailAVerificar == null) return false;

    let emailPatron = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let coincidenEmailYPatron = emailPatron.test( emailAVerificar ); 

    return coincidenEmailYPatron;

  }

  const esNumeroValido = ( textoAVerificar ) => {

    if( textoAVerificar == null) return false;

    let numeroPatron = /^\d+$/;

    let coincidenTextoYPatron = numeroPatron.test( textoAVerificar ); 

    return coincidenTextoYPatron;

  }

 const hayAlgunPassword = ( password ) => {

     if( password == null || password == "") return false;

     return true;

  }

  const esTextoSoloLetrasValido = ( textoAProbar ) => {

    if( textoAProbar == null || textoAProbar == "" ) return false;

    let textoSoloLetrasPatron = /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g;

    let coincidenTextoYPatron = textoSoloLetrasPatron.test( textoAProbar ); 

    return coincidenTextoYPatron;

  }



module.exports = {
    hayAlgunPassword,
    esTextoSoloLetrasValido,
    esEmailValido,
    esNumeroValido
};