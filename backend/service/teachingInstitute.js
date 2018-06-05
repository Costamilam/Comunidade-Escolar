const mongodb = require('./mongodb.js');

const collection = 'teachingInstitute';

//Find all documents of collection teachingInstitute
module.exports.find = async function() {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find({});

    return await select.toArray();
}

//Find document of collection teachingInstitute by propriety name
module.exports.findByName = async function(name) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find({teachingInstituteName: name});

    return await select.toArray();
}