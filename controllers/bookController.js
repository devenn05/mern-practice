const fs = require('fs')

const getBooks = ()=>{
    const jsonData = fs.readFileSync('./books.json', 'utf-8');
    return JSON.parse(jsonData);
};

const saveBook = (data) =>{
    fs.writeFileSync('./books.json', JSON.stringify(data, null, 2));
}

exports.getBooks = (req, res)=>{
    const books = getBooks();
    res.render('index', {books: books})
}

exports.getBookById = (req, res)=>{
    const books = getBooks();
    const bookId = req.params.index;
    selectedBook = books[bookId];

    if (!selectedBook){
        return res.status(404).send("No Book Found");
    }
    res.render('book-details', {
        title: selectedBook.title,
        story: selectedBook.story,
        id: bookId
    })
}

exports.addBook = (req, res)=>{
    const books = getBooks();
    books.push({title: req.body.title, story: req.body.story});
    saveBook(books);
    res.redirect('/books')
}

exports.deleteBook = (req, res)=>{
    const books = getBooks();
    const bookId = req.params.index;

    if (bookId >=0 && bookId < books.length){
        books.splice(bookId, 1);
        saveBook(books);
        res.redirect('/books')
    }
}

exports.deleteAllBook = (req, res)=>{
    saveBook([]);
    res.redirect('/books')
}

