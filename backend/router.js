const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const controllerUser = require('./controller/controllerUser');
const controllerAuth = require('./controller/controller.js');
const controllerMeeting = require('./controller/controllerMeeting');

app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use('/user', controllerUser);
app.use('/auth', controllerAuth);
app.use('/meeting', controllerMeeting);

app.use('/', express.static('../frontend'));

app.listen(3000, () => console.log('Started successfully'));
