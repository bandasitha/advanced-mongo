const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri =
"mongodb+srv://amber:Xuss6BVZiMdto0Aa@js330-test-cluster.l09khft.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const commentColl = 'comments'

module.exports = {}

  module.exports.getOneComment = async (commentId) => {
    const database = client.db(databaseName);
    const comments = database.collection(commentColl);
  
    const query = {_id: ObjectId(commentId)}
    let commentCursor = await comments.find(query);
    return commentCursor.toArray();
  }
  

  module.exports.deleteCommentById = async (commentId) => {
    const database = client.db(databaseName);
    const comments = database.collection(commentColl);
  
    const deletionRules = {_id:ObjectId(commentId)}
    const result = await comments.deleteOne(deletionRules);
  
    if(result.deletedCount != 1){
      return {error: `Something went wrong. ${result.deletedCount} movies were deleted. Please try again.`}
    };
  
    return {message: `Deleted ${result.deletedCount} movie.`};
  }

