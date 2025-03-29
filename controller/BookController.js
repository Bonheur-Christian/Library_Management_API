const BookModel = require("../model/BookModel")

module.exports = {
    saveBookInStock: async (req, res) => {
        const { title, author, isbn, price, published_year, quantity } = req.body;

        try {
            const book = await BookModel.insertBookInStock(title, author, isbn, price, published_year, quantity);

            if (book.error) {
                return res.status(400).json({ messageError: book.error })
            }

            return res.status(201).json({ message: "Book successfully added.", book: book });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }

    },

    getBooksInStock: async (req, res) => {
        try {

            const books = await BookModel.getAllBooksInStock();

            if (books.length > 0) {
                return res.status(200).json({ message: "Books retrieved: ", Books: books });
            }

            return res.status(404).json({ messageError: "No Books Found" })

        } catch (err) {
            return res.status(500).json({ message: "Error occured in getting all books." })
        }
    },

    getBookByIdFromStock: async (req, res) => {
        const { id } = req.params;

        try {

            const book = await BookModel.getBookFromStock(id);
            if (book.length === 0)
                return res.status(404).json({ message: "Book not Found." })

            return res.json(book);


        } catch (err) {
            return res.status(500).json({ message: "Errot occured in getting Book with specified id." })

        }
    },

    updateBookByIdInStock: async (req, res) => {
        const { title, author, isbn, price, published_year, quantity } = req.body;
        const { id } = req.params;

        try {
            const bookToUpdate = await BookModel.getBookFromStock(id);

            if (bookToUpdate.length > 0) {

                const updatedBook = await BookModel.updateBookInStock(title, author, isbn, price, published_year, quantity, id);

                if (updatedBook.affectedRows > 0)
                    return res.status(200).json({ message: "Book Updated Successfully", book: updatedBook })

                return res.status(400).json({ message: "No changes made to the book." });

            }

            return res.status(404).json("Book Not Found");



        } catch (err) {
            console.log(err);

            return res.status(500).json({ messageError: "Error in updating book.", error: err })
        }
    },

    deleteBookById: async (req, res) => {
        const { id } = req.params;

        try {

            const bookToDelete = await BookModel.getBookFromStock(id);

            if (bookToDelete.length > 0) {
                const deletedBook = await BookModel.deleteBookFromStock(id);

                if (deletedBook.affectedRows > 0)
                    return res.status(200).json({ message: "Book Deleted Successfully", deletedBook: bookToDelete })

                return res.status(400).json({ message: "Book Not Deleted" });
            }

            return res.status(404).json({ messageError: "Book Not Found" })


        } catch (err) {
            return res.status(500).json({ messageError: "Failed to Delete Book.", err: err })

        }
    },

    lendBook: async (req, res) => {
        const { borrower_name, title, author } = req.body;

        try {
            if (!borrower_name || !title || !author)
                return res.status(404).json({ messageError: "Missing Required Fields" });

            const desiredBook = await BookModel.findBookToLend(title, author);

            if (desiredBook.length === 0)
                return res.status(404).json({ messageError: "Desired book(s) Not Found." });

            const bookToLend = desiredBook[0];
            const availableQuantity = bookToLend.quantity;

            if (availableQuantity <= 0)
                return res.status(404).json({ messageError: "No Copies left to lend" });

            const updatedQuantity = availableQuantity - 1;

            await BookModel.updateBookInStock(
                bookToLend.bookName,
                bookToLend.book_author,
                bookToLend.bookISBN,
                bookToLend.price,
                bookToLend.published_year,
                updatedQuantity,
                bookToLend.bookID
            );

            const date = new Date();

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            const lend_date = `${year}-${month}-${day}`;

            const lendedBook = await BookModel.insertBookInLendedBooks(bookToLend.bookID, borrower_name, lend_date);

            if (lendedBook.affectedRows > 0)
                return res.status(200).json(
                    {
                        message: "Book Lent Successfully",
                        book: {
                            title: bookToLend.bookName,
                            author: bookToLend.book_author,
                            borrower: borrower_name,
                            lend_date: lend_date
                        }

                    }
                )

        } catch (err) {
            return res.status(500).json({ messageError: "Error in lending  Book" });
        }

    }
}

