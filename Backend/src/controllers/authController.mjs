// controllers/userController.mjs
import User from "../models/user.mjs";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/token_auth.mjs";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  console.log(`Tentativa de login para o e-mail: ${email}`);

  try {
    // Verificar se o usuário existe com o e-mail fornecido
    const user = await User.findOne({ email });

    // Se o usuário não existe, retornar uma mensagem de erro
    if (!user) {
      console.log(`Usuário com o e-mail ${email} não encontrado.`);
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Se as senhas não coincidirem, retornar uma mensagem de erro
    if (!passwordMatch) {
      console.log(
        `Tentativa de login para o e-mail ${email} falhou: Senha incorreta.`
      );
      return res.status(401).json({ msg: "Credenciais inválidas." });
    }

    // Se as credenciais estiverem corretas, gerar um novo token de autenticação
    const token = generateToken(user._id);

    // Remover a senha do usuário das informações retornadas
    user.password = undefined;

    // Retornar as informações do usuário junto com o token de autenticação
    console.log(`Login bem-sucedido para o e-mail ${email}.`);
    return res.status(200).json({ user, token });
  } catch (error) {
    // Se ocorrer um erro, retornar uma resposta de erro 500 com detalhes do erro
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ status: "error", error: error.message });
  }
};

const signUp = async (req, res) => {
  const { name, username, email, password } = req.body;

  console.log(
    `name=${name}, username=${username}, email=${email}, password=${password}`
  );

  try {
    if (!name) {
      return res
        .status(400)
        .json({ msg: "Digite um valor diferente de null para o nome." });
    }

    if (!username) {
      return res
        .status(400)
        .json({ msg: "Digite um valor diferente de null para o username." });
    }

    // Verificar se já existe um usuário com o mesmo e-mail
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        msg: "Este e-mail já está sendo usado. Por favor, escolha outro.",
      });
    }

    // Criptografar a senha antes de salvar o usuário
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar um novo usuário com os dados fornecidos
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Salvar o novo usuário no banco de dados
    const userSaved = await newUser.save();

    // Gerar um token JWT para o novo usuário
    const token = generateToken(userSaved._id);

    // Retornar o novo usuário e o token na resposta
    return res.status(200).json({ newUser: userSaved, token });
  } catch (error) {
    // Se ocorrer um erro, retornar uma resposta de erro 500 com detalhes do erro
    return res.status(500).json({ status: "error", error: error.message });
  }
};

export { signIn, signUp };
