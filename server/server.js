var express = require('express');
require ('dotenv').config();

const cors = require('cors');
const path = require('path');
const { conexion_base_datos } = require('./database/config');

var app = express();

app.use(cors());
const whiteList = ['proccess.env.FRONTEND_URL', undefined];

const corsOption = {
    origin: function (origin, callback) {
        if(whiteList.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error('Error del CORS'));
        }
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

conexion_base_datos();

app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/login', require('./routes/login'));

app.get('/', (req, res) => {
    res.send('Hola');
});

const history = require('connect-history-api-fallback');

app.listen(process.env.PORT, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m','online');
});
