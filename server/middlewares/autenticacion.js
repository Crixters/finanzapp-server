//VERIFICAR TOKEN
const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {

    let token = req.get('Autorizacion');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) { return res.status(401).json({ exito: false,  data: {}, error: "Token no válido"}); }

        req.usuario = decoded.usuario;

        next();

    });



};

module.exports = {
    verificarToken
};