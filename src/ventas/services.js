const { ObjectId } = require('mongodb');

const { Database } = require('../db/index');

const COLLECTION = 'sales';

const getAll = async() => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const getById = async(id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) });
};

const create = async(user) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(user);
    return result.insertedId;
};



const updateS = async(id, newValue) => {
    const collection = await Database(COLLECTION);
    const filter = { _id: ObjectId(id) };
    const options = { upsert: false };
    const updateSale = {
        $set: {
            ...newValue
        }
    };
    const result = await collection.updateOne(filter, updateSale, options);
    return await getById(id);
}

const deleteS = async(id) => {
    const collection = await Database(COLLECTION);
    const query = { _id: ObjectId(id) };
    const sale = await getById(id);
    const result = await collection.deleteOne(query);
    if (result.deleteCount === 1) {
        return sale;
    } else {
        return 0;
    }

}


module.exports.SalesService = {
    getAll,
    getById,
    create,
    updateS,
    deleteS

};