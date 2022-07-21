const { Router } = require("express");
const router = Router();

const commentsData = require('../dataInterface/comments');

// ----------------------- //
// --- comments routes --- //
// ----------------------- //

// curl http://localhost:5000/movies/573a1399f29313caabcedc5d/comments
// router.get("/:id/comments", async (req, res) => {
//     const result = await commentsData.getAllComments(req.params.id)
//     if (result.error) {
//       resultStatus = 400;
//     } else {
//       resultStatus = 200;
//     }
//     res.status(resultStatus).send(result)
//   });
  
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
  
  // curl -X POST -H "Content-Type: application/json" -d '{"name":"Cinephile Cyprus", "text":"Wow!"}' http://localhost:5000/movies/573a1399f29313caabcedc5d/comments
  router.post("/:id/comments", async(req, res) => {
    const result = await commentsData.createComment(req.params.id, req.body)
    res.status(200).send(result);
  })
  
  router.delete("/:movieId/comments/:commentId", async (req, res, next) => {
    const result = await commentsData.deleteCommentById(req.params.commentId)
    res.status(200).send("successfully deleted");
  });
  
  module.exports = router;
  