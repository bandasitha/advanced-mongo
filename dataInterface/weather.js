const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://amber:Xuss6BVZiMdto0Aa@js330-test-cluster.l09khft.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const databaseName = 'sample_weatherdata';
const dataCollection = 'data'

module.exports = {}

module.exports.getAll = async (callLetters, section, minAirTemp, maxAirTemp) => {
  const database = client.db(databaseName);
  const weatherData = database.collection(dataCollection);
  let query = {}

  if (callLetters) {
    query.callLetters = callLetters;
  }
  if (section) {
    query.sections = section;
  };
  if (minAirTemp) {
    query['airTemperature.value'] = {$gte: parseFloat(minAirTemp)}
  };
  if (maxAirTemp) {
    query['airTemperature.value'] = {$gte: parseFloat(maxAirTemp)}
  };

  console.log(query)

  let weatherCursor = await weatherData.find(query).limit(10).project({callLetters: 1})
  return weatherCursor.toArray();
}

module.exports.getByCallLetter = async (callLetters) => {
    const database = client.db(databaseName);
    const weatherData = database.collection(dataCollection);
    const query = {callLetters: callLetters};
    let weatherCursor = await weatherData.find (query);
    return weatherCursor.toArray();
  }

  module.exports.create = async (newObj) => {
    const database = client.db(databaseName);
    const weatherData = database.collection(dataCollection);
  
    if(!newObj.elevation){
      return {error: "invalid put request."}
    }

    const result = await weatherData.insertOne(newObj);
  
    if(result.acknowledged){
      return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` }
    } else {
      return {error: "Something went wrong. Please try again."}
    }
  }