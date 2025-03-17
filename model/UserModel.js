const connection = require("./config");
require('dotenv').config();

const UserModel = {

    saveUser: async (username, email, password) => {

        const query = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";

        try {

            const [existingUser] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);

            if (existingUser.length > 0) {
                return { error: "Email already used!" }
            }

            const [results] = await connection.execute(query, [username, email, password]);

            return results;

        } catch (err) {
            if (err) throw err;

            console.log(err);

        }

    },

    // getUser: async(id)

}


module.exports = UserModel;