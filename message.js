const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: {type: String, required: false,}
});


module.exports = mongoose.model('Messages' , messageSchema);