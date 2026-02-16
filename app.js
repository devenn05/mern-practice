const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))

let myBooks = ["Marvels", "Harry Potter", "DC Universe"]
let myStories = ["a", "b", "c"]

app.get('/', (req, res)=>{
    res.render('index', {
        books: myBooks
    })
});

app.get('/books/:index', (req, res)=>{
    const bookId = req.params.index;
    const selectedBook = myBooks[bookId];
    const selectedBookStory = myStories[bookId]
    if (!selectedBook){
        return res.send("Book not found!")
    }
    res.render('book-details', {
        bookName: selectedBook,
        bookStory: selectedBookStory,
        id: bookId
    })
})

app.post('/add-book', (req, res) =>{
    const newBook = req.body.title;
    const newStory = req.body.story
    if (newBook && newStory){
        myBooks.push(newBook);
        myStories.push(newStory)
    }
    res.redirect('/')
})

app.listen(port, ()=>{
    console.log("Server is running on http://localhost:3000")
})