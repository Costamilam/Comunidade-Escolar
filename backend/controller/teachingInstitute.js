const service = require('../service/teachingInstitute.js');

const router = require('express').Router();

//Return all teachingInstitute
router.get('/', async function(request, response) {
    //Validate

    let result = await service.getAll();

    response.send(result);
});

//Return all teachingInstitute
router.get('/:page', async function(request, response) {
    //Validate

    let result = await service.find(request.params.page > 0 ? ( ( request.params.page - 1 ) * 25 ) : 0);

    let count = await service.count();

    response.send({
        result: result,
        count: count
    });
});

//Search teachingInstitute by propriety name
router.get('/name/:name', async function(request, response) {
    //Validate

    let result = await service.findByName(new RegExp(`.*${request.params.name.replace(' ', '.*')}.*`, 'i'));

    response.send({result: result});
});

module.exports = router;
