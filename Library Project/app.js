require('dotenv').config();
const express = require('express');
const fs = require('fs')
const app = express();
const port = process.env.PORT;
const bookRoutes = require('./routes/bookRoutes');
const mainRoutes = require('./routes/mainRoutes');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))

app.use((req, res, next)=> {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

app.use('/books', bookRoutes)
app.use('/', mainRoutes)

app.use((err, req, res, next) => {
    console.error("LOGGED ERROR:", err.stack);
    res.status(500).render('error', { message: "Something went wrong on our end!" });
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:3000 on ${port}`)
})