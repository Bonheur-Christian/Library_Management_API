const connection = require("./config");
require('dotenv').config();

const CourseBooksModel = {

    saveNewBook: async (bookname, subject, academic_year, isbn, published_year, quantity) => {
        const insertQuery = "INSERT INTO course_books ( bookname, subject,academic_year,isbn, published_year, quantity) VALUES( ? , ? , ? , ? , ? , ? )";
        try {

            const [similarBook] = await connection.execute("SELECT * FROM course_books WHERE isbn = ?", [isbn]);

            if (similarBook.length > 0)
                return { error: "Book already exists" }

            const [results] = await connection.execute(insertQuery, [bookname, subject, academic_year, isbn, published_year, quantity]);

            return results;

        } catch (err) {
            console.log(err);
            throw err;

        }
    },

    lendCourseBook: async (book_id, borrower_name, academic_year, lend_date) => {

        console.log(book_id, borrower_name, academic_year, lend_date);


        const insertQuery = "INSERT INTO lended_books(book_id, borrower_name, academic_year, lend_date) VALUES(?, ?, ?, ?)";

        try {

            const [results] = await connection.execute(insertQuery, [book_id, borrower_name, academic_year, lend_date]);

            return results;

        } catch (err) {
            console.log(err);
            throw new err;

        }

    },

    getCourseBookById: async (id) => {
        const getQuery = "SELECT * FROM course_books WHERE book_id = ?";

        try {

            const [results] = await connection.execute(getQuery, [id]);


            return results;

        } catch (err) {
            console.log(err);
            throw err;

        }
    },

    getAllCourseBooks: async () => {
        const getQuery = "SELECT * FROM course_books";

        try {
            const [results] = await connection.execute(getQuery);

            return results;
        } catch (err) {
            console.log(err);
            throw err;

        }
    },

    updateCourseBook: async (bookname, subject, academic_year, isbn, published_year, quantity, id) => {
        const updateQuery = "UPDATE course_books SET bookname = ?, subject =?, academic_year =?, isbn=?, published_year =? , quantity =? WHERE book_id =?";

        try {
            const [results] = await connection.execute(updateQuery, [bookname, subject, academic_year, isbn, published_year, quantity, id]);
            return results;
        } catch (err) {
            console.log(err);
            throw err;

        }
    },

    deleteCourseBook: async (id) => {
        const deleteQuery = "DELETE FROM course_books WHERE book_id =?";

        try {
            const [results] = await connection.execute(deleteQuery, [id]);

            return results;
        } catch (err) {
            console.log(err);
            throw err;

        }
    },



}

module.exports = CourseBooksModel;