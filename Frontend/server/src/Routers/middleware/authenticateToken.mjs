import jwt from "jsonwebtoken";

const SECRET_KEY = "bomdia"; // Substitua isso por uma chave secreta forte e segura

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  // Obtém o cabeçalho de autorização
  const authHeader = req.headers["authorization"];
  // Extrai o token JWT do cabeçalho de autorização
  const token = authHeader && authHeader.split(" ")[1];

  // Se não houver token, retorna um erro 401 (Não autorizado)
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  // Verifica o token JWT usando a chave secreta
  jwt.verify(token, SECRET_KEY, (err, user) => {
    // Se o token for inválido ou houver um erro, retorna um erro 403 (Proibido)
    if (err) {
      return res.status(403).json({ message: "Token inválido." });
    }
    // Adiciona as informações do usuário à requisição
    req.user = { email: user.email }; // Supondo que o token contenha o email do usuário
    // Continua para a próxima função middleware
    next();
  });
};

export { authenticateToken };
