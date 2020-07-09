const User = require('../models/user');
const {responseInfo}  = require('../Helpers/responseHelper');

const index = async(req, res) => {
    try {
        const greeting ='It\'s work '; 
        res.status(200).send({
            greeting    
        });
    } catch (error) {
        res.status(400).send(error)
    }
}

const register = async(req, res) => { 
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        const data = {
            user,
            token
        }
        res.status(201).send(responseInfo('user created',data));
    } catch (error) {
        res.status(400).send(responseInfo(error));
    }
}

const login = async(req, res) => {
    try {
        const user = await User.findbyCredentials(req.body.email, req.body.password); 
        const token = await user.generateAuthToken();
        const data = {
            user,
            token
        }
        res.status(200).send(responseInfo('Login success',data));

    } catch (error) {
        console.log(error);
        
        res.status(400).send(responseInfo(error));
    }
}

const profile = async(req, res) => {
    try {
        res.status(200).send(responseData(req.user));
    } catch (error) {
        res.status(400).send(responseInfo(error));
    }
}

module.exports = {
    index,register,login,profile
}