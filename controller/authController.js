const UserModel = require("../model/UserModel");
const bcrypt = require('bcrypt');


module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {

            const user =await UserModel.getuserByEmail(email); 
            console.log(user);
                       

            if(!user)
                return res.status(404).json({messageError:"Invalid Credentials"});
            
            
            const isMatch =await bcrypt.compare(password, );



        } catch (err) {
            return res.status(500).json({ messageError: "Error in user login", Error: err });
        }
    }
}