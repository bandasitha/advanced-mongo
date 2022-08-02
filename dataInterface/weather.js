const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri =
"mongodb+srv://amber:Xuss6BVZiMdto0Aa@js330-test-cluster.l09khft.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const databaseName = 'sample_weatherdata';
const dataCollection = 'data'

module.exports = {}

module.exports.getByCallLetter = async (callLetter) => {
    const database = client.db(databaseName);
    const weatherData = database.collection(dataCollection);
    const query = {callLetters: ObjectId(callLetter)};
    let weatherCursor = await weatherData.findOne(query);
  
    return weatherCursor.toArray();
  }

  module.exports.getAll = async () => {
    const database = client.db(databaseName);
    const weatherData = database.collection(dataCollection);
  
    const query = {};
    let weatherCursor = await weatherData.find(query).limit(10);
  
    return weatherCursor.toArray();
  }

  module.exports.create = async (newObj) => {
    const database = client.db(databaseName);
    const weatherData = database.collection(dataCollection);
  
    if(!newObj.elevation){
      // Invalid movie object, shouldn't go in database.
      return {error: "Movies must have a title."}
    }
    const result = await weatherData.insertOne(newObj);
  
    if(result.acknowledged){
      return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` }
    } else {
      return {error: "Something went wrong. Please try again."}
    }
  }