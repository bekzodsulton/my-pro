const express = require("express"); // Подключаем встроенный модуль express
const router = express.Router(); // Инициализируем роутер
const {
  getIdPosts,
  deletePost,
  getPosts,
  putIdPosts,
  postAddPost,
} = require("../controllers/api-post-controller");

// Получения всех постов 
router.get("/api/posts", getPosts);
// Получения конкретного поста
router.get("/api/posts/:id", getIdPosts);
// Удаление поста
router.delete("/api/posts/:id", deletePost);
// Редактирование поста
router.put("/api/posts/:id", putIdPosts);
// Добавление поста
router.post("/api/posts", postAddPost);




module.exports = router;
