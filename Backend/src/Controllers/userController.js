// controllers/userController.js

const User = require("../Models/User");
const { createUser } = require("../Database/setupDatabase");

exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  User.createUser(name, email, password);
  res.status(201).json({ message: "Usuário criado com sucesso" });
};
