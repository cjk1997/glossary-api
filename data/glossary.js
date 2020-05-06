const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = process.env.DB_URL;

dbName = 'glossary';
colName = 'entries';

const settings = { useUnifiedTopology : true };

const getTerms = () => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to GET terms.");
                db = client.db(dbName);
                collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const getTermByID = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to GET term by ID.")
                db = client.db(dbName);
                collection = db.collection(colName);
                collection.find({ _id : ObjectID(id) }).toArray(function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const getTermByValue = (key, value) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to GET term by value.")
                db = client.db(dbName);
                collection = db.collection(colName);
                collection.find({ [key] : value }).toArray(function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const addTerm = () => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to ADD term.");
                db = client.db(dbName);
                collection = db.collection(colName);
                collection.insertOne(card, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.ops[0]);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const updateTerm = (id, term) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to PUT term.");
                db = client.db(dbName);
                collection = db.collection(colName);
                collection.replaceOne({ _id : ObjectID(id) }, 
                term,
                { upsert : true },
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const deleteTerm = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to DELETE term.")
                db = client.db(dbName);
                collection = db.collection(colName);
                collection.delete({ _id : ObjectID(id) }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ deletedID : id });
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

module.exports = {
    getTerms,
    getTermByID,
    getTermByValue,
    addTerm,
    updateTerm,
    deleteTerm
};