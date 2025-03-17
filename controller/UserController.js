const UserModel = require('../model/UserModel');
const bcrypt = require('bcrypt')

const saltRound = 7;

module.exports = {

    saveNewUser: async (req, res) => {

        const { username, email, password } = req.body;
        try {

            if (!username || !email || !password)
                return res.status(404).json({ messageError: "Missing required fields" });


            const hashedPassword = await bcrypt.hash(password, saltRound);
            console.log(hashedPassword);


            const user = await UserModel.saveUser(username, email, hashedPassword);

            if (user.error) {
                return res.status(400).json({ messageError: user.error })
            }
            
            return res.status(200).json({ message: "User saved In database", user: user });

        } catch (err) {
            if (err) throw err;

            return res.status(500).json({ messageError: "Error in saving user" })

        }
    }
}