import {MongoClient, ObjectID} from 'mongodb';

const mongoUri = process.env.MONGO_URI ||'mongodb://tyler:blahblah4@ds060009.mlab.com:60009/event-sign-in';

const connect = async () => await MongoClient.connect(mongoUri);
export default connect;
export const collection = async (collection) => {
    const db = await connect();
    return db.collection(collection);
};
