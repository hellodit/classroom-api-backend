const Room = require('../models/room');

const index = async(req,res) => {
    const _id = req.params.roomid;    
    try {
        const room = await Room.findOne({
            _id,
            teacher: req.user._id
        });   

        if (!room) {
            return res.status(400).send(); 
        }        
       res.status(201).send({
           'status': true, 
           'data':  room.materials 
        });
    } catch (error) {
        res.send({'status':false, 'data' : []}).status(500)
    }
}

const craete = async(req, res) => { 
    const _id = req.params.roomid;     
    try {
        const room = await Room.findOne({
            _id,
            teacher: req.user._id
        });       
        if (!room) {
            return res.status(400).send(); 
        }
        room.materials.push(req.body); 
        await room.save();

        res.status(201).send({ 
            'status' : true,
            'message': 'Data successfuly added!',
            'data': room
        });

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { 
    index, 
    craete
}