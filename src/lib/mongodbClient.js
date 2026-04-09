// lib/mongodbClient.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    // use a global variable in dev so we don’t open too many connections on HMR reloads
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // in prod, just connect once
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;
