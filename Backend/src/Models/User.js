// models/User.js

const sqlite3 = require('sqlite3').verbose();

// Função para criar uma conexão com o banco de dados SQLite
const db = new sqlite3.Database('../Database/database.db');

const createUser = (name, email, password) => {
  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.run(query, [name, email, password], (err) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
    } else {
      console.log('Usuário inserido com sucesso!');
    }
  });
};

module.exports = { createUser };
