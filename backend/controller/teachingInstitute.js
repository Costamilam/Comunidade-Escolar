const service = require('../service/teachingInstitute.js');

const router = require('express').Router();

//Return all teachingInstitute
router.get('/', async function(request, response) {
    //Validate

    let result = await service.find();

    response.send(result);
});

//Search teachingInstitute by propriety name
router.get('/name/:name', async function(request, response) {
    //Validate

    let result = await service.findByName(new RegExp(`.*${request.params.name.replace(' ', '.*')}.*`, 'i'));

    response.send(result);
});

module.exports = router;
