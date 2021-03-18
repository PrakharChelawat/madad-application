const express= require('express')
const app= express()
const PORT=5000
const mongoose=require('mongoose')
const {MONGOURI} = require('./keys')



//YvSLQsRPM8If0119
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    // console.log("Connected successfully")
    console.log("Connecting to DB")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err)
})
require('./models/user.js')
require('./models/post')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
app.listen(PORT,()=>{
    //call back function
    console.log("server is Running on ",PORT);
})