const serviceUser = require('../service/serviceUser.js');
const bodyParser = require('body-parser');

let router = require('express').Router();

//Search meeting
router.get('/', async function(request, response) {
    let object = request.body

    //Validar entradas

    response.send(await serviceUser.find(object));
});

//Insert user
router.post('/', async function(request, response) {
    let object = request.body
    
    //Validar entradas

    response.send(await serviceUser.insert(object));
});

//Update user
router.put('/', async function(request, response) {
    let objectSearch = {
        name: request.body.meetingName
    }
    let objectUpdate = {
        date: request.body.meetingDate, 
        place: request.body.meetingPlace
    }
    //Validar entradas

    response.send(await serviceUser.update(objectSearch, objectUpdate));
});

//Delete user
router.delete('/', async function(request, response) {
    let object = request.body
    
    //Validar entradas

    response.send(await serviceUser.remove(object));
});

module.exports = router;
