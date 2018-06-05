const fileSystem = require('fs');

let jsonImportWithFile;

fileSystem.readFile('dataFromDataPOA.json', (error, data) => {
    if(error) {
        console.log(`Read file error\n    ${error}`);
    } else {
        try {
            jsonImportWithFile = JSON.parse(data);
        } catch (exceptionError) {
            console.log(`File invalid\n    ${exceptionError}`);
        }

        const mongoClient = require('mongodb').MongoClient;
        const urlAccess = 'mongodb://localhost:27017';
        const databaseName = 'dataPOA';
        
        (async function() {
            let connection;
            try {
                connection = await mongoClient.connect(urlAccess);

                const database = connection.db(databaseName);
        
                for(let object of jsonImportWithFile) {
                    await database.collection('teachingInstitute').insertOne(object);
                }
            } catch(exceptionError) {
                console.log(exceptionError);
            } finally {
                if(connection) {
                    await connection.close();
                }
            }
        })();        
    }
});
