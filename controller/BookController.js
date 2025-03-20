const BookModel = require("../model/BookModel")

module.exports = {
    saveBookInStock: async (req, res) => {
        const {title, author, isbn, price, published_year, quantity} = req.body;

        try {
            const book = await BookModel.insertBook(title, author, isbn, price, published_year, quantity);

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
                return res.status(200).json({ message: "Books retrieved", Books: books });
            }

            return res.status(404).json({ messageError: "No Books Found" })

        } catch (err) {
            return res.status(500).json({ message: "Error occured in getting all books." })
        }
    },

    getBookByIdFromStock: async (req, res) => {
        const { id } = req.params;
        console.log(id);

        try {

            const book = await BookModel.getBookFromStock(id);
            if (!book)
                return res.status(404).json({ message: "Book not Found." })

            return res.json(book);


        } catch (err) {
            console.log(err);
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

            const bookToDelete = await BookModel.getBook(id);

            if (bookToDelete.length > 0) {
                const deletedBook = await BookModel.deleteBook(id);

                if (deletedBook.affectedRows > 0)
                    return res.status(200).json({ message: "Book Deleted Successfully", deletedBook: bookToDelete })

                return res.status(400).json({ message: "Book Not Deleted" });
            }

            return res.status(404).json({ messageError: "Book Not Found" })


        } catch (err) {
            return res.status(500).json({ messageError: "Failed to Delete Book." })
        }
    }, 

    lendBook:async(req, res)=>{
        const {title, author} =req.body;

        try{
            if(!title || !author)
                res.status(404).json({messageError:"Missing Required Fields"});

            const desiredBook =await BookModel.findBookToLend(title, author);

            if(desiredBook.length ===0)
                return res.status(404).json({messageError:"Desired book(s) Not Found."});

            res.status(200).json({message:"Books Requested are: ", books:desiredBook});

        }catch(err){
            return res.status(500).json({messageError:"Error in Borrowing Book"});
        }

    }
}

