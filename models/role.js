const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({

    name: { type: String},
    description: {type: String}
})

module.exports = mongoose.model('role', roleSchema);