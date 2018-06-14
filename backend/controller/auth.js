const service = require('../service/user.js');
const code = require('../code.js');

let router = require('express').Router();

router.use(async function (request, res, next) {
    if(((request.url === '/auth' || request.url === '/user') && request.method === 'POST') || (request.url === '/teachingInstitute' && request.method === 'GET') || request.url === '/') {
        next();
    } else if(request.headers.authorization === undefined) {
        res.status(400).send('Autenticação necessária para acessar o recurso');
    } else if(!await code.decodeToken(request.headers.authorization)) {
        res.status(401).send('Acesso inválido ou expirado');
    } else {
        next();
    }
});

//Auth user
router.post('/auth', async function(request, response) {
    let auth = request.body;

    //Validate

    let result = await service.findByUsername(auth.username);

    if(result.length == 1 && await code.checkPassword(result[0].password, auth.password)) {
        result[0].token = await code.generateToken();

        response.send(result[0]);
    } else {
        response.status(401).send('Usuário ou senha inválidos');
    }
});

module.exports = router;
