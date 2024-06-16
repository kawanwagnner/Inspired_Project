// controllers/userController.mjs
import { generateToken } from "../middleware/token_auth.mjs";
import User from "../models/user.mjs";

// Função para atualizar o perfil do usuário
const update = async (req, res, next) => {
  try {
    // Verifica se req.userId está presente e é válido
    if (!req.userId) {
      return res.status(400).json({ msg: "ID do usuário inválido." });
    }

    // Procura o usuário pelo ID
    const user = await User.findById(req.userId);

    // Verifica se o usuário foi encontrado
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    // Atualiza os campos do usuário com os valores fornecidos
    const { username, bio } = req.body;

    if (username) user.username = username;
    if (bio) user.bio = bio;

    // Salva as alterações no banco de dados
    const updatedUser = await user.save();

    // Remove informações sensíveis do usuário antes de enviar a resposta
    updatedUser.password = undefined;
    updatedUser.posts = undefined;

    // Retorna o perfil atualizado do usuário com uma mensagem de sucesso
    return res
      .status(200)
      .json({ msg: "Perfil atualizado com sucesso!", profile: updatedUser });
  } catch (err) {
    // Em caso de erro, retorna uma mensagem de erro detalhada
    return res
      .status(500)
      .json({ msg: `Erro ao atualizar o perfil: ${err.message}` });
  }
};

// Função para deletar o usuário
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id; // Obter o ID do usuário a ser excluído

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Usuário excluído com sucesso!" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Função para obter todos os usuários
const getUsers = async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json(users);
};

// Função para obter o perfil de um único usuário
const getUserProfile = async (req, res, next) => {
  try {
    // Verificar se req.userId está presente
    if (!req.userId) {
      return res.status(400).json({ msg: "ID do usuário não fornecido." });
    }

    // Procurar o usuário pelo ID fornecido
    const user = await User.findById(req.userId);

    // Se o usuário não for encontrado, retornar uma resposta 404
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    // Remover a senha e outros dados sensíveis das informações retornadas
    user.password = undefined;
    user.posts = undefined;

    // Pegando token
    const token = generateToken(req.userId);

    // Retornar o perfil do usuário na resposta
    return res.status(200).json({ profile: user, token });
  } catch (err) {
    // Se ocorrer um erro, retornar uma resposta de erro 500 com detalhes do erro
    return res.status(500).json({ msg: err.message });
  }
};

export { getUsers, update, deleteUser, getUserProfile };
