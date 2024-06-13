import mongoose from "mongoose";

async function connectDatabase() {
  // Conectar ao banco de dados e iniciar o servidor
  await mongoose.connect(
    "mongodb+srv://kawanwagnner7:OCcGaswgluPaGYrr@dbinspired.puwhjeg.mongodb.net/?retryWrites=true&w=majority&appName=dbInspired",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
}

export default connectDatabase;
