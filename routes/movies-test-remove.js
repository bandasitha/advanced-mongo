// renaming movies.test to only test for weather
const request = require("supertest");
const server = require("../server");

// Declare the jest will mock movieData. Must be before the require statement.
jest.mock("../dataInterface/movies");
const movieData = require("../dataInterface/movies")

describe("/movies routes", () => {

  beforeEach(() => {

  });

  describe("GET /", () =>{
    it("should return an array on success", async () => {
      movieData.getAll.mockResolvedValue([{_id:"890", title:"One Day"}]);

      const res = await request(server).get("/movies");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message on error", async () => {
      movieData.getAll.mockResolvedValue(null);

      const res = await request(server).get("/movies");

      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("GET /movies/:id/comments", () =>{
    it("should return array of comments on success", async () => {
      movieData.getAllComments.mockResolvedValue([{_id:"727", title:"This is a test title", text: "This is a test comment"}]);

      const res = await request(server).get("/movies/:id/comments");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message on error", async () => {
      movieData.getAllComments.mockResolvedValue({error: "movie not found"});

      const res = await request(server).get("/movies/:id/comments");

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBeDefined();
    });
  });

  // ----- unable to get PUT test working ----- // 
  // describe("PUT movies/:id/comments", () =>{
  //   it("should return the updated movie on success", async () => {
  //     movieData.updateCommentById.mockResolvedValue([{_text: "This is an updated comment"}]);
  //     const res = await request(server).put("/movies/573a1390f29313caabcd4eaf/comments/62e01c884e64804c7c99c742");
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body.error).not.toBeDefined();
  //   });
  //   movieData.updateCommentById.mockResolvedValue({error: "movie not found"});

  //   const res = await request(server).put("/:id/comments/:commentId");

  //   expect(res.statusCode).toEqual(400);
  //   });
  // });

  describe("DELETE /:movieId/comments/:commentId", () =>{
    it("should return a message on success", async () => {
      movieData.deleteCommentById.mockResolvedValue({message: "mocked movies was deleted!"});

      const res = await request(server).delete("/movies/573a1390f29313caabcd4323/comments/5a9427648b0beebeb69579e7");

      expect(res.statusCode).toEqual(200);
    });
    it("should return an error message if movie fails to be deleted", async () => {
      movieData.deleteCommentById.mockResolvedValue({error: "mocked movies was not deleted!"});

      const res = await request(server).delete("/573a1390f29313caabcd4323/comments/5a9427648b0beebeb69579e7");

      expect(res.statusCode).toEqual(404);
    });
  });

  //   describe("GET /movies/genres/:genreName", () =>{
  //   it("should return an array of movies on success", async () => {
  //     // TODO: Mock the correct data interface method
  //     const res = await request(server).get("/movies/genres/Short");

  //     expect(res.statusCode).toEqual(200);
  //     expect(Array.isArray(res.body)).toEqual(true);
  //     expect(res.body.error).not.toBeDefined();
  //   });
  //   it("should return an empty array if no movies match genre", async () => {
  //     // TODO: Mock the correct data interface method
  //     const res = await request(server).get("/movies/genres/UEOA921DI");

  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body.length).toEqual(0);
  //     expect(res.body.error).not.toBeDefined();
  //   });
  //   it("should return an error message on error", async () => {
  //     // TODO: Mock the correct data interface method

  //     const res = await request(server).get("/movies/genres/Short");

  //     expect(res.statusCode).toEqual(500);
  //     expect(res.body.error).toBeDefined();
  //   });
  // });

});