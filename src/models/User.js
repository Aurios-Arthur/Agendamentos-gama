const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nomeEmpresa: { type: String, required: true },
    role: { type: String, enum: ["empresa", "admin"], default: "empresa" }, // Novo campo para definir o tipo de usuário
    exames: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exame" }], // Exames associados à empresa
    createdAt: { type: Date, default: Date.now },
});

// Criptografa a senha antes de salvar
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Compara senhas
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);