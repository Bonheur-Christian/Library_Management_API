const UserModel = require("../model/UserModel");
const bcrypt = require('bcrypt');


module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {

            const user = await UserModel.getuserByEmail(email);

            if (!user)
                return res.status(404).json({ messageError: "Invalid Credentials" });


            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
                return res.status(400).json({ messageError: "Invalid Password " });


            req.session.user = {
                id: user.userID,
                email: user.email,
                username: user.username
            }

            return res.status(200).json({ message: "User logged in", user: req.session.user })


        } catch (err) {
            console.log(err);
            
            return res.status(500).json({ messageError: "Error in user login", Error: err });
        }
    }
}