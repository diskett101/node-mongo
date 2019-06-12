const mongodb = require('mongodb');

module.exports = {
    insert: function (client, dbName, collectionName, records) {
        return new Promise(function (resolve, reject) {
            let db = client.db(dbName);
            let collection = db.collection(collectionName);
            collection.insertOne(records, function(err, result){
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        });
    },
    get: function (client, dbName, collectionName, id = '') {
        let idClause = (id.trim() !== '') ? {"_id": mongodb.ObjectID(id.trim())} : {};
        return new Promise(function (resolve, reject) {
            let db = client.db(dbName);
            let collection = db.collection(collectionName);
            collection.find(idClause).toArray(function (err, results) {
                if (err) {
                    reject(err);
                }
                resolve(results);
            })
        });
    }
}
