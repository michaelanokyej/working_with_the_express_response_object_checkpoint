const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("common"));
app.use(cors());

const apps = require("./appList.js");

app.get("/apps", (req, res) => {
  const { sort = "", genres = "" } = req.query;

  // Validation
  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or app");
    }
  }

  const genreList = [
    "Action",
    "Puzzle",
    "Strategy",
    "Casual",
    "Arcade",
    "Card"
  ];

  if (!genreList.includes(genres)) {
    return res
      .status(400)
      .send(
        `Genre must be one of these "Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"`
      );
  }

  let results = apps.filter(app =>
    app.Genres.toLowerCase().includes(genres.toLowerCase())
  );


  res.json(results);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
