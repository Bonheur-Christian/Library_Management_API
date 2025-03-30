const CourseBooksModel = require('../model/CourseBooksModel');

require('dotenv').config();

module.exports = {
    insertBook: async (req, res) => {
        const { bookname, subject, academic_year, isbn, published_year, quantity } = req.body

        try {
            const bookSaved = await CourseBooksModel.saveNewBook(bookname, subject, academic_year, isbn, published_year, quantity);

            if (bookSaved.error)
                return res.status(400).json({ messageError: bookSaved.error });

            return res.status(201).json({ message: "Book successfully added.", book: bookSaved });

        } catch (err) {
            return res.status(500).json({ messageError: "Error in saving course book" })
        }
    },

    getCourseBooks: async (req, res) => {
        try {
            const books = await CourseBooksModel.getAllCourseBooks();

            if (books.length > 0) {
                return res.status(200).json({ message: "Books retrieved: ", Books: books });
            }

            return res.status(404).json({ messageError: "No Books Found" })

        } catch (err) {
            return res.status(500).json({ message: "Error occured in getting all books." })
        }
    },

    getCourseBookById: async (req, res) => {
        const { id } = req.params;

        try {
            const book = await CourseBooksModel.getCourseBookById(id);
            if (book.length === 0)
                return res.status(404).json({ message: "Book not Found." })

            return res.status(200).json(book);


        } catch (err) {
            return res.status(500).json({ message: "Errot occured in getting Book with specified id." })

        }
    },

    updateBook: async (req, res) => {
        const { bookname, subject, academic_year, isbn, published_year, quantity } = req.body;
        const { id } = req.params;

        try {

            const bookToUpdate = await CourseBooksModel.getCourseBookById(id);

            if (bookToUpdate.length === 0)
                return res.status(404).json({ message: "Book not Found." });

            const updatedBook = await CourseBooksModel.updateCourseBook(bookname, subject, academic_year, isbn, published_year, quantity, id);

            if (updatedBook.affectedRows > 0)
                return res.status(200).json({ message: "Book Updated successfully", book: updatedBook });

            return res.status(400).json({ messageError: "Book not updated" });

        } catch (err) {
            return res.status(500).json({ messageError: "Error in updating course book" })
        }
    },

    deleteBook: async (req, res) => {
        const { id } = req.params;

        try {

            const bookToDelete = await CourseBooksModel.getCourseBookById(id);

            if (bookToDelete.length === 0)
                return res.status(404).json({ message: "Book not Found." });

            const deletedBook = await CourseBooksModel.deleteCourseBook(id);

            if (deletedBook.affectedRows > 0)
                return res.status(200).json({ message: "Book deleted successfully" });

            return res.status(400).json({ messageError: "Book not deleted" });

        } catch (err) {
            return res.status(500).json({ messageError: "Error in deleting course book" })
        }
    }
}