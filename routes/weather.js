const { Router } = require("express");
const router = Router();

const weatherData = require('../dataInterface/weather');

router.get("/:callLetters", async (req, res) => {
    let weather = await weatherData.getByCallLetter(eq.params.id)
  
    if (weather) {
      res.status(200).send(weather)
    } else {
      res.status(500).send({ error: "Something went wrong. Please try again." })
    }
  });
  
  
  router.get("/", async (req, res, next) => {
    let movieList = await weatherData.getAll()
  
    if (movieList) {
      res.status(200).send(movieList)
    } else {
      // If movieList is empty/null, something serious is wrong with the MongoDB connection.
      res.status(500).send({ error: "Something went wrong. Please try again." })
    }
  });
  
  router.post("/", async (req, res) => {
    let resultStatus;
    let result = await weatherData.create(req.body);
  
    if (result.error) {
      resultStatus = 400;
    } else {
      resultStatus = 200;
    }
  
    res.status(resultStatus).send(result);
  });

  module.exports = router;
