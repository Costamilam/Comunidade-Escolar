const service = require('../service.js');
const bcrypt = require('../bcrypt.js');

let router = require('express').Router();

//Verify auth user
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


module.exports = router;
