const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'theCatCraze';

MongoClient.connect(url, { useUnifiedTopology: true}).then(client => {

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('items', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection:', result);

        dboper.insertDocument(db, { name: "Cat Kiss Mug", description: "Test"},
            'items', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'items', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Cat Kiss Mug" },
                    { description: "Updated test description" }, 'items',
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'items', docs => {
                            console.log('Found Documents:', docs);
                            
                            dboper.removeDocument(db, { name: "Cat Kiss Mug" },
                                'items', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);

                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});