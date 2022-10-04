const { ObjectId } = require('mongodb');

const { Database } = require('../db/index');

const { ProductsUtils } = require('./utils');

const COLLECTION = 'products';

const getAll = async() => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const getById = async(id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) });
};

const create = async(product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
};


const generateReport = async(name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res);
}

const updateP = async(id, newValue) => {
    const collection = await Database(COLLECTION);
    const filter = { _id: ObjectId(id) };
    const options = { upsert: false };
    const updateProduct = {
        $set: {
            ...newValue
        }
    };
    const result = await collection.updateOne(filter, updateProduct, options);
    return await getById(id);
}

const deleteP = async(id) => {
    const collection = await Database(COLLECTION);
    const query = { _id: ObjectId(id) };
    const product = await getById(id);
    const result = await collection.deleteOne(query);
    if (result.deleteCount === 1) {
        return product;
    } else {
        return 0;
    }

}


module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport,
    updateP,
    deleteP

};