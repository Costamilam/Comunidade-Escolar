const service = require('../service/user.js');
const bcrypt = require('../bcrypt.js');

let router = require('express').Router();

//Verify auth user
/*router.all(/(\/user\/|\/meeting\/)/, async function(request, response, next) {
    let result = await service.find({userLastToken: request.headers.authorization}, 'user');
    
    if(result.length === 1 && result[0].userLastAuth > Date.now()) {
        await service.update(result[0]._id, {
            userLastAuth: Date.now() + 1000 * 60 * 15
        }, 'user');

        next();
    } else {
        response.status(203).send({title: 'Acesso negado', message: 'Token de acesso inválido ou expirado, conecte-se novamente'});
    }
});*/

//Auth user
router.post('/', async function(request, response) {
    let auth = request.body;

    //Validate
    
    let result = await service.findByUsername(auth.username);

    if(result.length == 1 && await bcrypt.checkPassword(result[0].password, auth.password)) {
        result[0].lastToken = await bcrypt.generateToken();
        result[0].lastAuth = Date.now() + 1000 * 60 * 15;

        await service.update(result[0]._id, {
            lastToken: result[0].lastToken,
            lastAuth: result[0].lastAuth
        });

        response.send(result[0]);
    } else {
        response.status(400).send();
    }
});

module.exports = router;
