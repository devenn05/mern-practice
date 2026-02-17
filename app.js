const express = require('express');
const fs = require('fs')
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))

const getBooks = ()=>{
    const jsonData = fs.readFileSync('./books.json', 'utf-8');
    return JSON.parse(jsonData);
};

const saveBook = (data) =>{
    fs.writeFileSync('./books.json', JSON.stringify(data, null, 2));
}

app.get('/', (req, res)=>{
    const books = getBooks()
    res.render('index', {
        books: books
    })
});

app.get('/books/:index', (req, res)=>{
    const books = getBooks();
    const bookId = req.params.index;
    const selectedBook = books[bookId];

    if (!selectedBook){
        return res.send("Book not found!")
    }
    res.render('book-details', {
        title: selectedBook.title,
        story: selectedBook.story,
        id: bookId
    })
})

app.post('/add-book', (req, res) =>{
    const books = getBooks();
    const newBook = {
        title: req.body.title,
        story: req.body.story
    }
    if (newBook.title && newBook.story){
        books.push(newBook);
        saveBook(books)
    }
    res.redirect('/')
})

app.delete("/delete-book/:index",(req, res)=>{
    const books = getBooks()
    const bookId = req.params.index;
    
    if (bookId >=0 && bookId < books.length){
        books.splice(bookId, 1);
        saveBook(books)
        res.redirect("/")
    }else{
        res.status(404).send("Error, no book found")
    }
})

app.post('/delete-all', (req, res)=>{
    saveBook([]);
    res.redirect('/')
})

app.get("/about", (req, res)=>{
    res.render('about')
})




app.listen(port, ()=>{
    console.log("Server is running on http://localhost:3000")
})