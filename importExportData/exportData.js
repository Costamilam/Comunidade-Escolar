const mongodb = require('mongodb');
const fileSystem = require('fs');

async function exportData(collectionName, file) {
    try {
        var connection = await mongodb.MongoClient.connect('mongodb://localhost:27017');
    
        let collection = await connection.db('dataPOA').collection(collectionName);

        let result = await collection.find({});

        let data = '[';

        for(let element of await result.toArray()) {
            data += `${JSON.stringify(element)},\n`;
        }

        //Remove last occurrence of ',\n'
        data = `${data.replace(/,\n(?!,\n)+$/, '')}]`;

        fileSystem.unlink(file, (error) => {
            if(error && error.errno != -2){
                console.log(error);
            } else {
                fileSystem.writeFile(file, data, function(err) {
                    if(err) {
                        console.log(err);
                    }
                }); 
            }
        });
    } catch (error) {
        console.log(error);
    } finally {
        if(connection) {
            connection.close();
        }
    }
}

exportData('teachingInstitute', 'dataTeachingInstitute.json');
exportData('user', 'dataUser.json');
exportData('event', 'dataEvent.json');
