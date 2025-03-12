const connection = require("./config");
require("dotenv").config();

const BookModel = {

    insertBook: async (title, author, isbn, price, published_year) => {
        const query = "INSERT INTO books(title, author , isbn, price , published_year) VALUE(?,?,?,?,?)";
        try {
            const [similarBook] = await connection.execute("SELECT * FROM books WHERE isbn = ?", [isbn]);
            console.log(similarBook);


            if (similarBook.length > 0)
                console.log("Books already exists.");

            const [result] = await connection.execute(query, [title, author, isbn, price, published_year]);

            console.log(result);


            return result;

        } catch (err) {
            console.log(err);
            throw err;

        }
    },

    getAllBooks: async () => {
        const query = "SELECT * FROM books";
        try {

            const [results] = await connection.execute(query)
            console.log(results);
            return results;

        } catch (err) {
            console.log(err);
            throw err;

        }
    },

    getBook: async (id) => {
        const query = "SELECT * FROM books WHERE id  =?";
        try {

            const [result] = await connection.execute(query, [id]);

            return result;

        } catch (err) {
            console.log(err);
            throw err;

        }
    }, 

    updateBook: async(title, author, isbn, price, published_year, id)=>{
        const query ="UPDATE books SET title =?, author =?, isbn =?, price =?, published_year =? WHERE id =?";
        try{

            const [results] =await connection.execute(query,[title, author, isbn, price, published_year, id] )
            return results;

        }catch(err){
            console.log(err);
            throw err;
            
        }
    }


}

module.exports = BookModel;