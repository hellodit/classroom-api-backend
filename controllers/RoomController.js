const Room = require('../models/Room'); 

const index = async(req,res) => { 
    const _id = req.params.id; 
    try {
        const room = await Room.findById(_id);
        if (!room) {
            return res.status(400).send(); 
        }
        res.send(room);
    } catch (error) {
        console.log(error);
        res.send(500).send();
    }
}

const create = async(req,res) => { 
    const room = new Room(req.body);
    try {
        await room.save();
        res.status(201).send({ 
            room
        });
    } catch (error) {
        res.status(400).send(e)
    }
}

const destroy = async(req,res) => { 

}

const edit = async(req,res) => { 

}

module.exports = {
    index,
    create,
    destroy,
    edit
}