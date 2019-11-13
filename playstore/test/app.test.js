const app = require("../app");
const supertest = require("supertest");
// const { expect } = require('chai');
const expect = require("chai").expect;

describe("app.js test suite", () => {
  it("should return 400 error without genre query", () => {
    return supertest(app)
      .get("/apps")
      .expect(400)
      .expect(
        `Genre must be one of these "Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"`
      );
  });
  it("should return array of objects", () => {
    const genres = "Action";
    return supertest(app)
      .get("/apps")
      .query(`genres=${genres}`)
      .expect(200)
      .expect("Content-Type", /json/);
  });
  it("should return 400 if wrong sort is given", () => {
    const sort = "fail";
    return supertest(app)
      .get("/apps")
      .query(`sort=${sort}`)
      .expect(400)
      .expect("Sort must be one of rating or app");
  });
  it("should check for all keys in the res object", () => {
    const genres = "Action";
    return supertest(app)
      .get("/apps")
      .query(`genres=${genres}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
        let app = res.body[0];
        expect(app).to.include.all.keys(
          "App",
          "Category",
          "Rating",
          "Reviews",
          "Size",
          "Installs",
          "Type",
          "Price",
          "Content Rating",
          "Genres",
          "Last Updated",
          "Current Ver",
          "Android Ver"
        );
      });
  });
});
