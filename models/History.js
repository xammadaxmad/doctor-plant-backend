const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    image_name: { type: String, required: true },
    image_path: { type: String, required: true },
    disease:{type:String,required:false,default:""},
    created_at: { type: Date, default: Date.now },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('History', historySchema);
