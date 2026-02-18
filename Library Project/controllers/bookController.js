const fs = require('fs');
const catchAsync = require('../utils/catchAsync');

const getBooks = ()=>{
    const jsonData = fs.readFileSync('./books.json', 'utf-8');
    return JSON.parse(jsonData);
};

const saveBook = (data) =>{
    fs.writeFileSync('./books.json', JSON.stringify(data, null, 2));
}

exports.getBooks = catchAsync((req, res)=>{
    const books = getBooks();
    res.render('index', {books: books});
});

exports.getBookById = catchAsync((req, res)=>{
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
    });
});

exports.addBook = catchAsync((req, res)=>{
    const books = getBooks();
    books.push({title: req.body.title, story: req.body.story});
    saveBook(books);
    res.redirect('/books');
});

exports.deleteBook = catchAsync((req, res)=>{
    const books = getBooks();
    const bookId = req.params.index;

    if (bookId >=0 && bookId < books.length){
        books.splice(bookId, 1);
        saveBook(books);
        res.redirect('/books')
    }
});

exports.deleteAllBook = catchAsync((req, res)=>{
    saveBook([]);
    res.redirect('/books');
});

exports.updateBook = catchAsync((req, res)=>{
    const books = getBooks();
    const bookId = req.params.index;
    if (books[bookId]){
        books[bookId] = {
        title: req.body.title,
        story: req.body.story
        };
    };
    saveBook(books);
    res.redirect('/books');
});

exports.editBookPage = catchAsync((req, res)=>{
    const books = getBooks();
    const bookId =req.params.index;
    const selectedBook = books[bookId];

    if (!selectedBook) return res.redirect('/books');
    res.render('edit', {book: selectedBook, id: bookId});
});

