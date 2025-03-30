const connection = require("./config");
require("dotenv").config();

const NovelModel = {

    insertBookInStock: async (title, author, isbn, price, published_year, quantity) => {
        const query = "INSERT INTO library_stock(bookName, book_author , bookISBN, price , published_year, quantity) VALUE(?,?,?,?,?,?)";
        try {
            const [similarBook] = await connection.execute("SELECT * FROM library_stock WHERE bookISBN = ?", [isbn]);

            if (similarBook.length > 0) {
                return { error: "Book already exists" };

            }

            const [result] = await connection.execute(query, [title, author, isbn, price, published_year, quantity]);

            return result;

        } catch (err) {
            throw err;

        }
    },

    insertBookInLendedBooks: async (book_id, borrower_name, lend_date) => {
        const insertQuery = "INSERT INTO lended_books(book_id, borrower_name, lend_date) VALUES (?, ?, ?)";
        try {

            const [results] = await connection.execute(insertQuery, [book_id, borrower_name, lend_date]);

            return results;

        } catch (err) {
            console.log(err);

            throw err;
        }
    },

    getAllBooksInStock: async () => {
        const query = "SELECT * FROM library_stock";
        try {

            const [results] = await connection.execute(query)
            return results;

        } catch (err) {
            throw err;

        }
    },

    getBookFromStock: async (id) => {
        const query = "SELECT * FROM library_stock WHERE bookID  =?";
        try {

            const [result] = await connection.execute(query, [id]);

            return result;

        } catch (err) {
            throw err;

        }
    },

    updateBookInStock: async (title, author, isbn, price, published_year, quantity, id) => {
        const updateQuery = "UPDATE library_stock SET bookName =?, book_author =?, bookISBN =?, price =?, published_year =? , quantity =? WHERE bookID =?";
        try {

            const [results] = await connection.execute(updateQuery, [title, author, isbn, price, published_year, quantity, id])
            return results;

        } catch (err) {
            console.log(err);

            throw err;

        }
    },

    deleteBookFromStock: async (id) => {
        const deleteQuery = "DELETE FROM library_stock WHERE bookID = ?";

        try {

            const [results] = await connection.execute(deleteQuery, [id]);

            return results;

        } catch (err) {
            throw err;

        }

    },

    //functions to handle Book Lending

    findBookToLend: async (title, author) => {
        const findBookQuery = "SELECT * FROM library_stock WHERE bookName =? AND book_author =? ";

        try {
            const [results] = await connection.execute(findBookQuery, [title, author]);

            return results;

        } catch (err) {
            throw err;
        }
    },

   

}

module.exports = NovelModel;