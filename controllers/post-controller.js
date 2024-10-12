const Post = require("../models/post"); // Подключаем модель Post
const Contact = require("../models/socials"); // Подключаем модель socials
const createPath = require("../helpers/create-path"); // Подключаем функцию для создания абсолютного пути к файлу HTML

const handleError = (res, err) => {
  console.log(err);
  res.render(createPath("404"), { title: "404" });
};

const getAboutUS = (req, res) => {
  const title = "О нас";
  res.render(createPath("about"), { title });
};

const getAddPost = (req, res) => {
  const title = "Добавление поста";
  res.render(createPath("add-post"), { title });
};

const getEditPost = (req, res) => {
  console.log(req.params.id); // проверяем, какой id передается
  const title = "Редактирование Поста";
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.render(createPath("edit-post"), { post, title });
      } else {
        res.render(createPath("404"), { title: "404" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.render(createPath("404"), { title: "404" });
    });
};

const getPosts = (req, res) => {
  const title = "Посты";
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render(createPath("posts"), { posts, title });
    })
    .catch((err) => {
      console.log(err);
      res.render(createPath("404"), { title: "404" });
    });
};

const getIdPosts = (req, res) => {
  const title = "Пост";
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath("post"), { post, title });
    })
    .catch((err) => handleError(res, err));
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => handleError(res, err));
};

const putIdPosts = (req, res) => {
  const { title, text, author } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, text, author })
    .then((result) => {
      res.redirect(`/posts/${id}`);
    })
    .catch((err) => {
      console.log(err);
      res.render(createPath("404"), { title: "404" });
    });
};

const postAddPost = (req, res) => {
  const { title, text, author } = req.body;

  const post = new Post({
    title,
    text,
    author,
  });
  post
    .save()
    .then((result) => res.redirect("/posts"))
    .catch((err) => {
      console.log(err);
      res.render(createPath("404"), { title: "404" });
    });
};

const getContacts = (req, res) => {
  const title = "О нас";
  Contact.find()
    .then((socials) => {
      res.render(createPath("about"), { socials, title });
    })
    .catch((err) => {
      console.log(err);
      res.render(createPath("404"), { title: "404" });
    });
};

module.exports = {
  getIdPosts,
  deletePost,
  getAboutUS,
  getAddPost,
  getEditPost,
  getPosts,
  putIdPosts,
  postAddPost,
  getContacts,
};
