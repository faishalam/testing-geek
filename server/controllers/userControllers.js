const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const checkEmail = await User.findOne({ where: { email } });
      if (checkEmail)
        return res.status(400).json({ message: "Email already registered" });

      const checkUsername = await User.findOne({ where: { name } });
      if (checkUsername)
        return res.status(400).json({ message: "Username already registered" });

      let newUser = await User.create({
        name,
        email,
      });
      const withoutPassword = {
        name: newUser.name,
        email: newUser.email,
      };

      res.status(201).json(withoutPassword);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email)
        return res.status(400).json({ message: "Please enter your email" });
      if (!password)
        return res.status(400).json({ message: "Please enter your password" });

      let findUser = await User.findOne({ where: { email } });
      if (!findUser)
        return res.status(401).json({ message: "Invalid email/password" });

      let checkPassword = comparePassword(password, findUser.password);
      if (!checkPassword)
        return res.status(401).json({ message: "Invalid email/password" });

      let access_token = signToken({ id: findUser.id, email: findUser.email });

      res.status(200).json({ access_token: access_token, role: findUser.role });
    } catch (error) {
      next(error);
    }
  }

  static async getMyAccount(req, res, next) {
    try {
      const id = req.user.id;
      const user = await User.findByPk(id);
      if (!user) throw { name: "User not found" };
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
