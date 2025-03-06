const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        console.log("Token recebido:", token); // Log do token recebido
        const decoded = jwt.verify(token.replace("Bearer ", ""), "seuSegredoJWT");
        console.log("Token decodificado:", decoded); // Log do token decodificado
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error("Erro ao verificar token:", err); // Log do erro
        res.status(400).json({ message: "Token inválido." });
    }
};