var colors = require('colors');
var ip = require('ip');
var express = require('express');
// парсер (разбор) для обработки входящих данных
var bodyParser = require('body-parser');
var app = express();

// для того чтоб сервер автоматически находил файл
// index.html
//
//  project
//    └── src                     <-- нам в эту папку
//        ├── index.html
//        └── js                  <-- мы в этой папке
//            ├── app.js
//            └── routes
//                └── routes.js
//
// проделаем такие шаги

// из схемы видно что нужно поднятя на уровень выше

// 1) узнаем путь к текущему директорию
var currentDir = __dirname;
// Используем filepath для роботы с файловой системой
// filepath is interface for working with the file system in Node.js programs
var filepath = require('filepath');
// 2) создадим папку в рамках интерфейса filepath, метод .create()
// 3) потом перейдем на уровень выше .dir(), эквивалентно '../' в posix системах
// 4) узнаем путь ввиде строки, для этого используем свойство path
// из полученного объекта, после проделанных предыдущих шагов
var DirWithIndexHTML = filepath.create(currentDir).dir().path;

// будем обворовывать JSON
app.use(bodyParser.json());
//
app.use(bodyParser.urlencoded({
  extended: true,
}));

var routes = require('./routes/routes.js')(app, DirWithIndexHTML);

var server = app.listen(3000, function() {
  console.log('Start server'.green);
  console.log('IP address:'.yellow, ip.address().red.bold);
  console.log('PORT:'.yellow, server.address().port);
});
