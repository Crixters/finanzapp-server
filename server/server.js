const express = require('express');
const app = express();
const cors = require('cors');
require('./config/config');

app.use(cors());
app.use(require('./rutas/presentadorRutas'));//

app.listen(process.env.PORT, () => {
    console.log("Corriendo en el puerto " + process.env.PORT);
});