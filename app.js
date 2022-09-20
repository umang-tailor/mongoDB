const express = require('express')
const rateLimit = require('express-rate-limit')
var path = require("path");
var bodyParser = require("body-parser");
const mongoose = require ("mongoose")
var indexRouter = require("./routes/index");
var app = express()




// const get_depth = (obj) => {
//   let depth = 0
//   for(const key in obj) {
//       if( obj[key] instanceof Object ) {
//         depth = Math.max(get_depth(obj[key]), depth)
//       }
//   }
//   return depth+1
// }
// const depth_limit = 2
// const limit_depth = function(req, res, next) {
//   if( get_depth(req.body) > depth_limit ) throw new Error("Possible NoSQL Injection")
//   next()
// }

// app.use(limit_depth)



const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// app.use(apiLimiter)
app.use(bodyParser.json());
app.use("/",apiLimiter,indexRouter);



DB_URL= 'mongodb+srv://umang:umang1234@cluster0.ausnvo8.mongodb.net/mongoDB?retryWrites=true&w=majority'
mongoose.connect(DB_URL).then(()=>{
    console.log("connection successfully");

}).catch((err)=>{
  console.log('err :>> ', err);
    console.log("not connected");
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log(`server is start ${PORT}`);
});



module.exports=app