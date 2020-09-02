const express = require("express");
const morgan = require("morgan");
const app = express();
const books = require("./books.js");

app.use(morgan("common"));

app.get("/books", (req, res) => {
  const { search = "", sort } = req.query;

  if (sort) {
    if (!["title", "rank"].includes(sort)) {
      return res.status(400).send("sort must be either title or rank");
    }
  }

  let results = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase().trim())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);
});

module.exports = app;
