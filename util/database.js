const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://patrick:6BcyuIob7wGWGPXh@cluster0.6oqmc.mongodb.net/shop?retryWrites=true&w=majority";

const mongoConnect = (callback) => {
    MongoClient.connect(MONGODB_URL)
    .then((client) => {
        console.log('connected!');
        _db = client.db();
        callback();
    })
    .catch((err) => {
        console.log('err', err);
        throw err;
    })
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;