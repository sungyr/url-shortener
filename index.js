const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const UrlShort = require("./models/UrlShort");

mongoose.connect(
  "mongodb+srv://urlshortener1234:urlshortener1234@cluster0.bef07.mongodb.net/my_database",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = new express();
const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const UrlShorts = await UrlShort.find();
  res.render("index", { UrlShorts: UrlShorts });
});
app.post("/UrlShort", async (req, res) => {
  await UrlShort.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.use(express.static("public"));

app.get("/:URLShort", async (req, res) => {
  const URLShorts = await UrlShort.findOne({ short: req.params.URLShort });
  if (URLShorts == null) return res.sendStatus(404);

  URLShorts.clicks++;
  URLShorts.save();

  res.redirect(URLShorts.full);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port(4000);
}

app.listen(port, () => {
  console.log("App listening.....");
});
