const Room = require('../models/Room'); 

const index = async(req,res) => { 
    const _id = req.params.id; 
    try {
        const room = await Room.findOne({
            _id,
            teacher: req.user._id
        })        
        if (!room) {
            return res.status(400).send(); 
        }

        res.send(room);
    } catch (error) {
        res.send(500).send();
    }
};

const create = async(req,res) => {     
    const room = new Room({
        ...req.body, 
        teacher: req.user._id
    });
    try {
        await room.save();
        res.status(201).send({ 
            room
        });
    } catch (error) {
        res.status(500).send(e)
    }
};

const destroy = async(req,res) => {     
    try {
        const room = await Room.findOneAndDelete({
            _id:req.params.id,
            teacher: req.user._id
        });        
        if(!room){
            return res.status(400).send()
        }
        res.send(room);
    } catch (error) {
        res.status(500).send(error)
    }
};

const edit = async(req,res) => { 
    const updates = Object.keys(req.body); 
    const allowedUpdates = ['name','description']; 
    const isValidOperation = updates.every(update =>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({
            error: 'invalid updates'
        })
    }

    try {
        const room = await Room.findOne({
            _id:req.params.id,
            teacher: req.user._id
        });     
        updates.forEach(update => room[update] = req.body[update]);
        await room.save(); 

        if (!room) {
            return res.status(400).send()
        };

        res.send(room);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    index,
    create,
    destroy,
    edit
}