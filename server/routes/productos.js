const { Router } = require('express');
const { check } = require('express-validator');
const { Ver_productos, Crear_productos, Actualizar_productos, Borrar_productos } = require('../controller/productos');
const {verificarAuth} = require('../middlewares/auth');

const router = Router();

router.get('/', Ver_productos, verificarAuth);

router.post('/', [
        check('nombre', 'Este campo es obligatorio').not().isEmpty(),
        check('pin', 'Este campo es obligatorio').not().isEmpty()
    ], 
    Crear_productos, verificarAuth
);

router.put('/:id',
    [
        check('nombre', 'Este campo es obligatorio').not().isEmpty(),
        check('pin', 'Este campo es obligatorio').not().isEmpty()
    ],
    Actualizar_productos, verificarAuth
);

router.delete('/:id',
    Borrar_productos, verificarAuth
);

module.exports = router;