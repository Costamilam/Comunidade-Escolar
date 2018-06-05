const service = require('../service/teachingInstitute.js');

const router = require('express').Router();

//Search teachingInstitute
router.get('/', async function(request, response) {
    //Validate

    let result = await service.find();

    response.send({
        head: result[0] ? Object.keys(result[0]) : [],
        result: result
    });
});

//Search teachingInstitute
router.get('/name/:name', async function(request, response) {
    //Validate

    let result = await service.findByName(new RegExp(`.*${request.params.name.replace(' ', '.*')}.*`, 'i'));

    response.send({
        head: result[0] ? Object.keys(result[0]) : [],
        result: result
    });
});

module.exports = router;
