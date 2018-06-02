const mongodb = require('mongodb');

let connection;

//Connect MongoDB
async function MongodbConnect(collectionName) {
    try {
        connection = await mongodb.MongoClient.connect('mongodb://localhost:27017');

        return connection.db('dataPOA').collection(collectionName);
    } catch (error) {
        console.log(error);
    }
}

//Insert document of collection
module.exports.insert = async function(object, collectionName) {
    try {
        let collection = await MongodbConnect(collectionName);

        let insert = await collection.insertOne(object);

        console.log(insert.ops);

        return insert.ops;
    } catch (error) {
        console.log(error);
    } finally {
        if(connection) {
            await connection.close();
        }
    }
}

//Find document of collection
module.exports.find = async function(object, collectionName) {
    try {
        let collection = await MongodbConnect(collectionName);

        let select = await collection.find(object).toArray();

        console.log(select);
        
        return select;
    } catch (error) {
        console.log(error);
    } finally {
        if(connection) {
            await connection.close();
        }
    }
}

//Update document of collection
module.exports.update = async function(objectId, objectUpdate, collectionName) {
    try {
        let collection = await MongodbConnect(collectionName);

        let update = await collection.updateOne({"_id": mongodb.ObjectId(objectId)}, { $set: objectUpdate });

        console.log(update.result);

        return update.ops;
    } catch (error) {
        console.log(error);
    } finally {
        if(connection) {
            await connection.close();
        }
    }
}

//Remove document of collection
module.exports.remove = async function(object, collectionName) {
    try {
        let collection = await MongodbConnect(collectionName);

        let remove = await collection.remove(object, false);

        console.log(remove.ops);

        return remove.ops;
    } catch (error) {
        console.log(error);
    } finally {
        if(connection) {
            await connection.close();
        }
    }
}
