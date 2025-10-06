import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error('⚠️ A variável de ambiente MONGO_URI não está definida.');
      process.exit(1);
    }

    await mongoose.connect(mongoURI);
    console.log('🍃 Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

export default connectToDatabase;