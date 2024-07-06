const express =require('express');
const cookieParser = require('cookie-parser')
const authRouter=require('./routes/authRouter.js')
const streamRouter=require('./routes/streamRouter.js')
const {dbConnection}=require('./utils/db.js')
const cors=require('cors')
require('dotenv').config();
const app=express();

dbConnection();

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/',authRouter)
app.use('/',streamRouter)


app.listen(3000,()=>{
    console.log('server is running on port 3000');
})