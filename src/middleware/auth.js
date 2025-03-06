const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token, "seuSegredoJWT");
        req.userId = decoded.userId; // Adiciona o ID do usuário à requisição
        next();
    } catch (err) {
        res.status(400).json({ message: "Token inválido." });
    }
};