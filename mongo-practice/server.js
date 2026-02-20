require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo');
const mainRoutes = require('./routes/mainRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DATABASE_URL)
.then(()=> console.log("Connected Successfully"))
.catch((err => console.error("Connection failed. Error: ", err)));

app.use('/', mainRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

