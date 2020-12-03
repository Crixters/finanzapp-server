const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conexionDB = require('../../core/conexiones/conexionDB');
const providerUsuario = require('../../data/providerUsuario');
const utilidadesUsuario = require('../../core/utilidades/utilidadesUsuario');
const validadorUsuario = require('../../core/validadores/validadorUsuario');
const {habilitarCORS} = require('../../middlewares/habilitarCORS');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/registrarInversionista', habilitarCORS , async (req, res) => {

    let clienteInstanciado = conexionDB.instanciarCliente();

    try {

        let inversionistaAInsertar = {
            nombre : req.body.nombre.trim(),
            apellido : req.body.apellido.trim(),
            sexo: req.body.sexo.trim(),
            edad: req.body.edad,
            ciudad: req.body.ciudad.trim(),
            departamento: req.body.departamento.trim(),
            telefono: req.body.telefono,
            email: req.body.email.trim(),
            tipoDocumento: req.body.tipoDocumento.trim(),
            numeroDocumento: req.body.numeroDocumento.trim(),
            password: req.body.password.trim(),
            balance: req.body.balance,
            activos: req.body.activos,
            pasivos: req.body.pasivos,
            patrimonio: req.body.patrimonio
          }

        await conexionDB.establecerConexionDB( clienteInstanciado );

        validadorUsuario.validarCamposGeneralesUsuario( inversionistaAInsertar );
        validadorUsuario.validarCamposInversionista( inversionistaAInsertar );

        await providerUsuario.insertarInversionistaDB( clienteInstanciado , inversionistaAInsertar );

        delete inversionistaAInsertar.password;

        let token = utilidadesUsuario.crearTokenDeUsuario( inversionistaAInsertar );

        res.status(200).json({ exito: true, data: { usuario: inversionistaAInsertar, autorizacion: token } , error: null });

    } catch( error ){

         res.status(404).json({ exito: false, data: {},  error: String(error) });

    } finally { 

        await clienteInstanciado.end();

    }

});


module.exports = app;