import {MongoClient, ObjectID} from 'mongodb';
const dotEnv = require('dotenv');
dotEnv.load();
const mongoUri = process.env.MONGO_URI || process.env.dotEnv;

const connect = async () => await MongoClient.connect(mongoUri);
export default connect;
export const collection = async (collection) => {
    const db = await connect();
    return db.collection(collection);
};
