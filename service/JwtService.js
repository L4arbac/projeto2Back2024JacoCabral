const jwt = require('jsonwebtoken');

class JwtService {
    generateToken(payload) {
        return jwt.sign(payload, process.env.CHAVE, { expiresIn: '1d' });
    }

    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.CHAVE, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });
    }
}

module.exports = new JwtService();
