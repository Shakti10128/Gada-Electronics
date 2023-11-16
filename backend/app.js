const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const ErrorMiddleware = require('./middleware/error.js')


app.use(express.json());
app.use(cookieParser());



// routes imports
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require("./routes/userRoutes.js");

app.use('/api/v1',productRoutes);
app.use('/api/v1',userRoutes);

// middleware
app.use(ErrorMiddleware);

module.exports = app;