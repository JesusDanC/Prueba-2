const { response } = require('express'); 

const modelo_productos = require('../model/productos');

const Ver_productos = async(req, res) => {
    const productos = await modelo_productos.find({}, 'id_producto descripcion stock precio proveedor');

    res.json(productos);
}

const Crear_productos = async(req, res) => {
    const {descripcion} = req.body;

    try {
        const existe_producto = await modelo_productos.findOne({descripcion});

        if (existe_producto) {
            return res.status(200).json({
                ok: false,
                msg: 'El nombre ya existe'
            });
        }

        const productos = new modelo_productos( req.body );
        await productos.save();

        res.status(200).json({
            ok: true,
            productos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar datos'
        });
    }
}

const Actualizar_productos = async ( req, res = response) => {
    const descripcion = req.params.id;

    try {
        const producto_buscado = await modelo_productos.findOne({descripcion});

        if(!producto_buscado) {
            return res.status(404).json({
                ok:false,
                msg: 'El producto no existe'
            });
        }
        
        const campos = req.body;

        if (producto_buscado.descripcion === req.body.descripcion) {
            delete campos.descripcion;
        } else {
            const existe_producto = await modelo_productos.findOne({ descripcion: req.body.descripcion });
            if (existe_producto) {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un producto con esa descripcion"
                });
            }
        }

        const productoActualizado = await modelo_productos.findOneAndUpdate({descripcion}, campos, { new: true });
        res.json({
            ok:true,
            modelo_productos: productoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado!!!'
        });
    }
}

const Borrar_productos = async (req, res = response) => {
    const descripcion = req.params.id;
    
    try {
        const producto_buscado = await modelo_productos.findOne({descripcion});

        if( !producto_buscado ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un producto con ese nombre'
            });
        }

        await modelo_productos.findOneAndDelete({descripcion});
        
        res.json({
            ok: true, 
            msg: 'Producto eliminado correctamente'
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
    Ver_productos,
    Crear_productos,
    Actualizar_productos,
    Borrar_productos
}