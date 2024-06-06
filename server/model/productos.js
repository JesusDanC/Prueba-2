const { Schema, model } = require('mongoose');

const ProductosSchema = Schema({
    id_producto:{
        type: String,
        required: true,
        unique: true
    },
    descripcion:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    proveedor:{
        type: String,
        required: true
    },
});

ProductosSchema.method('toJSON', function() {
    const { __v, __id, ...object} = this.toObject();

    object.uid = __id;

    return object;
});

module.exports = model('productos', ProductosSchema);