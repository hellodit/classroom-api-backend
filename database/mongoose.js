const mongoose = require('mongoose');
const db = mongoose.connection; 

mongoose.connect(process.env.MONGODB_HOST,{useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('database connected!');
});