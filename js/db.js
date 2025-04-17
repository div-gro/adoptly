const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://username:password@adpotly.ur1ugjn.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB URI

const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("✅ Connected successfully to MongoDB");
        return client.db("adoptly");
    } catch (error) {
        console.error("❌ Could not connect to MongoDB", error);
        process.exit(1);
    }
}

module.exports = { connectToDatabase };