const express = require('express')
var path = require("path");
var bodyParser = require("body-parser");
const mongoose = require ("mongoose")
var indexRouter = require("./routes/index");
var app = express()
app.use(bodyParser.json());
app.use("/", indexRouter);


DB_URL= 'mongodb+srv://umang:umang1234@cluster0.ausnvo8.mongodb.net/mongoDB?retryWrites=true&w=majority'
mongoose.connect(DB_URL).then(()=>{
    console.log("connection successfully");

}).catch((err)=>{
  console.log('err :>> ', err);
    console.log("not connected");
})





const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`server is start ${PORT}`);
});



