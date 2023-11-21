const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");


module.exports = class UserController {


    static async login (req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email) {
                res.status(400).json({ message: "Email is required" });
                return;
            }

            if (!password) {
                res.status(400).json({ message: "Password is required" });
                return;
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                next({ name: "Unauthenticated", message: "User not found or Password not matched" });
                return;
            }

            const isValidPassword = comparePassword(password, user.password);
            if (!isValidPassword) {
                next({ name: "Unauthenticated", message: "User not found or Password not matched" });
                return;
            }

            const access_token = signToken({ id: user.id });
            res.status(200).json({ access_token });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

}