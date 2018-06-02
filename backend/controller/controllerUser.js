const serviceUser = require('../service/serviceUser.js');

let router = require('express').Router();

//Search user
router.get('/:userName', async function(request, response) {
    //Validate

    response.send(await serviceUser.find({ userName: request.params.userName }));
});

//Insert user
router.post('/', async function(request, response) {
    //Validate
    
    let object = request.body;

    object.userPassword = await bcrypt.hashPassword(object.userPassword);

    let result = await service.insert(object, request.params.collection);

    response.send({title: `${result.length} dado(s) cadastrado(s)`, message: '', result: result});
});

//Update user
router.put('/', async function(request, response) {
    let objectSearch = {
        username: request.body.userUsername, 
        password: request.body.userPassword
    }
    let objectUpdate = {
        name: request.body.userName, 
        password: request.body.userPassword, 
        email: request.body.userEmail, 
        facebook: request.body.userFacebook,
        snapchat: request.body.userSnapchat,
        twitter: request.body.userTwitter, 
        instagram: request.body.userInstagram, 
        whatsapp: request.body.userWhatsapp, 
        phone: request.body.userPhone
    }
    //Validar entradas

    response.send(await serviceUser.update(objectSearch, objectUpdate));
});

//Delete user
router.delete('/', async function(request, response) {
    let object = {
        username: request.body.userUsername, 
        password: request.body.userPassword
    }
    //Validar entradas

    response.send(await serviceUser.remove(object));
});

module.exports = router;
