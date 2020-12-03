const express = require('express');
const app = express();
require('./config/config');

app.use(require('./rutas/presentadorRutas'));//

app.listen(process.env.PORT, () => {
    console.log("Corriendo en el puerto " + process.env.PORT);
});