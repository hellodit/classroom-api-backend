const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const materialSchema = new Schema({
    title: {
        type: String, 
        required:true, 
        trim:true,
    },
    description:{
        type: String, 
        required:true, 
        trim:true
    }
},{
    timestamps:true
});


const Material = mongoose.model('Material', materialSchema); 
module.exports = Material; 

