const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoutes = require('./routes/auth')

dotenv.config();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user/", userRoutes)

mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log("DB Connected");
    }
})

app.listen(8800,() => {
    console.log("server running at : 8800");
})