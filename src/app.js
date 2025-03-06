const express = require("express");
const ScheduleRoutes = require("./Routes/ScheduleRoutes"); // Importando o arquivo de rotas
const connectDB = require("../database");
const AuthRoutes = require("./Routes/AuthRoutes");
const cors = require("cors");

class App {
    constructor() {
        this.server = express();
        this.middleware();
        this.routes();
        this.database();
    }


    database() {
        connectDB();
    }   


    middleware() {
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes() {
        this.server.use("/auth", AuthRoutes); // Rotas de autenticação
        this.server.use("/schedules", ScheduleRoutes); // Rotas de agendamento
    }
}

module.exports = new App();