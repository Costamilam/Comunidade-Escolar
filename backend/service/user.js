const mongodb = require('./mongodb.js');

const collection = 'user';

//Insert document of collection user
module.exports.insert = async function(user) {
    const connection = await mongodb.connection(collection);

    let insert = await connection.insertOne(user);

    console.log(insert.ops);
    
    return insert.ops;
}

//Find document of collection user by propriety name
module.exports.findByNameAndTeachingInstitute = async function(nameAndTeachingInstitute) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find(nameAndTeachingInstitute);

    return await select.toArray();
}

//Find document of collection user by propriety username
module.exports.findByUsername = async function(username) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find({username: username});

    return await select.toArray();
}

//Find document of collection user by propriety _id
module.exports.findById = async function(objectId) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find({_id: mongodb.mongoObjectId(objectId)});

    return await select.toArray();
}

//Update document of collection user
module.exports.update = async function(objectId, user) {
    const connection = await mongodb.connection(collection);

    let update = await connection.updateOne({
        _id: mongodb.mongoObjectId(objectId)
    }, { 
        $set: user 
    });

    return update.result;
}

//Remove document of collection user
module.exports.remove = async function(objectId) {
    const connection = await mongodb.connection(collection);
    
    let remove = await connection.remove({
        _id: mongodb.mongoObjectId(objectId)
    }, true);

    return remove.result;
}
