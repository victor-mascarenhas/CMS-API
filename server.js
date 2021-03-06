const express = require('express')
const app = express()
var cors = require('cors')
const connectDB = require('./config/db')
const fileUpload = require('express-fileupload')
var bodyparser = require('body-parser')
const PORT = process.env.PORT || 4646

//Init Middleware
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use('/uploads', express.static('uploads'))

//Mongo Connect
connectDB()

app.use(fileUpload({
    createParentPath: true
}));

//Define Routes
app.get('/', (req, res) => res.send('Hello!'))
app.use('/category', require('./routes/api/category'))
app.use('/product', require('./routes/api/product'))
app.use('/content', require('./routes/api/content'))
app.use('/banner', require('./routes/api/banner'))
app.use('/services', require('./routes/api/services'))
app.use('/info', require('./routes/api/info'))
app.use('/user', require('./routes/api/user'))
app.use('/auth', require('./routes/api/auth'))
app.use('/email', require('./routes/api/email'))


app.listen(PORT, () => {console.log(`Listening on: ${PORT}`)})