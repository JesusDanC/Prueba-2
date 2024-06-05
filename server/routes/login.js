const express = require('express');
const router = express.Router();
const modelo_usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

router.get('/', async(req, res) => {
  res.json({mensaje: 'Funciona!'})
})

router.post('/', async(req, res) => {
    const body = req.body;
  
    try {
        const usuario_buscado = await modelo_usuario.findOne({nombre: body.nombre});
  
        if(!usuario_buscado){
          console.log('Usuario no encontrado')      
          return res.status(400).json({
                    mensaje: 'Usuario no encontrado',
            });
            
        }
  
        if( !bcrypt.compareSync(body.pin, usuario_buscado.pin) ){
          console.log('Pin invalido')      
          return res.status(400).json({
                    mensaje: 'Contraseña invalida',
            });
            
        }

        let token = jwt.sign({
            data: usuario_buscado
        }, 'secret', { expiresIn: 60}) // 60 * 60 * 24 * 1
        console.log(token)

        return res.json({
            usuario_buscado,
            token: token
        })
      
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      });
    }
  
  });

module.exports = router;