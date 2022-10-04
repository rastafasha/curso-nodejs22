const { ObjectId } = require('mongodb');

const { Database } = require('../db/index');

const COLLECTION = 'users';

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



const updateU = async(id, newValue) => {
    const collection = await Database(COLLECTION);
    const filter = { _id: ObjectId(id) };
    const options = { upsert: false };
    const updateUser = {
        $set: {
            ...newValue
        }
    };
    const result = await collection.updateOne(filter, updateUser, options);
    return await getById(id);
}

const deleteU = async(id) => {
    const collection = await Database(COLLECTION);
    const query = { _id: ObjectId(id) };
    const user = await getById(id);
    const result = await collection.deleteOne(query);
    if (result.deleteCount === 1) {
        return user;
    } else {
        return 0;
    }

}


module.exports.UsersService = {
    getAll,
    getById,
    create,
    updateU,
    deleteU

};