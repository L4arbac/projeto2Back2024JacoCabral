require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swaggerCode.json');

const port = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require("./routes/UserRoutes")
const ingredienteRoutes = require("./routes/IngredienteRoutes")
const cafeRoutes = require("./routes/CafeRoutes")
const vendaRoutes = require("./routes/VendaRoutes")
const installRoutes = require("./routes/InstallRoutes")

const app = express();

app.use(bodyParser.json());

app.use('/',userRoutes);
app.use('/',ingredienteRoutes);
app.use('/',cafeRoutes);
app.use('/',vendaRoutes);
app.use('/',installRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.listen(port, () => {
    console.log('Servidor rodando na porta:'+port);
    
});