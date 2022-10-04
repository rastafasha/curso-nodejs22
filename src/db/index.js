const { MongoClient } = require('mongodb');
const debug = require('debug')('app:module-db');

const { Config } = require('../config/index');

var connection = null;

module.exports.Database = (collection) => new Promise(async(resolve, reject) => {
    try {
        if (!connection) {
            const client = new MongoClient(Config.mongoUri);
            connection = await client.connect();
            debug('Nueva conexión realizada con MongDB Atlas');
        }
        debug('Reutilizando conexión');
        const db = connection.db(Config.mongoDbName);
        resolve(db.collection(collection));

    } catch (error) {
        reject(error);
    }
});