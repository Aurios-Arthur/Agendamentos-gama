const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Registrar um novo usuário
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já existe" });
        }

        // Cria um novo usuário
        const user = new User({ email, password });
        await user.save();

        // Gera um token JWT
        const token = jwt.sign({ userId: user._id }, "seuSegredoJWT", { expiresIn: "1h" });

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

module.exports = router;