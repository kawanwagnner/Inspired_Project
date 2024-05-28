// Backend (Node.js e Express):
// Quando você precisa lidar com dados que requerem interações com um banco de dados.
// Para implementar lógica de negócios e manipulação de dados.
// Para servir APIs RESTful que o frontend pode consumir.
// Para autenticação e autorização.

// Frontend (React e react-router-dom):
// Para gerenciar a navegação do usuário dentro da aplicação.
// Para renderizar componentes diferentes com base na URL atual sem recarregar a página.
// Para gerenciar o estado da interface do usuário e proporcionar uma experiência interativa.

// Importando o modelo
const userModel = require("../model/userModel.js");

const {
  default: SignUp,
} = require("../../../../../Frontend/src/pages/SignUp/index.jsx");

// Função para obter todas os usuários
exports.getAllUser = async (req, res) => {
  try {
    // Chama o método do modelo para obter todas os usuários
    const user = await userModel.getAllUser();
    // Renderiza a visão "listLocation" passando os usuários obtidos
    res.render("listUser", { user: user });
  } catch (err) {
    // Em caso de erro, responde com status 500 e a mensagem de erro
    res.status(500).json({ error: err.toString() });
  }
};

// Função para exibir a página de contato
exports.getContact = async (req, res) => {
  try {
    // Renderiza a visão "contact"
    res.render("contact");
  } catch (err) {
    // Em caso de erro, responde com status 500 e a mensagem de erro
    res.status(500).json({ error: err.toString() });
  }
};

// Função para exibir o formulário
exports.getForm = async (req, res) => {
  try {
    // Renderiza a visão "forms"
    res.render("forms");
  } catch (err) {
    // Em caso de erro, responde com status 500 e a mensagem de erro
    res.status(500).json({ error: err.toString() });
  }
};

// Função para processar a submissão de um novo formulário
exports.newDataForm = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { nome, email, senha } = req.body;

    // Obtém todas as localizações existentes
    const users = await userModel.getAllUser();
    // Verifica se a localização já existe
    const isExisting = users.some(
      (user) =>
        user.nome === nome && user.email === email && user.senha === senha
    );

    // Se a localização já existir, redireciona para a página de erro
    if (isExisting) {
      return res.redirect("/error?errorMessage=Local já cadastrado");
    }

    // Adiciona a nova localização à lista
    locations.push({ cidade, sigla, bairro });
    // Escreve a lista atualizada de localizações no arquivo
    await userModel.writeLocationToFile(locations);

    // Redireciona para a página de listagem de localizações com mensagem de sucesso
    res.redirect("/listLocation");
  } catch (error) {
    // Em caso de erro, loga o erro no console e responde com status 500 e a mensagem de erro
    console.error(error);
    res.status(500).json({ error: "Erro ao processar a solicitação" });
  }
};

// Função para exibir a página inicial
exports.getSignUp = async (req, res) => {
  try {
    // Renderiza a visão "home"
    res.render(<SignUp />);
  } catch (err) {
    // Em caso de erro, responde com status 500 e a mensagem de erro
    res.status(500).json({ error: err.toString() });
  }
};
