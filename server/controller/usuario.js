const { response } = require('express'); 
const bcrypt = require('bcryptjs');

const modelo_usuario = require('../model/usuario');

const Ver_usuarios = async(req, res) => {
    const usuarios = await modelo_usuario.find({}, 'nombre pin role');

    res.json(usuarios);
    console.log(usuarios)
}

const Crear_usuarios = async(req, res) => {
    const {nombre, pin} = req.body;

    try {
        const Existe_usuario = await modelo_usuario.findOne({nombre});

        if (Existe_usuario) {
            return res.status(200).json({
                ok: false,
                msg: 'El nombre ya existe'
            });
        }

        const usuarios = new modelo_usuario( req.body );

        const encriptar = bcrypt.genSaltSync(10);
        usuarios.pin = bcrypt.hashSync(pin, encriptar);
        
        await usuarios.save();

        res.status(200).json({
            ok: true,
            usuarios
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar datos'
        });
    }
}

const Actualizar_usuarios = async ( req, res = response) => {
    const nombre = req.params.nombre;

    try {
        const usuario_buscado = await modelo_usuario.findOne(nombre);

        if(!usuario_buscado) {
            return res.status(404).json({
                ok:false,
                msg: 'El nombre del usuario no existe'
            });
        }
        
        const campos = req.body;

        if (usuario_buscado.nombre === req.body.nombre) {
            delete campos.nombre;
        } else {
            const existe_nombre = await modelo_usuario.findOne({ nombre: req.body.nombre });
            if (existe_nombre) {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese nombre"
                });
            }
        }

        const encriptar = bcrypt.genSaltSync(10);
        campos.pin = bcrypt.hashSync(campos.pin, encriptar);

        const usuarioActualizado = await modelo_usuario.findOneAndUpdate(nombre, campos, { new: true });
        res.json({
            ok:true,
            modelo_usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado!!!'
        });
    }
}

const Borrar_usuarios = async (req, res = response) => {
    const nombre = req.params.nombre;
    
    try {
        const usuario_buscado = await modelo_usuario.findOne(nombre);

        if( !usuario_buscado ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario con ese nombre'
            });
        }

        await modelo_usuario.findOneAndDelete(nombre);
        
        res.json({
            ok: true, 
            msg: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar el registro'
        });
    }
}

module.exports = {
    Ver_usuarios,
    Crear_usuarios,
    Actualizar_usuarios,
    Borrar_usuarios
}