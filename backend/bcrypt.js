const bcrypt = require('bcrypt');
const saltRoundsHashPassword = 13;
const saltRoundsGenerateToken = 1;

module.exports.hashPassword = async function(userPlainPassword) {
    return await bcrypt.hash(userPlainPassword, saltRoundsHashPassword);
}

module.exports.checkPassword = async function(userHashPassword, userPlainPassword) {
    return await bcrypt.compare(userPlainPassword, userHashPassword);
}

module.exports.generateToken = async function() {
    return await bcrypt.genSalt(saltRoundsGenerateToken);
}