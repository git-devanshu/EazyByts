const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const {connectToDB} = require('./configs/dbconfig');
const {authRouter} = require('./routes/authRoutes');
const {profileRouter} = require('./routes/profileRoutes');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// database connection
connectToDB();

//routes
app.use('/user', authRouter);
app.use('/profile', profileRouter);


// running the server
app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port", process.env.PORT);
});