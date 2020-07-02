const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {
        type: String, 
        required:true, 
        trim:true,
    },
    description:{
        type: String, 
        required:true, 
        trim:true
    }, 
    teacher:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;