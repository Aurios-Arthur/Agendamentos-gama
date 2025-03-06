const express = require("express");
const cors = require("cors");
const connectDB = require("../database");
const AuthRoutes = require("./routes/AuthRoutes");
const ScheduleRoutes = require("./routes/ScheduleRoutes");
const AdminRoutes = require("./Routes/AdminRoutes"); // Importe as rotas de administração

class App {
    constructor() {
        this.server = express();
        this.database();
        this.middleware();
        this.routes();
    }

    database() {
        connectDB();
    }

    middleware() {
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes() {
        this.server.use("/auth", AuthRoutes);
        this.server.use("/schedules", ScheduleRoutes);
        this.server.use("/admin", AdminRoutes); // Use as rotas de administração
    }
}

module.exports = new App();