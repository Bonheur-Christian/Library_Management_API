const BookModel = require("../model/BookModel")

module.exports = {
    saveBookInDatabase: async (req, res) => {
        const { title, author, isbn, price, published_year } = req.body;

        try {
            const book = await BookModel.insertBook(title, author, isbn, price, published_year);
            res.json({ message: "Book successfully added.", book });
            res.status(201);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }

    },

    getBooks: async (req, res) => {
        try {
            const books = await BookModel.getAllBooks();
            res.json(books);
        } catch (err) {
            res.status(500).json({ message: "Error occured in getting all books." })
        }
    },

    getBookById: async (req, res) => {
        const { id } = req.params;
        console.log(id);

        try {

            const book = await BookModel.getBookById(id);
            if (!book)
                res.status(404).json({ message: "Book not Found." })

            res.json(book);


        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Errot occured in getting Book with specified id." })

        }
    },

    updateBookById: async (req, res) => {
        const { title, author, isbn, price, published_year } = req.body;
        const { id } = req.params;

        try {
            const bookToUpdate = await BookModel.getBookById(id);
            console.log(bookToUpdate);
            
            if (!bookToUpdate)
                return res.status(404).json("Book Not Found");

            const updatedBook = await BookModel.updateBook(title, author, isbn, price, published_year, id);

            if (updatedBook)
                return res.status(200).json({ message: "Book updated successfully" , book:book});
        } catch (err) {
            return res.status(500).json({ messageError: "Error in getting the book to update.", error:err })
        }
    }
}

