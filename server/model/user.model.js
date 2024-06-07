const mongoose = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        unique: true,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userRole: {
        type: String,
        required: true,
        default: "Admin"
    }
});

userSchema.plugin(autoIncrement, { inc_field: 'userId' });

userSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();

    object.uid = _id;

    return object;
})

module.exports = mongoose.model("users", userSchema);