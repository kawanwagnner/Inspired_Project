import { Router } from "express";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

const SECRET_KEY = "bomdia";

const readDataFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeDataToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

// Rota para verificar disponibilidade de username e email
router.post("/check-availability", (req, res) => {
  const { username, email } = req.body;
  const filePath = path.resolve(__dirname, "../database/users.json");
  const existingData = readDataFromFile(filePath);

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

  const dirPath = path.resolve(__dirname, "../database");
  const filePath = path.join(dirPath, "users.json");

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const existingData = readDataFromFile(filePath);

  if (existingData.some((user) => user.your_email === your_email)) {
    return res.status(400).json({ message: "Email já registrado." });
  }
  if (existingData.some((user) => user.username === username)) {
    return res.status(400).json({ message: "Nome de usuário já registrado." });
  }

  try {
    const hashedPassword = await bcrypt.hash(your_pass, 10);
    const newId =
      existingData.length > 0
        ? existingData[existingData.length - 1].id + 1
        : 1;

    const newUser = {
      id: newId,
      your_name,
      your_email,
      your_phone,
      your_password: hashedPassword,
      remember_me,
      username,
    };
    existingData.push(newUser);
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

  if (!your_email || !your_pass) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  const usersDataFilePath = path.resolve(
    __dirname,
    "..",
    "database",
    "users.json"
  );
  const usersData = readDataFromFile(usersDataFilePath);

  const user = usersData.find((user) => user.your_email === your_email);

  if (!user) {
    return res
      .status(404)
      .json({ message: "Usuário não encontrado. Confira seus dados." });
  }

  const isPasswordCorrect = await bcrypt.compare(your_pass, user.your_password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Email ou senha incorretos." });
  }

  const token = jwt.sign(
    { id: user.id, your_email: user.your_email },
    SECRET_KEY,
    { expiresIn: "3h" }
  );

  console.log("Usuário autenticado com sucesso. Dados do usuário:", user);
  res.json({ message: "Usuário autenticado com sucesso!", token });
});

// Rota para visualizar um usuário específico
router.get("/user/:email", (req, res) => {
  const { email } = req.params;
  const usersDataFilePath = path.resolve(
    __dirname,
    "..",
    "database",
    "users.json"
  );
  const usersData = readDataFromFile(usersDataFilePath);

  const user = usersData.find((user) => user.your_email === email);

  if (!user) {
    return res
      .status(404)
      .json({ message: "Usuário não encontrado. Confira seus dados." });
  }

  res.json(user);
});

// Rota para atualizar os dados do usuário
router.put("/user/:email", async (req, res) => {
  const { email } = req.params;
  const { your_name, your_phone, your_pass, remember_me, username } = req.body;

  const usersDataFilePath = path.resolve(
    __dirname,
    "..",
    "database",
    "users.json"
  );
  const usersData = readDataFromFile(usersDataFilePath);

  const userIndex = usersData.findIndex((user) => user.your_email === email);

  if (userIndex === -1) {
    return res
      .status(404)
      .json({ message: "Usuário não encontrado. Confira seus dados." });
  }

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

  usersData[userIndex] = updatedUser;
  writeDataToFile(usersDataFilePath, usersData);

  res.json({
    message: "Dados do usuário atualizados com sucesso!",
    updatedUser,
  });
});

// Rota para deletar um usuário
router.delete("/user/:email", (req, res) => {
  const { email } = req.params;

  const usersDataFilePath = path.resolve(
    __dirname,
    "..",
    "database",
    "users.json"
  );
  const usersData = readDataFromFile(usersDataFilePath);

  const userIndex = usersData.findIndex((user) => user.your_email === email);

  if (userIndex === -1) {
    return res
      .status(404)
      .json({ message: "Usuário não encontrado. Confira seus dados." });
  }

  usersData.splice(userIndex, 1);
  writeDataToFile(usersDataFilePath, usersData);

  res.json({ message: "Usuário deletado com sucesso!" });
});

export { router as authRouter };
