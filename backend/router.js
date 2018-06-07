const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const controllerTeachingInstitute = require('./controller/teachingInstitute.js');
const controllerUser = require('./controller/user.js');
const controllerAuth = require('./controller/auth.js');
const controllerEvent = require('./controller/event.js');

app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use('/teachingInstitute', controllerTeachingInstitute);
app.use('/user', controllerUser);
app.use('/auth', controllerAuth);
app.use('/event', controllerEvent);

app.use('/', express.static('../frontend'));

app.listen(3000, () => console.log('Started successfully'));