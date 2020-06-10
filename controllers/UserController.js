require('../database/mongoose')

const User = require('../models/user')

const index = async(req, res) => { 
    try {
        const greeting ='asdita ganteng banget'; 

        res.status(200).send({
            greeting    
        });

    } catch (error) {
        res.status(400).send(error)
    }
}

const register = async(req, res) => { email
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({
            user,
            token
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

const login = async(req, res) => {
    try {
        const user = await User.findbyCredentials(req.body.email, req.body.password); 
        const token = await user.generateAuthToken();

        res.status(200).send({
            user, 
            token
        })
    } catch (error) {
        console.log(error);
        
        res.status(400).send(error);
    }
}

const profile = async(req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    index,register,login,profile
}