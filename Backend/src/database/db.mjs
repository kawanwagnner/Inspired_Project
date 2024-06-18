import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

async function connectDatabase() {
  const dbUri = process.env.MONGODB_URI;
  console.log(`Tentando conectar ao MongoDB com a URI: ${dbUri}`);

  try {
    await mongoose.connect(dbUri);
    console.log("Conectado ao MongoDB com sucesso");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

export default connectDatabase;
