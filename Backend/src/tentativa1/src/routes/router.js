// Importa o módulo Router do Express
const { Router } = require("express");
// Importa o controlador de localizações
const userController = require("../controller/userController.js");

// Cria uma instância do roteador
const router = Router();

// Define as rotas e associa cada rota a um método do controlador

router.get("/", userController.getHome);
router.get("/signIn", userController.getContact);
router.get("/signUp", userController.getSignUp);

router.get("/error", (req, res) => {
  res.render("error");
});

// Exporta o roteador para que possa ser usado na aplicação principal
module.exports = router;
