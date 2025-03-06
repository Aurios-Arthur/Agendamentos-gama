const express = require("express");
const Exame = require("../models/Exame");
const Setor = require("../models/Setor"); // Importe o modelo Setor
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Criar um novo setor
router.post("/setores", auth, async (req, res) => {
    const { nome, empresaId } = req.body;

    try {
        const setor = new Setor({ nome, empresaId });
        const savedSetor = await setor.save();
        res.status(201).json(savedSetor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Listar setores de uma empresa
router.get("/empresas/:id/setores", auth, async (req, res) => {
    try {
        const setores = await Setor.find({ empresaId: req.params.id });
        res.json(setores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Atualizar setor (adicionar cargos ou exames)
router.put("/setores/:id", auth, async (req, res) => {
    const { cargos, exames } = req.body;

    try {
        const setor = await Setor.findById(req.params.id);
        if (!setor) {
            return res.status(404).json({ message: "Setor não encontrado." });
        }

        if (cargos) setor.cargos = cargos;
        if (exames) setor.exames = exames;

        const updatedSetor = await setor.save();
        res.json(updatedSetor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Listar todos os exames
router.get("/exames", auth, async (req, res) => {
    try {
        const exames = await Exame.find();
        res.json(exames);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Listar todas as empresas
router.get("/empresas", auth, async (req, res) => {
    try {
        const empresas = await User.find({ role: "empresa" }); // Filtra apenas empresas
        res.json(empresas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Criar um novo exame
router.post("/exames", auth, async (req, res) => {
    const { nome } = req.body;

    try {
        const exame = new Exame({ nome });
        const savedExame = await exame.save();
        res.status(201).json(savedExame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Associar exames a uma empresa
router.post("/empresas/:id/exames", auth, async (req, res) => {
    const { exames } = req.body;

    try {
        const empresa = await User.findById(req.params.id);
        if (!empresa || empresa.role !== "empresa") {
            return res.status(404).json({ message: "Empresa não encontrada." });
        }

        empresa.exames = exames;
        await empresa.save();

        res.json(empresa);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;