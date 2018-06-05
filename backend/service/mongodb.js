const mongodb = require('mongodb');

module.exports.connection = async function(collection) {
    try {
        //Connect MongoDB
        let database = await mongodb.MongoClient.connect('mongodb://localhost:27017');
    
        //Select and return database connection
        return database.db('dataPOA').collection(collection);
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports.mongoObjectId = mongodb.ObjectId;
