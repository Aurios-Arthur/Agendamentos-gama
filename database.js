const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/Agendamentos", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB conectando com sucesso");
    } catch (err){
        console.error("Erro ao conectar ao MongoDB", err.message);
        process.exit(1);
    }
}

module.exports = connectDB; 