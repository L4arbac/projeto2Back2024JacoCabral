const jwt = require('jsonwebtoken');

const authMiddleware = {
    // Verifica e decodifica o token
    authenticateToken(req, res, next) {
        const token = req.header('Authorization')?.split(' ')[1]; // Espera o token no formato Bearer <token>

        if (!token) {
            return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.CHAVE);
            req.user = decoded; // Salva o payload do token decodificado na requisição
            next(); // Continua para o próximo middleware ou rota
        } catch (error) {
            return res.status(403).json({ message: 'Token inválido.' });
        }
    },

    // Gera um novo token
    generateToken(payload) {
        return jwt.sign(payload, process.env.CHAVE, { expiresIn: '1d' }); // Token válido por 1 dia
    }
};

module.exports = authMiddleware;
