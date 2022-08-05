const request = require("supertest");
const server = require("../server");

// Declare the jest will mock weatherData. Must be before the require statement.
jest.mock("../dataInterface/weather");
const weatherData = require("../dataInterface/weather");

describe("/weather routes", () => {
  beforeEach(() => {
  });

  describe("GET /", () => {
    it("should return an array on success", async () => {
      weatherData.getAll.mockResolvedValue([{ _id: "890", "airTemperature.value": 3 }]);
      const res = await request(server).get("/weather");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message on error", async () => {
      weatherData.getAll.mockResolvedValue(null);
      const res = await request(server).get("/weather");
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("GET /weather/:callLetters", () => {
    it("should return array of comments on success", async () => {
      weatherData.getByCallLetter.mockResolvedValue([{ callLetter: "VC81", elevation: "12345" }]);
      const res = await request(server).get("/weather/:callLetters");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message on error", async () => {
      weatherData.getByCallLetter.mockResolvedValue(null);
      const res = await request(server).get("/weather/VC81");
      expect(res.statusCode).toEqual(422);
    });
  });

  describe("POST /", () => {
    it("should return new object id on success", async () => {
      weatherData.create.mockResolvedValue({ message: "new object created" });
      const res = await request(server).post("/weather")
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
      expect(res.body.message).toBeDefined();
    });
    it("should return error message if weather report fails to create", async () => {
      weatherData.create.mockResolvedValue(null);
      const res = await request(server).post("/weather")
      expect(res.statusCode).toEqual(422);
    });
  });
});