const mongodb = require('./mongodb.js');

const collection = 'teachingInstitute';

//Find all documents of collection teachingInstitute
module.exports.getAll = async function() {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find({});

    return await select.toArray();
}

//Find all documents of collection teachingInstitute
module.exports.find = async function(skip) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find({}).limit(25).skip(skip);

    return await select.toArray();
}

//Find document of collection teachingInstitute by propriety name
module.exports.findByName = async function(name) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find({name: name});

    return await select.toArray();
}

//Count documents of collection teachingInstitute
module.exports.count = async function() {
    const connection = await mongodb.connection(collection);
    
    let count = await connection.count();

    return count;
}
