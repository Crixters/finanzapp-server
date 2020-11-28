const {Client} = require('pg');

function instanciarCliente(){

    let cliente = new Client({
        user: "pqkxfntm",
        password: "IvvHIw_2OAB11ofAPeQ5NfmgA7OT9_CY",
        host:"suleiman.db.elephantsql.com",
        port: 5432,
        database: "pqkxfntm" 
      
    });

    return cliente;

}

function establecerConexionDB( cliente ){
    return cliente.connect();
}


module.exports = {
    establecerConexionDB,
    instanciarCliente
};