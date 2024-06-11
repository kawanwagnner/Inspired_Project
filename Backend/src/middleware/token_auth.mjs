import jwt from "jsonwebtoken";

export default (req, res, next) => {
  // Pegar o token sem a palavra Bearer
  let token = req.get("Authorization");

  if (!token) {
    const error = new Error("Não enviou Token válido");
    error.statusCode = 401;
    throw error;
  }

  token = token.split(" ")[1];
  // Verificar se o token é válido!
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "bomdia");
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error("Usuário não autenticado!");
    error.statusCode = 401;
    throw error;
  }

  // Adicionar ao objeto req, a propriedade userId
  req.userId = decodedToken.userId;
  next();
};
