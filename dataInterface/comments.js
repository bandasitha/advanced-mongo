const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri =
"mongodb+srv://amber:Xuss6BVZiMdto0Aa@js330-test-cluster.l09khft.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const commentColl = 'comments'

module.exports = {}

// -------------------------- //
// --- comments interface --- //
// -------------------------- //

// module.exports.getAllComments = async (movieId) => {
//     const database = client.db(databaseName);
//     const comments = database.collection(commentColl);
  
//     const query = {movie_id: ObjectId(movieId)}
//     let commentCursor = await comments.find(query);
//     return commentCursor.toArray();
//   }
  
  module.exports.getOneComment = async (commentId) => {
    const database = client.db(databaseName);
    const comments = database.collection(commentColl);
  
    const query = {_id: ObjectId(commentId)}
    let commentCursor = await comments.find(query);
    return commentCursor.toArray();
  }
  
//   module.exports.createComment = async(movieId, newObj) =>{
//     // TODO: Validate that movieId is for an existing movie
//     const database = client.db(databaseName);
//     const comments = database.collection(commentColl);
  
//     const goodObj = {...newObj, movie_id: ObjectId(movieId), date: new Date()}
  
//     const result = await comments.insertOne(goodObj);
  
//     if(result.acknowledged){
//       return { newObjectId: result.insertedId, message: `Comment created! ID: ${result.insertedId}` }
//     } else {
//       return {error: "Something went wrong. Please try again."}
//     }
//   }

