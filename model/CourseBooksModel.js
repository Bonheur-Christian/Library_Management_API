const connection = require("./config");
require('dotenv').config();

const CourseBooksModel = {

    saveNewBook: async (subject, academic_year, isbn, published_year, quantity) => {
        const insertQuery = "INSERT INTO course_books(subject,academic_year,book_isbn, published_year, quantity) VALUES(?, ?, ?, ?, ?)";
        try {

            const [similarBook] = await connection.execute("SELECT * FROM course_books WHERE book_isbn = ?", [isbn]);

            if (similarBook.length > 0)
                return { error: "Book already exists" }

            const [results] = await connection.execute(insertQuery, [subject, academic_year, isbn, published_year, quantity]);

            return results;

        } catch (err) {
            console.log(err);
            throw err;

        }
    },

    getCourseBookById: async (id) => {
        const getQuery = "SELCT * FROM course_books WHERE book_id = ?";

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

    updateCourseBook: async (subject, academic_year, isbn, published_year, quantity, id) => {
        const updateQuery = "UPDATE course_books SET subject =?, academic_year =?, book_isbn=?, published_year =? , quantity =? WHERE book_id =?";

        try {
            const [results] = await connection.execute(updateQuery, [subject, academic_year, isbn, published_year, quantity, id]);
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
    }

}

module.exports = CourseBooksModel;