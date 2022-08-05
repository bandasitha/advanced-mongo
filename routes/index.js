const { Router } = require("express");
const router = Router();

router.use("/movies", require("./movies"));
router.use("/weather", require("./weather"));
router.use("/", (req, res) => res.status(404).send("Route not found. Available routes are /movies"))
module.exports = router;
