require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/mainRoutes')
const {connectDB} = require('./config/db')

connectDB();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.use((req,res,next)=>{
    console.log(`${req.method} request to ${req.url}`);
    next();
})

app.use('/', routes);

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).render("error", {message: err.message || "Something went wrong....."});
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});