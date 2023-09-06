//here express server 
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config({path: '../.env'});


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



app.get("/", (req, res)=> {
    res.send("This is the home route")
})

//database uri 
const uri = process.env.MONGODB_URI

//database connection
if(!uri){
    console.log("Missing uri!")
    process.exit(1);
}
const connectDB = () => {
    try{
        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: false})
        console.log("Connected with the db successfully!")
    }catch(err){
       console.log("Invalid Credentials")
    }
}

//execute this 
connectDB()


//define all the routes here 
app.use('/api', require('./routes/CRUD'));

const PORT = 3001;

app.listen(PORT, ()=> {
    console.log(`Server ruuning on the port ${PORT}`)
})

