const service = require('./service.js');
const bcrypt = require('./bcrypt.js');

let router = require('express').Router();

router.all(/(\/user\/|\/meeting\/)/, async function(request, response, next) {
    let result = await service.find({userLastToken: request.headers.authorization}, 'user');
    
    if(result.length === 1 && result[0].userLastAuth > Date.now()) {
        await service.update(result[0]._id, {
            userLastAuth: Date.now() + 1000 * 60 * 15
        }, 'user');

        next();
    } else {
        response.status(203).send({title: 'Acesso negado', message: 'Token de acesso inválido ou expirado, conecte-se novamente'});
    }
});

//Auth user
router.post('/auth/', async function(request, response) {
    let auth = {
        userUsername: request.body.userUsername, 
        userPassword: request.body.userPassword
    }
    //Validate
    
    let result = await service.find({userUsername: auth.userUsername}, 'user');

    console.log('\n\n')
    console.log(result)
    console.log('\n\n')

    if(result.length === 1 && await bcrypt.checkPassword(result[0].userPassword, auth.userPassword)) {
        result[0].token = await bcrypt.generateToken();

        await service.update(result[0]._id, {
            userLastToken: result[0].token,
            userLastAuth: Date.now() + 1000 * 60 * 15
        }, 'user');

        response.send({title: `Bem vindo ${result[0].userName}`, message: `Autenticação concluída com sucesso. Seu token de acesso: ${result[0].token}`, result: result});
    } else {
        response.status(203).send({title: 'Usuário ou senha inválido', message: 'Qualquer dúvida entre em contato com o suporte'});
    }
});

//Search collection
router.get('/:collection/(:column/:search/)?', async function(request, response) {
    //Validate

    let object = {};
    if(request.params.column && request.params.search) {
        object[request.params.column] = new RegExp(request.params.search.replace(' ', '.*'), 'i');
    }

    let result = await service.find(object, request.params.collection);

    response.send({title: `${result.length} resultado(s) encontrado(s)`, message: '', head: Object.keys(result[0]), result: result});
});

//Insert collection
router.post('/:collection/', async function(request, response) {
    //Validate

    if(request.params.collection === 'user') {
        request.body.userPassword = await bcrypt.hashPassword(request.body.userPassword);
    }

    let result = await service.insert(request.body, request.params.collection);

    response.send({title: `${result.length} dado(s) cadastrado(s)`, message: '', result: result});
});

//Update collection
router.put('/:collection/', async function(request, response) {
    //Validate

    let result = await service.update(request.body.search.id, request.body.update, request.params.collection);

    response.send({title: `${result.length} dado(s) atualizado(s)`, message: '', result: result});
});

//Delete collection
router.delete('/:collection/', async function(request, response) {
    //Validate

    let result = await service.remove(request.body, request.params.collection);

    response.send({title: `${result.length} dado(s) excluido(s)`, message: '', result: result});
});

module.exports = router;
