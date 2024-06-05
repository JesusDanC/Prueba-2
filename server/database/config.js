const mongoose = require('mongoose');

const conexion_base_datos = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, {});
        console.log("Bases de datos Online");
    } catch (error) {
        console.error('No se puede conectar a la BDD', error.message);
    }
}

module.exports = {
    conexion_base_datos
}
