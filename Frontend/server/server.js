const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors"); // Importe o pacote cors

const app = express();
const PORT = 5000;

// Middleware para permitir o uso do JSON no corpo da requisição
app.use(bodyParser.json());

// Middleware do cors para permitir solicitações de qualquer origem
app.use(cors());

// Rota para salvar os dados do SignUp
app.post("/api/signup", (req, res) => {
  const formData = req.body;

  // Abre a conexão com o banco de dados
  const db = new sqlite3.Database("./database.db");

  // Insere os dados do formulário na tabela 'users'
  const sql = `
    INSERT INTO users (your_name, your_email, your_phone, your_pass, remember_me)
    VALUES (?, ?, ?, ?, ?)
  `;
  const { your_name, your_email, your_phone, your_pass, remember_me } =
    formData;
  db.run(
    sql,
    [your_name, your_email, your_phone, your_pass, remember_me],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Form data submitted successfully!", formData });
      }
    }
  );

  // Fecha a conexão com o banco de dados
  db.close();
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
