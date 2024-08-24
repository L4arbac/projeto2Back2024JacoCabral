const jwt = require('jsonwebtoken');

const authMiddleware = {

    authenticateToken(req, res, next) {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.CHAVE);
            req.user = decoded; 
            next(); 
        } catch (error) {
            return res.status(403).json({ message: 'Token inválido.' });
        }
    },


    generateToken(payload) {
        return jwt.sign(payload, process.env.CHAVE, { expiresIn: '1d' }); 
    }
};

module.exports = authMiddleware;
