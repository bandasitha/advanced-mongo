const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri =
"mongodb+srv://amber:Xuss6BVZiMdto0Aa@js330-test-cluster.l09khft.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const databaseName = 'sample_weatherdata';
const dataCollection = 'data'

module.exports = {}
