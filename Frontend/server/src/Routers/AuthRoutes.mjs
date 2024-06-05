import { fileURLToPath } from "url";
import { dirname } from "path";
import { Router } from "express";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Obtém o caminho do diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cria um roteador para as rotas de signup e signin
const router = Router();

// Chave secreta para assinar o token
const SECRET_KEY = "bomdia"; // Substitua isso por uma chave secreta forte e segura

// Função para ler dados do arquivo
const readDataFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Função para escrever dados no arquivo
const writeDataToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

// Rota para verificar disponibilidade de username e email
router.post("/check-availability", (req, res) => {
  const { username, email } = req.body;

  // Caminho para a pasta e o arquivo onde os dados são armazenados
  const filePath = path.resolve(__dirname, "../database/users.json");

  // Lê os dados existentes do arquivo
  const existingData = readDataFromFile(filePath);

  // Verifica se o email ou o nome de usuário já estão registrados
  const isEmailTaken = existingData.some((user) => user.your_email === email);
  const isUsernameTaken = existingData.some(
    (user) => user.username === username
  );

  res.json({
    emailAvailable: !isEmailTaken,
    usernameAvailable: !isUsernameTaken,
  });
});

// Rota para salvar os dados do SignUp
router.post("/signup", async (req, res) => {
  const {
    your_name,
    your_email,
    your_phone,
    your_pass,
    remember_me,
    username,
  } = req.body;

  // Verifica se todos os campos foram fornecidos
  if (
    !your_name ||
    !your_email ||
    !your_phone ||
    !your_pass ||
    !username ||
    remember_me === undefined
  ) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  // Caminho para a pasta e o arquivo onde os dados serão armazenados
  const dirPath = path.resolve(__dirname, "../database");
  const filePath = path.join(dirPath, "users.json");

  // Verifica se a pasta existe, caso contrário, cria a pasta
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Lê os dados existentes do arquivo
  const existingData = readDataFromFile(filePath);

  // Verifica se o email ou o nome de usuário já estão registrados
  if (existingData.some((user) => user.your_email === your_email)) {
    return res.status(400).json({ message: "Email já registrado." });
  }
  if (existingData.some((user) => user.username === username)) {
    return res.status(400).json({ message: "Nome de usuário já registrado." });
  }

  try {
    // Hash da senha antes de armazenar
    const hashedPassword = await bcrypt.hash(your_pass, 10);

    // Gera o ID auto-incremental
    const newId =
      existingData.length > 0
        ? existingData[existingData.length - 1].id + 1
        : 1;

    // Adiciona os novos dados
    const newUser = {
      id: newId,
      your_name,
      your_email,
      your_phone,
      your_password: hashedPassword, // Usa your_password aqui
      remember_me,
      username,
    };
    existingData.push(newUser);

    // Escreve os dados atualizados de volta ao arquivo
    writeDataToFile(filePath, existingData);

    res.json({
      message: "Usuário registrado com sucesso!",
      user: {
        id: newId,
        your_email,
        your_name,
        your_phone,
        remember_me,
        username,
      },
    });
  } catch (error) {
    console.error("Erro ao hashear a senha:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// Rota para fazer signin
router.post("/signin", async (req, res) => {
  const { your_email, your_pass } = req.body;

  // Verifica se email e password foram fornecidos
  if (!your_email || !your_pass) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  // Supondo que os dados de usuário estejam em um arquivo JSON
  const usersDataFilePath = path.resolve(
    __dirname,
    "..",
    "database",
    "users.json"
  );
  const usersData = readDataFromFile(usersDataFilePath);

  // Verifica se o usuário existe com o email fornecido
  const user = usersData.find((user) => user.your_email === your_email);

  if (!user) {
    return res
      .status(404)
      .json({ message: "Usuário não encontrado. Confira seus dados." });
  }

  // Verifica se a senha está correta
  const isPasswordCorrect = await bcrypt.compare(your_pass, user.your_password); // Usa your_password aqui
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Email ou senha incorretos." });
  }

  // Gera um token para o usuário autenticado
  const token = jwt.sign(
    { id: user.id, your_email: user.your_email },
    SECRET_KEY,
    {
      expiresIn: "3h", // Token expira em 3 horas
    }
  );

  // Se chegou até aqui, significa que o usuário foi autenticado com sucesso
  console.log("Usuário autenticado com sucesso. Dados do usuário:", user); // Imprime todos os dados do usuário no console
  res.json({ message: "Usuário autenticado com sucesso!", token });
});

// Rota para visualizar um usuário específico
router.get("/user/:email", (req, res) => {
  const { email } = req.params;

  // Caminho para o arquivo de dados dos usuários
  const usersDataFilePath = path.resolve(
    __dirname,
    "..",
    "database",
    "users.json"
  );
  const usersData = readDataFromFile(usersDataFilePath);

  // Verifica se o usuário existe com o email fornecido
  const user = usersData.find((user) => user.your_email === email);

  if (!user) {
    return res
      .status(404)
      .json({ message: "Usuário não encontrado. Confira seus dados." });
  }

  // Retorna os dados do usuário
  res.json(user);
});

// Rota para atualizar os dados do usuário
router.put("/user/:email", async (req, res) => {
  const { email } = req.params;
  const { your_name, your_phone, your_pass, remember_me, username } = req.body;

  // Caminho para o arquivo de dados dos usuários
  const usersDataFilePath = path.resolve(
    __dirname,
    "..",
    "database",
    "users.json"
  );
  const usersData = readDataFromFile(usersDataFilePath);

  // Verifica se o usuário existe com o email fornecido
  const userIndex = usersData.findIndex((user) => user.your_email === email);

  if (userIndex === -1) {
    return res
      .status(404)
      .json({ message: "Usuário não encontrado. Confira seus dados." });
  }

  // Atualiza os dados do usuário
  const updatedUser = {
    ...usersData[userIndex],
    your_name,
    your_phone,
    remember_me,
    username,
  };
  if (your_pass) {
    updatedUser.your_password = await bcrypt.hash(your_pass, 10);
  }

  // Substitui o usuário antigo pelo atualizado
  usersData[userIndex] = updatedUser;

  // Escreve os dados atualizados de volta ao arquivo
  writeDataToFile(usersDataFilePath, usersData);

  res.json({
    message: "Dados do usuário atualizados com sucesso!",
    updatedUser,
  });
});

// Rota para deletar um usuário
router.delete("/user/:email", (req, res) => {
  const { email } = req.params;

  // Caminho para o arquivo de dados dos usuários
  const usersDataFilePath = path.resolve(
    __dirname,
    "..",
    "database",
    "users.json"
  );
  const usersData = readDataFromFile(usersDataFilePath);

  // Verifica se o usuário existe com o email fornecido
  const userIndex = usersData.findIndex((user) => user.your_email === email);

  if (userIndex === -1) {
    return res
      .status(404)
      .json({ message: "Usuário não encontrado. Confira seus dados." });
  }

  // Remove o usuário da lista
  usersData.splice(userIndex, 1);

  // Escreve os dados atualizados de volta ao arquivo
  writeDataToFile(usersDataFilePath, usersData);

  res.json({ message: "Usuário deletado com sucesso!" });
});

export { router as authRouter };
