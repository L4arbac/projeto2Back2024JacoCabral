const express = require('express');
const app = express();

// Rota raiz que retorna "Olá, Mundo!"
app.get('/', (req, res) => {
    res.send('AAAAAA!');
});

// Configura o servidor para escutar na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});