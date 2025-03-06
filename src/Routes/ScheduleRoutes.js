const Schedule = require("../models/Schedule"); // Caminho corrigido
const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

// Listar todos os agendamentos
router.get("/", async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Criar um novo agendamento
router.post("/", async (req, res) => {
    const { empresa, nome, dataNasc, dataAgn, CPF, sexo, setor, cargo, matriculaEsocial } = req.body;

    try {
        const newSchedule = new Schedule({ empresa, nome, dataNasc, dataAgn, CPF, sexo, setor, cargo, matriculaEsocial });
        const savedSchedule = await newSchedule.save();
        res.status(201).json(savedSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = (server) => {
    // Listar todos os agendamentos
    server.get("/schedules", async (req, res) => {
        try {
            const schedules = await Schedule.find();
            res.json(schedules);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Listar um agendamento específico
    server.get("/schedules/:id", async (req, res) => {
        try {
            const schedule = await Schedule.findById(req.params.id);
            if (!schedule) {
                return res.status(404).json({ message: "Agendamento não encontrado" });
            }
            res.json(schedule);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Criar um novo agendamento
    server.post("/schedules", async (req, res) => {
        const { empresa, nome, dataNasc, dataAgn, CPF, sexo, setor, cargo, matriculaEsocial } = req.body;

        try {
            const newSchedule = new Schedule({ empresa, nome, dataNasc, dataAgn, CPF, sexo, setor, cargo, matriculaEsocial });
            const savedSchedule = await newSchedule.save();
            res.status(201).json(savedSchedule);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Editar um agendamento existente
    server.put("/schedules/:id", async (req, res) => {
        try {
            const updatedSchedule = await Schedule.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedSchedule) {
                return res.status(404).json({ message: "Agendamento não encontrado" });
            }
            res.json(updatedSchedule);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Deletar um agendamento
    server.delete("/schedules/:id", async (req, res) => {
        try {
            const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
            if (!deletedSchedule) {
                return res.status(404).json({ message: "Agendamento não encontrado" });
            }
            res.json({ message: "Agendamento deletado com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
};

module.exports = router;