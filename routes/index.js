const { Router } = require("express");
const router = Router();

router.use("/movies", require("./movies"));
router.use("/comments", require("./comments"))
router.use("/", (req, res) => res.status(404).send("Route not found. Available routes are /movies and /comments"))
module.exports = router;
