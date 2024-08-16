require('dotenv').config();
const port = process.env.PORT || 3000;

const tokenMaker = require('jsonwebtoken')

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    const generateToken = () => {
        const payload = {
            message: 'esse é o payload do seu token heheh'
        };
    
        return tokenMaker.sign(payload, process.env.CHAVE, { expiresIn: '1d' });
    };

    const token = generateToken();

    return res.status(200).json({token})
})

app.post('/', (req, res) => {
    const { token } = req.body

    const payload = tokenMaker.verify(token, process.env.CHAVE, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'ERROR: Token invalido' });
        }

        return payload;
    });

    return res.status(200).json({ message: payload.message });
})

// Configura o servidor para escutar na porta 3000
app.listen(port, () => {
    console.log('Servidor rodando na porta:'+port);
});