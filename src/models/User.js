const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Para criptografar a senha

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nomeEmpresa: { type: String, required: true }, // Novo campo
    createdAt: { type: Date, default: Date.now },
});

// Criptografa a senha antes de salvar o usuário
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10); // 10 é o número de rounds de criptografia
    }
    next();
});

// Método para comparar senhas
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);