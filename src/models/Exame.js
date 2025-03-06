const mongoose = require("mongoose");

const ExameSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true }, // Nome do exame (único)
    empresas: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Empresas associadas
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Exame", ExameSchema);