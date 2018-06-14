const service = require('../service/user.js');

const code = require('../code.js');

const router = require('express').Router();

//Search user by proprietys name and/or teaching institute
router.get('/name/(:name)?/teachingInstitute/(:teachingInstituteId)?', async function(request, response) {
    let user = {};

    if (request.params.name !== undefined) {
        user.name = new RegExp(`.*${request.params.name.replace(' ', '.*')}.*`, 'i');
    }
    if (request.params.teachingInstituteId !== undefined) {
        user.teachingInstitute = request.params.teachingInstituteId;
    }

    console.log(user)

    //Validate

    let result = await service.findByNameAndTeachingInstitute(user);

    response.send(result);
});

//Search user by propriety username
router.get('/username/:username', async function(request, response) {
    //Validate

    let result = await service.findByUsername(request.params.username);

    response.send(!result.length);
});

//Insert user
router.post('/', async function(request, response) {
    let user = request.body;

    //Validate
    
    user.password = await code.hashPassword(user.password);

    let result = await service.insert(user);

    response.send(result);
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
        user.password = await code.hashPassword(user.password);
    }

    let result = await service.update(id, user);

    response.send(await service.findById(id));
});

//Delete user
router.delete('/:id', async function(request, response) {
    //Validate
    
    response.send(await service.remove(request.params.id));
});

module.exports = router;
