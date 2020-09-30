const express = require('express')
const app = express()
var cors = require('cors')
const connectDB = require('./config/db')
var bodyparser = require('body-parser')
const PORT = process.env.PORT || 4646

//Init Middleware
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//Mongo Connect
connectDB()

//Define Routes
app.get('/', (req, res) => res.send('Hello!'))
app.use('/category', require('./routes/api/category'))


app.listen(PORT, () => {console.log(`Listening on: ${PORT}`)})