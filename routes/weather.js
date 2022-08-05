const { Router } = require("express");
const router = Router();
const weatherData = require('../dataInterface/weather');

// curl "http://localhost:5000/weather?minAirTemp=5"
router.get("/", async (req, res, next) => {
  let weather = await weatherData.getAll(req.query.callLetters, req.query.section, req.query.minAirTemp, req.query.maxAirTemp )
  if (weather) {
    res.status(200).send(weather)
  } else {
    res.status(500).send({ error: "Something went wrong. Please try again." })
  }
});

// curl "http://localhost:5000/weather/callLetters=VC81"
router.get("/:callLetters", async (req, res) => {
  let weather = await weatherData.getByCallLetter(req.params.id)
  if (weather) {
    res.status(200).send(weather)
  } else {
    res.status(422).send({ error: "Something went wrong. Please try again." })
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"elevation":"12345"}' http://localhost:5000/weather
router.post("/", async (req, res) => {
  let resultStatus;
  let result = await weatherData.create(req.body);
  if (result.error) {
    resultStatus = 422;
  } else {
    resultStatus = 200;
  }

  res.status(resultStatus).send(result);
});

module.exports = router;