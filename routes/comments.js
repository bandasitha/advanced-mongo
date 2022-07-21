const { Router } = require("express");
const router = Router();

const commentsData = require('../dataInterface/comments');

// ----------------------- //
// --- comments routes --- //
// ----------------------- //
  
  // curl http://localhost:5000/comments/5a9427648b0beebeb6957b44/text
  router.get("/:id/text", async (req, res) => {
    const result = await commentsData.getOneComment(req.params.id)
    if (result.error) {
      resultStatus = 400;
    } else {
      resultStatus = 200;
    }
    res.status(resultStatus).send(result)
  });
  
  // curl -X POST -H "Content-Type: application/json" -d '{"name":"edwin", "text":"trash"}' http://localhost:5000/movies/573a1390f29313caabcd4eaf/comments
  router.post("/:id/comments", async(req, res) => {
    const result = await commentsData.createComment(req.params.id, req.body)
    res.status(200).send(result);
  })
  
  
  // curl -X DELETE http://localhost:5000/comments/62d8d7d254e0aa3e90aff638
  router.delete("/:id", async (req, res, next) => {
    const result = await commentsData.deleteCommentById(req.params.commentId)
    res.status(200).send("successfully deleted");
  });
  
  module.exports = router;
  