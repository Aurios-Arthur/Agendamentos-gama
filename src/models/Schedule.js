const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
    empresa: { type: String, required: true },
    nome: { type: String, required: true },
    dataNasc: { type: Date, required: true },
    dataAgn: { type: Date, required: true },
    CPF: { type: String, required: true },
    sexo: { type: String, required: true },
    setor: { type: String, required: true },
    cargo: { type: String, required: true },
    matriculaEsocial: { type: String, required: true },
    exames: [{ type: String }], // Campo opcional
}, { timestamps: true });

module.exports = mongoose.model("Schedule", ScheduleSchema);