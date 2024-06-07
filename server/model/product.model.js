const mongoose = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productProvider: {
        type: String,
        required: true
    }
});

productSchema.plugin(autoIncrement, { inc_field: 'productId' });

productSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();

    object.uid = _id;

    return object;
})

module.exports = mongoose.model("products", productSchema);