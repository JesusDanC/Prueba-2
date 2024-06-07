const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');

const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");

dbConnection();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        message: 'Peticion realizada correctamente'
    }) 
});

app.listen(port, () => {
    console.log(`Express Server Puerto: ${port}:\x1b[32m%s\x1b[0m`, 'online');
});