const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const roomSchema = new Schema({
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
        require:true, 
        ref: 'User'
    },
    materials: [{
        title: {
            type: String, 
            required:true, 
            trim:true,
        },
        description:{
            type: String, 
            required:true, 
            trim:true
        }},{
            timestamps:true
        }]
    },{
        timestamps:true
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;