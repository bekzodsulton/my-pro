const express = require("express"); // Подключаем встроенный модуль express

const Socials = require("../models/socials");

const createPath = require("../helpers/create-path");
const router = express.Router();

router.get("/about", (req, res) => {
  const title = "О нас";
  Socials.find()
    .then((socials) => {
      res.render(createPath("about"), { socials, title });
    })
    .catch((err) => {
      console.log(err);
      res.render(createPath("404"), { title: "404" });
    });
});

router.get("/about-us", (req, res) => {
  res.render("/about");
});

module.exports = router;
