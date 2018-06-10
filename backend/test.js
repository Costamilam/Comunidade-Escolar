const mongodb = require('mongodb');

!async function(collection) {
    try {
        //Connect MongoDB
        let database = await mongodb.MongoClient.connect('mongodb://localhost:27017');
    
        //Select and return database connection
        conn = await database.db('dataPOA').collection(collection);

        let res = await conn.aggregate([
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
                $match: {name: /Anie.*/} 
            }
        ])

        let r = await res.toArray()

        console.log(r)

    } catch (error) {
        console.log(error);
        return error;
    }
}('event')