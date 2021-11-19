const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'theCatCraze';

MongoClient.connect(url, { useUnifiedTopology: true}).then(client => {

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('items')
    .then(result => {
        console.log('Dropped Collection:', result);
    })
    .catch(err => console.log('No collection to drop.'));

    dboper.insertDocument(db, {name: "Cat Kiss Mug", description: "Test"}, 'items')
    .then(result => {
        console.log('Insert Document:', result.ops);

        return dboper.findDocuments(db, 'items');
    })
    .then(docs => {
        console.log('Found Documents:', docs);

        return dboper.updateDocument(db, { name: "Cat Kiss Mug" },
            { description: "Updated Test Description" }, 'items');
    })
    .then(result => {
        console.log('Updated Document Count:', result.result.nModified);

        return dboper.findDocuments(db, 'items');
    })
    .then(docs => {
        console.log('Found Documents:', docs);

        return dboper.removeDocument(db, { name: "Cat Kiss Mug" },
            'items');
    })
    .then(result => {
        console.log('Deleted Document Count:', result.deletedCount);

        return client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
})
.catch(err => console.log(err));