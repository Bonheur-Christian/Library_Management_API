const UserModel = require('../model/UserModel');
const bcrypt = require('bcrypt')

const saltRound = 7;

module.exports = {

    saveNewUser: async (req, res) => {

        const { username, email, password } = req.body;
        try {

            const hashedPassword = bcrypt.hash(password, saltRound, (err, hash) => {
                if (err) throw err;
                console.log(hash);

            })

            const user = await UserModel.saveUser(username, email, hashedPassword);

            if (user)
                res.status(200).json({ message: "User saved In database", user: user })

            res.status(404).json({ messageError: "Bad Request" });



        } catch (err) {
            if (err) throw err;

            res.status(500).json({ messageError: "Error in saving user" })

        }
    }
}