const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get('/',(req, res) => {
    res.send("hello world")
})

mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("DB Connected");
    }
})

app.listen(8800,() => {
    console.log("server running at : 8800");
})