const express = require('express');
const fs = require('fs')
const app = express();
const port = 3000;
const bookRoutes = require('./routes/bookRoutes');
const mainRoutes = require('./routes/mainRoutes')

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))

app.use('/books', bookRoutes)
app.use('/', mainRoutes)

app.listen(port, ()=>{
    console.log("Server is running on http://localhost:3000")
})