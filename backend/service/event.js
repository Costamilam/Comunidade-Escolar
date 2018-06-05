const mongodbConnection = require('./mongodbConnection.js');

const collection = 'Meeting';

//Insert document of collection
module.exports.insert = async function(object) {
    const connection = await mongodbConnection.connection();

    let insert = await connection.collection(collection).insertOne(object);

    console.log(`Inserted ${insert.insertedCount} document into the collection. Document id: ${insert.insertedId}`);
    
    return insert;
}

//Find document of collection
module.exports.find = async function(object) {
    const connection = await mongodbConnection.connection();
    
    let select = await connection.collection(collection).find(object);

    console.log(`Find ${await select.count()} documents into the collection. Document values:`);
    select.forEach(function(element) {
        console.log(`${element}`);
    });

    return select;
}

//Update document of collection
module.exports.update = async function(objectSearch, objectUpdate) {
    const connection = await mongodbConnection.connection();
    
    let update = await connection.collection(collection).updateOne(objectSearch, { $set: objectUpdate });

    console.log(`The id document ${update.upsertedId} has been changed:\n${update.result}`);

    return update;
}

//Remove document of collection
module.exports.remove = async function(object) {
    const connection = await mongodbConnection.connection();
    
    let remove = await connection.collection(collection).remove(object, true);

    console.log(`The document removed\n${remove.toString()}`);

    return remove;
}
