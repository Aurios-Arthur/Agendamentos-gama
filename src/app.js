const express = require("express");
const ScheduleRoutes = require("./Routes/ScheduleRoutes"); // Importando o arquivo de rotas
const connectDB = require("../database");

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
        this.server.use(express.json());
    }

    routes() {
        // Usando a função routes importada
        ScheduleRoutes(this.server);
    }
}

module.exports = new App();