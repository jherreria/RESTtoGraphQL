import mongoose from "mongoose";

var CONFI = require('../../config.json');

const uri = CONFI.mongoDB_URI;
const databaseName="test";
const collectionName="contacts";


const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


//===========================
// Mongo connection

mongoose.Promise = global.Promise;
mongoose.connect(uri,clientOptions).then(
  () => { 
    console.log('MongoDB is connected');
    // List databases and collections
    // mongoose.connection.listDatabases().then(
    //   data => { console.log("Databases:\n",data); }
    // );
    // mongoose.connection.listCollections().then(
    //   data => { console.log("\nCollections:\n",data); }
    // );
   },
  err => { console.log(err) }
);

//
// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     console.log("Disconnecting from MongoDB...");
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String
    
  },
  lastName: {
      type: String
      
  },
  email: {
      type: String
  },
  company: {
      type: String
  }
});

const Contacts = mongoose.model(collectionName, contactSchema);

export  { Contacts };

// dbConnectors.js