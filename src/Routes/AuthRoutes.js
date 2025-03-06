const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth"); // Importe o middleware

const router = express.Router();

// Registrar um novo usuário
router.post("/register", async (req, res) => {
    const { email, password, nomeEmpresa } = req.body; // Adicionado nomeEmpresa

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já existe" });
        }

        const user = new User({ email, password, nomeEmpresa }); // Adicionado nomeEmpresa
        await user.save();

        const token = jwt.sign({ userId: user._id }, "seuSegredoJWT", { expiresIn: "24h" });
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login de usuário
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Credenciais inválidas" });
        }

        // Compara a senha
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Credenciais inválidas" });
        }

        // Gera um token JWT
        const token = jwt.sign({ userId: user._id }, "seuSegredoJWT", { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Rota para obter dados do usuário logado (protegida por autenticação)
router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password"); // Exclui a senha
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;