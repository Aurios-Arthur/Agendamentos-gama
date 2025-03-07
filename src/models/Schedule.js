const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
    empresa: { type: String, required: true },
    empresaId: { type: mongoose.Schema.Types.ObjectId, required: true },
    setor: { type: String, required: true },
    cargo: { type: String, required: true },
    nome: { type: String, required: true },
    dataNasc: { type: Date, required: true },
    dataAgn: { type: Date, required: true },
    CPF: { type: String, required: true },
    sexo: { type: String, enum: ["Masculino", "Feminino"], required: true },
    tipoExame: { type: String, enum: ["Admissional", "Periodico", "Demissional", "Retorno ao trabalho", "Mudança de risco"], required: true }, // Novo campo
    matriculaEsocial: { type: String, required: true },
    exames: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Schedule", ScheduleSchema);