const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hashesMetodos = require('../../core/utilidades/hashesMetodos');
const conexionDB = require('../../core/conexiones/conexionDB');
const utilidadesUsuario = require('../../core/utilidades/utilidadesUsuario');
const validadorUsuario = require('../../core/validadores/validadorUsuario');
const providerUsuario = require('../../data/providerUsuario');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/iniciarSesion', async (req, res) => {

    let clienteInstanciado = conexionDB.instanciarCliente();

    try {

        await conexionDB.establecerConexionDB( clienteInstanciado );

        validadorUsuario.validarLoginEmailYPassword( req.body.email, req.body.password );

        let usuarioObtenidoDB = await providerUsuario.obtenerUsuarioPorEmail( clienteInstanciado , req.body.email );  
        let usuarioObtenidoDBPassword = usuarioObtenidoDB.contraseña;
        let coincidenAmbosPasswords = hashesMetodos.compararPasswordsHasheados( req.body.password , usuarioObtenidoDBPassword  );
        
        if( coincidenAmbosPasswords ){

           delete usuarioObtenidoDB.contraseña;
           let token = utilidadesUsuario.crearTokenDeUsuario( usuarioObtenidoDB );

           res.status(200).json({ exito: true, data: { usuario: usuarioObtenidoDB, autorizacion: token } , error: null });

        } else {
            res.status(400).json({ exito: false, data: {} , error: "No se encontró un usuario registrado con el email o contraseña dados" });
        }

    }catch( error ){

         res.status(404).json({ exito: false, data: {},  error: String(error) });

    } finally { 

        await clienteInstanciado.end();

    }

});


module.exports = app;