const jwtService = require('../service/JwtService');

class JwtController {
    async generateToken(req, res) {
        try {
            const payload = { message: 'esse é o payload do seu token heheh' };
            const token = jwtService.generateToken(payload);
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao gerar token', error });
        }
    }

    async verifyToken(req, res) {
        try {
            const { token } = req.body;
            const payload = await jwtService.verifyToken(token);
            res.status(200).json({ message: payload.message });
        } catch (error) {
            res.status(403).json({ message: 'ERROR: Token inválido', error });
        }
    }
}

module.exports = new JwtController();
