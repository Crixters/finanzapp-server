const express = require('express');
const app = express();

app.use(require('./sesion/iniciarSesion'));
app.use(require('./sesion/registrarEmpresario'));
app.use(require('./sesion/registrarInversionista'));


module.exports = app;