require('dotenv').config();
const port = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes/Routes")
const app = express();

app.use(bodyParser.json());
app.use('/',routes)



// Configura o servidor para escutar na porta 3000
app.listen(port, () => {
    console.log('Servidor rodando na porta:'+port);
});