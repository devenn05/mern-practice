require('dotenv').config();
const port = process.env.PORT;
const mainRoutes = require('./routes/mainRoutes')
const express = require('express');
const app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.use((req, res, next)=>{
    console.log(`${req.method} request to ${req.url}`);
    next();
}) 

app.use('/', mainRoutes)

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).render("error", {message: "error error error"});
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})