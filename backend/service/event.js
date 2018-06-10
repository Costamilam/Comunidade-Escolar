const mongodb = require('./mongodb.js');

const collection = 'event';

//Insert one document in collection
module.exports.insert = async function(event) {
    const connection = await mongodb.connection(collection);

    event.user = mongodb.mongoObjectId(event.user);
    event.teachingInstitute = mongodb.mongoObjectId(event.teachingInstitute);

    let insert = await connection.insertOne(event);

    return insert.ops;
}

//Insert one participant in document
module.exports.insertParticipant = async function(eventId, userId) {
    const connection = await mongodb.connection(collection);

    let insert = await connection.updateOne({
        _id: mongodb.mongoObjectId(eventId)
    }, { 
        $push: {
            participant: mongodb.mongoObjectId(userId)
        } 
    });

    return insert.result;
}

//Find document of collection
module.exports.find = async function(event) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.aggregate([
        {
          $lookup:
            {
                from: "teachingInstitute",
                localField: "teachingInstitute",
                foreignField: "_id",
                as: "teachingInstitute"
            }
        }, {
          $lookup:
            {
                from: "user",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        }, {
            $match: event 
        }
    ]);

    return select.toArray();
}

//Find document of collection
module.exports.findById = async function(eventId) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.aggregate([
        {
            $lookup: {
                from: "teachingInstitute",
                localField: "teachingInstitute",
                foreignField: "_id",
                as: "teachingInstitute"
            }
        }, {
            $lookup: {
                from: "user",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        }, {
            $lookup: {
                from: "user",
                localField: "participant",
                foreignField: "_id",
                as: "participant"
            }
        }, {
            $match: {
                _id: mongodb.mongoObjectId(eventId)
            }
        }
    ]);

    return select.toArray();
}

//Find document of collection
module.exports.findByUser = async function(userId) {
    const connection = await mongodb.connection(collection);
    
    let select = await connection.aggregate([
        {
            $lookup: {
                from: "teachingInstitute",
                localField: "teachingInstitute",
                foreignField: "_id",
                as: "teachingInstitute"
            }
        }, {
            $match: {
                user: mongodb.mongoObjectId(userId)
            }
        }
    ]);
    
    return select.toArray();
}

//Update document of collection
module.exports.update = async function(eventId, event) {
    const connection = await mongodb.connection(collection);

    event.teachingInstitute = mongodb.mongoObjectId(event.teachingInstitute[0]._id);
    event.user = mongodb.mongoObjectId(event.user[0]._id);

    let update = await connection.updateOne({
        _id: mongodb.mongoObjectId(eventId)
    }, { 
        $set: event 
    });

    return update.result;
}

//Insert one participant in document
module.exports.removeParticipant = async function(eventId, userId) {
    const connection = await mongodb.connection(collection);

    let remove = await connection.update({
        _id: mongodb.mongoObjectId(eventId)
    }, { 
        $pull: {
            participant: mongodb.mongoObjectId(userId)
        } 
    });

    return remove.result;
}

//Remove one document of collection
module.exports.remove = async function(objectId) {
    const connection = await mongodb.connection(collection);

    let remove = await connection.remove({
        _id: mongodb.mongoObjectId(objectId)
    }, true);

    return remove.result;
}
