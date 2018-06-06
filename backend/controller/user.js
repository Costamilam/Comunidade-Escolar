const service = require('../service/user.js');

const bcrypt = require('../bcrypt.js');

const router = require('express').Router();

//Search user
router.get('/name/(:name)?/teachingInstitute/(:teachingInstituteId)?', async function(request, response) {
    let user = {
        name: new RegExp(`.*${request.params.name.replace(' ', '.*')}.*`, 'i'),
        teachingInstitute: request.params.teachingInstituteId
    };

    //Validate

    if (request.params.teachingInstituteId === undefined) {
        delete user.teachingInstitute;
    }

    let result = await service.findByNameAndTeachingInstitute(user);

    response.send(result);
});

//Search userUsername
router.get('/username/:username', async function(request, response) {
    //Validate

    let result = await service.findByUsername(request.params.username);

    response.send(!result.length);
});

//Insert user
router.post('/', async function(request, response) {
    let user = request.body;

    //Validate
    
    user.password = await bcrypt.hashPassword(user.password);

    let result = await service.insert(user);

    response.send({
        result: result
    });
});

//Update user
router.put('/', async function(request, response) {
    let user = request.body;
    let id = user._id;
    delete user._id;

    //Validate

    if (user.password === undefined) {
        delete user.password;
    } else {
        user.password = await bcrypt.hashPassword(user.password);
    }

    let result = await service.update(id, user);

    response.send({
        result: await service.findById(id)
    });
});

//Delete user
router.delete('/:id', async function(request, response) {
    //Validate
    
    response.send(await service.remove(request.params.id));
});

module.exports = router;
