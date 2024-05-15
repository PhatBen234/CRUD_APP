const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const connectDB = require('./server/database/conncection.js')

const app = express();

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

//log request
app.use(morgan('tiny'));

connectDB();

// parse request to body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set('view engine', 'ejs');
// app.set('views', path.resolve__dirname,"views/ejs");

//load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))


app.use('/', require('./server/routes/router.js'))


app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)});

