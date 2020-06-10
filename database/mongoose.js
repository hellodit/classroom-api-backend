const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_HOST,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});