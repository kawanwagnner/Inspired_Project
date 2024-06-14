import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

async function connectDatabase() {
  // Obter a URI do banco de dados das variáveis de ambiente
  const dbUri = process.env.MONGODB_URI;

  // Conectar ao banco de dados e iniciar o servidor
  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default connectDatabase;
