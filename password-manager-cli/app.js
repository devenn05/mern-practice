require('dotenv').config();
const express = require('express');
const app = express();

app.use((req,res,next)=>{
    console.log(`${req.method} request to ${req.url}`);
    next();
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

//routes

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Error: ", err);
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});