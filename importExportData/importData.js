const fileSystem = require('fs');

async function importData(file, collection) {
    fileSystem.readFile(file, async (error, data) => {
        if(error) {
            console.log(`Read file error\n    ${error}`);
        } else {
            try {
                var jsonImportWithFile = JSON.parse(data.toString());
            } catch (exceptionError) {
                console.log(`File invalid\n    ${exceptionError}`);
            }

            try {
                const mongodb = require('mongodb');
                const urlAccess = 'mongodb://localhost:27017';
                const databaseName = 'dataPOA';

                var connection = await mongodb.MongoClient.connect(urlAccess);

                const database = connection.db(databaseName);

                //Convert string to MongoDB ObjectId
                let keyObjectId = ['_id', 'teachingInstitute', 'user'];

                jsonImportWithFile.forEach(element => {
                    for(let key of Object.keys(element)) {
                        if(keyObjectId.indexOf(key) !== -1) {
                            element[key] = mongodb.ObjectId(element[key]);
                        } else if(key === 'participant') {
                            let array = [];

                            element[key].forEach(item => {
                                array.push(mongodb.ObjectId(item));
                            });

                            element[key] = array;
                        }                  
                    }
                });

                await database.collection(collection).insertMany(jsonImportWithFile);  
            } catch(exceptionError) {
                console.log(`Insert data error:\n    ${exceptionError}`);
            } finally {
                if(connection) {
                    connection.close();
                }
            }
        }
    });
}

importData('dataTeachingInstitute.json', 'teachingInstitute');
importData('dataUser.json', 'user');
importData('dataEvent.json', 'event');
