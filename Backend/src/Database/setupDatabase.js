// Importe o pacote sqlite3
const sqlite3 = require("sqlite3").verbose();

// Crie uma nova instância de banco de dados SQLite e conecte-se ao banco de dados
const db = new sqlite3.Database("database.db");

// Crie uma tabela para armazenar os usuários (se ainda não existir)
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)"
  );
});

// Função para inserir um novo usuário no banco de dados
const createUser = (name, email, password) => {
  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.run(query, [name, email, password], (err) => {
    if (err) {
      console.error("Erro ao inserir usuário:", err);
    } else {
      console.log("Usuário inserido com sucesso!");
    }
  });
};

// Exemplo de uso da função createUser
createUser("João", "joao@example.com", "senha123");
