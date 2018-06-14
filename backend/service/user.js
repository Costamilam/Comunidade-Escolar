const mongodb = require('./mongodb.js');

const collection = 'user';

//Insert document of collection user
module.exports.insert = async function(user) {
    const connection = await mongodb.connection(collection);

    user.teachingInstitute = mongodb.mongoObjectId(user.teachingInstitute);

    let insert = await connection.insertOne(user);

    return insert.ops;
}

//Find document of collection user by propriety name
module.exports.findByNameAndTeachingInstitute = async function(nameAndTeachingInstitute) {
    let connection = await mongodb.connection(collection);
    
    if(nameAndTeachingInstitute.teachingInstitute !== undefined) {
        nameAndTeachingInstitute.teachingInstitute = mongodb.mongoObjectId(nameAndTeachingInstitute.teachingInstitute);
    }

    console.log(nameAndTeachingInstitute)
    console.log(typeof nameAndTeachingInstitute.teachingInstitute)

    let select = await connection.aggregate([
        {
            $lookup: {
                from: "teachingInstitute",
                localField: "teachingInstitute",
                foreignField: "_id",
                as: "teachingInstitute"
            }
        }, {
            $match: nameAndTeachingInstitute 
        }
    ]);

    console.log(await select.toArray())

    return await select.toArray();
}

//Find document of collection user by propriety username
module.exports.findByUsername = async function(username) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find({username: username});

    return await select.toArray();
}

//Find document of collection user by propriety _id
module.exports.findById = async function(userId) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.find({_id: mongodb.mongoObjectId(userId)});

    return await select.toArray();
}

//Update document of collection user
module.exports.update = async function(userId, user) {
    const connection = await mongodb.connection(collection);

    user.teachingInstitute = mongodb.mongoObjectId(user.teachingInstitute);

    let update = await connection.updateOne({
        _id: mongodb.mongoObjectId(userId)
    }, { 
        $set: user 
    });

    return update.result;
}

//Remove one document of collection user
module.exports.remove = async function(objectId) {
    const connection = await mongodb.connection(collection);

    let remove = await connection.remove({
        _id: mongodb.mongoObjectId(objectId)
    }, true);

    return remove.result;
}
