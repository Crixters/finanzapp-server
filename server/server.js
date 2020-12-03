const express = require('express');
const app = express();
require('./config/config');
const {habilitarCORS} = require('./middlewares/habilitarCORS');

app.use(habilitarCORS());
app.use(require('./rutas/presentadorRutas'));//

app.listen(process.env.PORT, () => {
    console.log("Corriendo en el puerto " + process.env.PORT);
});