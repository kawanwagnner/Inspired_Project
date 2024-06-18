import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, "bomdia", { expiresIn: "24h" });
  return token;
};

const authMiddleware = (req, res, next) => {
  try {
    // Verifica se o token está presente no cabeçalho de autorização
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "Autenticação falhou! Token não fornecido ou malformado.",
      });
    }

    // Extrai o token da string do cabeçalho de autorização
    const token = authHeader.split(" ")[1];

    // Verifica a validade do token e decodifica-o
    const decodedToken = jwt.verify(token, "bomdia");

    // Define o ID do usuário decodificado na requisição para uso posterior
    req.userId = decodedToken.userId;

    // Passa para o próximo middleware
    next();
  } catch (err) {
    // Se houver um erro na verificação do token
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ msg: "Token expirado. Faça login novamente." });
    }
    return res.status(401).json({ msg: "Token inválido ou malformado." });
  }
};

export { authMiddleware, generateToken };
