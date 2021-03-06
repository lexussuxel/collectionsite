const express = require("express")//,
const fileUpload = require('express-fileupload')

const sequelize = require('./db');
const mysql = require('mysql2');
const models = require('./models/models');
require('dotenv').config({path: __dirname + '/.env'});
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');


const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));


if (process.env.NODE_ENV === "production")
    app.use(express.static(path.join(__dirname, '../client/public')));


app.use('/api', router);

app.use(errorHandler);

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();

    }catch(e){

    }
}

start();

app.listen(PORT, () => {console.log(`${PORT}`)})
















// const fs = require("fs");
//
// const app = express();
// const jsonParser = express.json();
//
// app.use(express.static(__dirname + "/public"));
//
// const filePath = "users.json";
// app.get("/api/users", function(req, res){
//
//     const content = fs.readFileSync(filePath,"utf8");
//     const users = JSON.parse(content);
//     res.send(users);
// });
// // получение одного пользователя по id
// app.get("/api/users/:id", function(req, res){
//
//     const id = req.params.id; // получаем id
//     const content = fs.readFileSync(filePath, "utf8");
//     const users = JSON.parse(content);
//     let user = null;
//     // находим в массиве пользователя по id
//     for(var i=0; i<users.length; i++){
//         if(users[i].id==id){
//             user = users[i];
//             break;
//         }
//     }
//     // отправляем пользователя
//     if(user){
//         res.send(user);
//     }
//     else{
//         res.status(404).send();
//     }
// });
// // получение отправленных данных
// app.post("/api/users", jsonParser, function (req, res) {
//
//     if(!req.body) return res.sendStatus(400);
//
//     const userName = req.body.name;
//     const userAge = req.body.age;
//     let user = {name: userName, age: userAge};
//
//     let data = fs.readFileSync(filePath, "utf8");
//     let users = JSON.parse(data);
//
//     // находим максимальный id
//     const id = Math.max.apply(Math,users.map(function(o){return o.id;}))
//     // увеличиваем его на единицу
//     user.id = id+1;
//     // добавляем пользователя в массив
//     users.push(user);
//     data = JSON.stringify(users);
//     // перезаписываем файл с новыми данными
//     fs.writeFileSync("users.json", data);
//     res.send(user);
// });
// // удаление пользователя по id
// app.delete("/api/users/:id", function(req, res){
//
//     const id = req.params.id;
//     let data = fs.readFileSync(filePath, "utf8");
//     let users = JSON.parse(data);
//     let index = -1;
//     // находим индекс пользователя в массиве
//     for(var i=0; i < users.length; i++){
//         if(users[i].id==id){
//             index=i;
//             break;
//         }
//     }
//     if(index > -1){
//         // удаляем пользователя из массива по индексу
//         const user = users.splice(index, 1)[0];
//         data = JSON.stringify(users);
//         fs.writeFileSync("users.json", data);
//         // отправляем удаленного пользователя
//         res.send(user);
//     }
//     else{
//         res.status(404).send();
//     }
// });
// // изменение пользователя
// app.put("/api/users", jsonParser, function(req, res){
//
//     if(!req.body) return res.sendStatus(400);
//
//     const userId = req.body.id;
//     const userName = req.body.name;
//     const userAge = req.body.age;
//
//     let data = fs.readFileSync(filePath, "utf8");
//     const users = JSON.parse(data);
//     let user;
//     for(var i=0; i<users.length; i++){
//         if(users[i].id==userId){
//             user = users[i];
//             break;
//         }
//     }
//     // изменяем данные у пользователя
//     if(user){
//         user.age = userAge;
//         user.name = userName;
//         data = JSON.stringify(users);
//         fs.writeFileSync("users.json", data);
//         res.send(user);
//     }
//     else{
//         res.status(404).send(user);
//     }
// });
//
// app.listen(3000, function(){
//     console.log("Сервер ожидает подключения...");
// });