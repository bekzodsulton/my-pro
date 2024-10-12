const express = require("express"); // Подключаем встроенный модуль express
const postApiRoutes = require("./routes/api-post-routes");
const morgan = require('morgan');
const mongoose = require("mongoose");
require('dotenv').config()
const methodOverride = require('method-override')
const postRoutes = require("./routes/post-routes");
const contactRoutes = require("./routes/contact-routes");
const createPath = require("./helpers/create-path");








const app = express(); // Инициализируем express

app.set("view engine", "ejs"); // Устанавливаем движок для работы с шаблонами

const HOST = "localhost"; // Устанавливаем хост сервера







// mongoose
//   .connect(db)
//   .then((res) => console.log("MongoDB connected"))
//   .catch((error) => console.log(error));

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URL);
    const chalk = await import('chalk');
    console.log(chalk.default.bold.yellow.bgGreen("MongoDB connected"));
  } catch (error) {
    const chalk = await import('chalk');
    console.log(chalk.default.bold.white.bgRed(error));
   
  }
};

connectDB();

// Функция для создания абсолютного пути к файлу HTML



  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static("css")); // Подключаем статические файлы из папки css
  app.use(methodOverride('_method'))




app.get("/", (req, res) => {
  const title = "Главная страница";
  res.render(createPath("index"), { title });
});



app.use( postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);



app.use((req, res) => {
  const title = "404";
  res.status(404).render(createPath("404"), { title });
});

// Запускаем сервер и выводим сообщение в консоль, что сервер запущен
// app.listen(PORT, HOST,  (error) => {
//  error ? console.log( error) : console.log((`Server is running on http://${HOST}:${PORT}`)); // Сообщение о запуске сервера
// });
const startServer = async () => {
  try {
    const chalk = await import('chalk'); // Динамический импорт в CommonJS
    await new Promise((resolve, reject) => {
      app.listen(process.env.PORT, HOST, (error) => {
        if (error) {
          reject(error);
        } else {
          console.log(chalk.default.bold.black.bgWhite(`Server is running on http://${HOST}:${process.env.PORT}`)); // Сообщение о запуске сервера зелёным цветом
          resolve();
        }
      });
    });
  } catch (error) {
    const chalk = await import('chalk');
    console.log(chalk.default.bold.black.bgRed(`Error: ${error.message}`)); // Сообщение об ошибке красным цветом
  }
};

startServer();

