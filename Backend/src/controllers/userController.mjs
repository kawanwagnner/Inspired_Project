import Post from "../models/post.mjs";
import User from "../models/user.mjs";
import bcrypt from "bcrypt";

// Função para obter o perfil do usuário
const profile = async (req, res, next) => {
  console.log(req.userId);

  try {
    const data = await Post.find({ creator: { _id: req.userId } });
    const user = await User.findById(req.userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.password = undefined;
    user.posts = data;

    res.status(200).json({ profile: user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Função para alterar a senha do usuário
const changePassword = async (req, res, next) => {
  if (!req.userId || !req.body.password || !req.body.newPassword) {
    return res.status(500).json({ msg: "Nada alterado..." });
  }

  try {
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error("Falha de validação");
      error.statusCode = 422;
      throw error;
    }

    const passIsEqual = await bcrypt.compare(password, user.password);

    if (!passIsEqual) {
      const error = new Error("Email ou senha inválida...");
      error.statusCode = 401;
      throw error;
    }

    const passHashed = await bcrypt.hash(newPassword, 12);
    user.password = passHashed;

    const updatedUser = await user.save();
    updatedUser.password = undefined;

    res.status(201).json({
      message: "Senha atualizada com sucesso!!",
      result: updatedUser,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: "Error ao atualizar o user...",
      result: err,
    });
  }
};

// Função para atualizar o perfil do usuário
const update = async (req, res, next) => {
  if (!req.userId || !req.body.name) {
    return res.status(500).json({ msg: "Nada alterado..." });
  }

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = req.body.name;
    const updatedUser = await user.save();

    updatedUser.password = undefined;
    updatedUser.posts = undefined;

    res.status(200).json({ profile: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Função para deletar o usuário
const deleteUser = async (req, res, next) => {
  const password = req.body.password;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      throw new Error("Usuário não encontrado..");
    }

    const passIsEqual = await bcrypt.compare(password, user.password);

    if (!passIsEqual) {
      throw new Error("Email ou senha inválida...");
    }

    await User.findByIdAndDelete(req.userId);

    res.status(200).json({
      message: "Usuário excluído com sucesso!",
    });
  } catch (err) {
    next(err);
  }
};

export default { profile, changePassword, update, deleteUser };
