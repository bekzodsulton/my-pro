const express = require("express"); // Подключаем встроенный модуль express
const router = express.Router(); // Инициализируем роутер
const {
  getIdPosts,
  deletePost,
  getAboutUS,
  getAddPost,
  getEditPost,
  getPosts,
  putIdPosts,
  postAddPost,
} = require("../controllers/post-controller");

router.get("/about-us", getAboutUS);

router.get("/add-post", getAddPost);

router.get("/edit/:id", getEditPost);

router.get("/posts", getPosts);

router.get("/posts/:id", getIdPosts);

router.delete("/posts/:id", deletePost);

router.put("/posts/:id", putIdPosts);

router.post("/add-post", postAddPost);

module.exports = router;
