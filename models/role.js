const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({

    name: { type: String},
    description: {type: String}
} ,{timestamps:true})

module.exports = mongoose.model('role', roleSchema);