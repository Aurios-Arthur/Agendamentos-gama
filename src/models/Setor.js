const mongoose = require("mongoose");

const SetorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    empresaId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exames: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exame" }],
    cargos: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Setor", SetorSchema);