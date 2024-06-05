const jwt = require('jsonwebtoken');

const verificarAuth = (req, res, next) => {
    let token = req.get('token');
  
    jwt.verify(token, 'secret', (err, decoded) => {
  
        if(err) {
            return res.status(401).json({
                mensaje: 'Error de token',
                err
            });
        }
        
        req.usuario = decoded.data; 
        next();
    });
}

const verificarRol = (req, res, next) => {
    let rol = req.usuario.role;
    console.log(rol);
    
    if(rol !== 'ADMIN'){
        return res.status(401).json({
            mensaje: 'Rol no autorizado!'
        });
    }

    next();
}
  
module.exports = {verificarAuth, verificarRol};
//
  