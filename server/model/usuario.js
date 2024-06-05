const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: true,
        unique: true
    },
    pin:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default:'USER_ROLE'
    }
});

UsuarioSchema.method('toJSON', function() {
    const { __v, __id, ...object} = this.toObject();

    object.uid = __id;

    return object;
});

UsuarioSchema.method('toJSON', function() {
    const object = this.toObject();
    delete object.pin;
    return object;
});

module.exports = model('usuario', UsuarioSchema);