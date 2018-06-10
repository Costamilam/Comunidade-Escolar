const serviceEvent = require('../service/event.js');
const bodyParser = require('body-parser');

let router = require('express').Router();

//Search event by proprietys name, date and place (teaching institute)
router.get('/name/(:name)?/place/(:teachingInstituteId)?/date/(:date)?', async function(request, response) {
    let object = {};

    if (request.params.name !== undefined) {
        object.name = new RegExp(`.*${request.params.name.replace(' ', '.*')}.*`, 'i');
    }
    if (request.params.teachingInstituteId !== undefined) {
        object.teachingInstitute = request.params.teachingInstituteId;
    }
    if (request.params.date !== undefined) {
        object.date = request.params.date;
    }

    //Validate

    response.send(await serviceEvent.find(object));
});

//Search event by propriety _id
router.get('/id/:id', async function(request, response) {
    //Validate

    response.send(await serviceEvent.findById(request.params.id));
});

//Search event by propriety user
router.get('/user/:id', async function(request, response) {
    //Validate

    response.send(await serviceEvent.findByUser(request.params.id));
});

//Insert event
router.post('/', async function(request, response) {
    let object = request.body

    //Validate

    response.send(await serviceEvent.insert(object));
});

//Insert participant in event
router.post('/participant', async function(request, response) {
    //Validate

    response.send(await serviceEvent.insertParticipant(request.body.eventId, request.body.userId));
});

//Update event
router.put('/', async function(request, response) {
    let event = request.body;

    let id = event._id;

    delete event._id;

    //Validate

    response.send(await serviceEvent.update(id, event));
});

//Delete participant in event
router.delete('/:eventId/participant/:userId', async function(request, response) {
    //Validate

    response.send(await serviceEvent.removeParticipant(request.params.eventId, request.params.userId));
});

//Delete event
router.delete('/:id', async function(request, response) {
    //Validate

    console.log(request.params.id)

    response.send(await serviceEvent.remove(request.params.id));
});

module.exports = router;
