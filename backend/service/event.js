const mongodb = require('./mongodb.js');

const collection = 'event';

//Insert one document in collection
module.exports.insert = async function(object) {
    const connection = await mongodb.connection(collection);

    let insert = await connection.insertOne(object);

    return insert.ops;
}

//Find document of collection
module.exports.find = async function(event) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find(event);

    return select.toArray();
}

//Find document of collection
module.exports.findById = async function(objectId) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find({
        _id: mongodb.mongoObjectId(objectId)
    });

    return select.toArray();
}

//Find document of collection
module.exports.findByUser = async function(stringId) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find({
        user: stringId
    });

    return select.toArray();
}

//Update document of collection
module.exports.update = async function(objectId, event) {
    const connection = await mongodb.connection(collection);

    let update = await connection.updateOne({
        _id: mongodb.mongoObjectId(objectId)
    }, { 
        $set: event 
    });

    return update.result;
}

//Remove one document of collection
module.exports.remove = async function(objectId) {
    const connection = await mongodb.connection(collection);

    let remove = await connection.remove({
        _id: mongodb.mongoObjectId(objectId)
    }, true);

    return remove.result;
}
