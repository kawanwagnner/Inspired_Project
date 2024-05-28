// Backend (Node.js e Express):
// Quando você precisa lidar com dados que requerem interações com um banco de dados.
// Para implementar lógica de negócios e manipulação de dados.
// Para servir APIs RESTful que o frontend pode consumir.
// Para autenticação e autorização.

// Frontend (React e react-router-dom):
// Para gerenciar a navegação do usuário dentro da aplicação.
// Para renderizar componentes diferentes com base na URL atual sem recarregar a página.
// Para gerenciar o estado da interface do usuário e proporcionar uma experiência interativa.

const userModel = require("./userModel.js");

// Função para obter todos os usuários
exports.getAllUser = async (req, res) => {
  try {
    const users = await userModel.getAllUser();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

// Função para exibir a página de contato
exports.getContact = async (req, res) => {
  try {
    res.json({ message: "Contact page" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

// Função para exibir o formulário
exports.getForm = async (req, res) => {
  try {
    res.json({ message: "Form page" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

// Função para processar a submissão de um novo formulário
exports.newDataForm = async (req, res) => {
  try {
    const { your_name, your_email, your_phone, your_pass, confirm_pass } =
      req.body;

    // Realizar validações adicionais conforme necessário
    if (your_pass !== confirm_pass) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Exemplo: Salvar os dados do usuário em um banco de dados
    const newUser = {
      name: your_name,
      email: your_email,
      phone: your_phone,
      password: your_pass,
    };
    await userModel.saveUser(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing request" });
  }
};
