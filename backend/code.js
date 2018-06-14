const bcrypt = require('bcrypt');
const saltRoundsHashPassword = 13;
const saltRoundsGenerateToken = 1;

module.exports.hashPassword = async function(userPlainPassword) {
    return await bcrypt.hash(userPlainPassword, saltRoundsHashPassword);
}

module.exports.checkPassword = async function(userHashPassword, userPlainPassword) {
    return await bcrypt.compare(userPlainPassword, userHashPassword);
}

const jwt = require('jsonwebtoken');
const secretKey = 'dhsiadsaihdusa';
const expiresTime = '15m';

module.exports.generateToken = async function(username) {
    return jwt.sign({ username: username }, secretKey, { expiresIn: expiresTime });
}

module.exports.decodeToken = async function(token) {
    token = token.split(' ')[1];

    return jwt.verify(token, secretKey, function(error, decoded) {
        if(error) {
            return false;
        } else {
            return decoded;
        }
    })
};
