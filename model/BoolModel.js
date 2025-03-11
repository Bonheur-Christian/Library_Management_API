const connection = require("./config");
require("dotenv").config();

const BookModel = {

    insertBook: async (title, author, isbn, price, published_year) => {
        const query = "INSERT INTO books(title, author , isbn, price , published_year) VALUE(?,?,?,?,?)";
        try {
            const [similarBook] = await connection.execute("SELECT * FROM books WHERE isbn = ?", [isbn]);
            console.log(similarBook);
            

            if (similarBook.length > 0)
                throw new Error("Books already exists.")



            const [result] = await connection.execute(query, [title, author, isbn, price, published_year]);

            return result;

        } catch (err) {
            console.log(err);
            throw err;

        }
    },

    getAllBooks: async () => {
        const query = "SELECT * FROM books";
        try {

            const [results] =(await connection).execute(query)
            console.log(results);
            
            return results;

        } catch (err) {
            console.log(err);
            throw err;

        }
    }


}

module.exports =BookModel;