import { validationResult } from "express-validator";
import User from "../models/user.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar-url";

export const signUpUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 12);
    const avatar = gravatar(email, { size: 200, default: "identicon" }); // Gerar URL do avatar usando Gravatar

    const user = new User({
      email: email,
      name: name,
      password: hashedPassword,
      avatar: avatar,
    });

    const savedUser = await user.save();
    savedUser.password = undefined;

    res.status(201).json({
      message: "User created successfully",
      result: savedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message, error: error.data });
  }
};

export const signInUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  //Buscar user na base de dados com o email enviado
  await User.findOne({ email: email })
    .then((user) => {
      //user é o que ele retorna
      //validar que email não existe na base
      console.log(user);
      if (!user) {
        const error = new Error("Falha de validação");
        error.statusCode = 422;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((passIsEqual) => {
      if (!passIsEqual) {
        const error = new Error("Email ou senha inválida...");
        error.statusCode = 401;
        throw error;
      }

      //Vamos gerar o token para ele!
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "MinhaChaveJWT@2024Senai",
        { expiresIn: "4h" }
      );

      return res.status(200).json({
        message: "Usuário logado com sucesso!",
        token: token,
      });
    })
    .catch((error) => {
      console.log(error);
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

// export default { signInUser, signUpUser };
