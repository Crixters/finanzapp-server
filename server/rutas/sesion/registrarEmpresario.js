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


app.post('/api/registrarEmpresario', habilitarCORS , async (req, res) => {

    let clienteInstanciado = conexionDB.instanciarCliente();

    try {

    let empresarioAInsertar = {
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
        razonSocial: req.body.razonSocial.trim(),
        nit: req.body.nit
      };

        await conexionDB.establecerConexionDB( clienteInstanciado );

        validadorUsuario.validarCamposGeneralesUsuario( empresarioAInsertar );
        validadorUsuario.validarCamposEmpresario( empresarioAInsertar );

        await providerUsuario.insertarEmpresarioDB( clienteInstanciado , empresarioAInsertar );

        delete empresarioAInsertar.password;

        let token = utilidadesUsuario.crearTokenDeUsuario( empresarioAInsertar );

        res.status(200).json({ exito: true, data: { usuario: empresarioAInsertar, autorizacion: token } , error: null });

    } catch( error ){

         res.status(404).json({ exito: false, data: {},  error: String(error) });

    } finally { 

        await clienteInstanciado.end();

    }

});


module.exports = app;