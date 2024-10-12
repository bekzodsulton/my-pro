const Post = require("../models/post"); // Подключаем модель Post
const Contact = require("../models/socials"); // Подключаем модель socials
const createPath = require("../helpers/create-path"); // Подключаем функцию для создания абсолютного пути к файлу HTML

const handleError = (res, err) => {
  console.log(err);
  res.status(500).send(err);
};


const getPosts = (req, res) => {

  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.render(createPath("404"), { title: "404" });
    });
};

const getIdPosts = (req, res) => {

  Post.findById(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => handleError(res, err));
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json(req.params.id);
    })
    .catch((err) => handleError(res, err));
};

const putIdPosts = (req, res) => {
  const { title, text, author } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, text, author })
    .then((posts) => {
      res.status(200).json(posts);
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
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.render(createPath("404"), { title: "404" });
    });
};



module.exports = {
  getIdPosts,
  deletePost,
  getPosts,
  putIdPosts,
  postAddPost,

};
